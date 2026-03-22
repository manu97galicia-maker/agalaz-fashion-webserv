import { GoogleGenAI, type Chat } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY || '';

const SYSTEM_INSTRUCTION = `
You are Agalaz, a virtual try-on engine. You take a photo of a person and a garment, and generate a realistic image of that person wearing the garment.
`;

const MODEL = 'gemini-3.1-flash-image-preview';

function trimBase64(data: string, maxBytes: number = 2_000_000): string {
  if (data.length * 0.75 > maxBytes) {
    console.warn(`Image large (${Math.round(data.length * 0.75 / 1024)}KB)`);
  }
  return data;
}

/**
 * Generate a try-on image from a single user photo + optional garment.
 * Optimized for speed: compact prompts, smaller images, minimal retries.
 */
export async function generateTryOnImage(
  userImage: string,
  clothingImage?: string,
  modificationPrompt?: string,
  lastRenderedImage?: string,
  clothingMimeType?: string,
  currentSize?: string,
  previewSize?: string,
): Promise<{ image: string | null; failReason?: string }> {
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const cleanBase64 = (s: string) => s.replace(/^data:image\/[^;]+;base64,/, '');

    // Detect actual mime type from base64 magic bytes
    const detectMime = (b64: string): string => {
      if (b64.startsWith('/9j/')) return 'image/jpeg';
      if (b64.startsWith('iVBOR')) return 'image/png';
      if (b64.startsWith('UklGR')) return 'image/webp';
      if (b64.startsWith('R0lG')) return 'image/gif';
      return 'image/jpeg';
    };

    const cleanUser = trimBase64(cleanBase64(userImage));
    const userMime = detectMime(cleanUser);

    const parts: any[] = [
      { inlineData: { mimeType: userMime, data: cleanUser } },
    ];

    if (clothingImage) {
      parts.push({ inlineData: { mimeType: clothingMimeType || 'image/jpeg', data: trimBase64(cleanBase64(clothingImage)) } });
    }

    if (lastRenderedImage) {
      parts.push({ inlineData: { mimeType: 'image/png', data: cleanBase64(lastRenderedImage) } });
    }

    const hasGarment = !!clothingImage;
    const hasSize = !!(currentSize || previewSize);
    const sizeNote = hasSize
      ? previewSize
        ? ` Size: person is ${currentSize}, show garment as ${previewSize} (${
            ['XS', 'S'].includes(previewSize) && ['L', 'XL', 'XXL', '3XL'].includes(currentSize || '')
              ? 'tight/fitted'
              : ['XL', 'XXL', '3XL'].includes(previewSize) && ['XS', 'S', 'M'].includes(currentSize || '')
                ? 'oversized/loose'
                : 'natural fit'
          }).`
        : ` Size ${currentSize}, natural fit.`
      : '';
    console.log('Gemini input:', { hasGarment, hasSize, currentSize, previewSize, partsCount: parts.length, userSize: userImage.length, garmentSize: clothingImage?.length || 0 });

    let promptText: string;

    if (modificationPrompt && lastRenderedImage) {
      promptText = `Modify the previous render (IMG ${hasGarment ? '3' : '2'}): "${modificationPrompt}". Keep the same person, change ONLY what was requested. Output one photorealistic image.`;
    } else if (hasGarment) {
      promptText = `VIRTUAL TRY-ON: IMG1=person, IMG2=item to wear/apply.${sizeNote}

Generate ONE photorealistic image of the person from IMG1 wearing/using the item from IMG2.

Rules:
1. The person must look EXACTLY like IMG1 — same face, skin, hair, body, pose, background.
2. Detect what IMG2 shows and apply it correctly:
   - Clothing (shirt, dress, pants, jacket, etc) → swap the relevant clothing area
   - Glasses/sunglasses → place on the person's face naturally
   - Jewelry (necklace, earrings, bracelet, ring, watch) → add to the correct body part
   - Hat/headwear → place on head naturally
   - Shoes → replace footwear
   - Bag/purse → add as carried accessory
   - Tattoo → apply to visible skin naturally
   - Nails/manicure → apply to fingernails
   - Any other wearable item → apply where it naturally belongs
3. Keep clothing/items that are NOT being replaced.
4. Result must look like a real photograph with natural shadows and proportions.${hasSize ? '\n5. Adjust fit to match specified size.' : ''}

You MUST generate an image.`;
    } else {
      promptText = `Enhance this fashion photo. Keep person, clothing, pose identical. Improve lighting and quality. You MUST generate an image.`;
    }

    parts.push({ text: promptText });

    // Retry with single model
    let lastFailReason = '';

    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const currentParts = attempt === 1 ? parts : [
          ...parts.slice(0, -1),
          { text: hasGarment
            ? `Put the item from IMG2 on the person from IMG1. Keep person identical. Photorealistic output. You MUST generate an image.`
            : `Enhance this photo. Keep person identical. You MUST generate an image.`
          },
        ];

        console.log(`${MODEL} attempt ${attempt}...`);

        const response = await ai.models.generateContent({
          model: MODEL,
          contents: [{ role: 'user', parts: currentParts }],
          config: {
            responseModalities: ["TEXT", "IMAGE"],
          },
        });

        const candidate = response.candidates?.[0];
        const responseParts = candidate?.content?.parts || [];
        console.log(`Attempt ${attempt} - finishReason:`, candidate?.finishReason, "parts:", responseParts.length);

        for (const part of responseParts) {
          if ((part as any).inlineData?.data) {
            console.log(`Image generated (attempt ${attempt}), size:`, (part as any).inlineData.data.length);
            return { image: `data:image/png;base64,${(part as any).inlineData.data}` };
          }
          if ((part as any).text) {
            console.log("Text part:", (part as any).text.substring(0, 200));
          }
        }
        console.warn(`Attempt ${attempt} - no image returned`);
        lastFailReason = `no image returned (${candidate?.finishReason})`;
      } catch (err: any) {
        const msg = err?.message?.substring(0, 200) || 'unknown';
        console.warn(`Attempt ${attempt} error:`, msg);
        lastFailReason = msg;
      }
      if (attempt < 2) await new Promise(r => setTimeout(r, 200));
    }

    console.error("All attempts failed:", lastFailReason);
    return { image: null, failReason: lastFailReason };
  } catch (error: any) {
    const status = error?.status || error?.code;
    const message = error?.message || '';
    console.error("Gemini error:", status, message?.substring(0, 500));
    return { image: null, failReason: `${status}: ${message?.substring(0, 200)}` };
  }
}

export function createFashionChat(history: any[]): Chat {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: { systemInstruction: SYSTEM_INSTRUCTION },
    history,
  });
}
