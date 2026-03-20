import { GoogleGenAI, type Chat } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY || '';

const SYSTEM_INSTRUCTION = `
You are Agalaz, a virtual try-on engine. You take a photo of a person and a garment, and generate a realistic image of that person wearing the garment.
`;

// Warn on oversized images
function trimBase64(data: string, maxBytes: number = 1_000_000): string {
  if (data.length * 0.75 > maxBytes) {
    console.warn(`Image too large (${Math.round(data.length * 0.75 / 1024)}KB), may cause issues`);
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

    const parts: any[] = [
      { inlineData: { mimeType: 'image/jpeg', data: trimBase64(cleanBase64(userImage)) } },
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
      // Modification flow — keep it short
      promptText = `Modify the previous render (IMG ${hasGarment ? '3' : '2'}): "${modificationPrompt}". Keep the same person, change ONLY what was requested. Output one photorealistic image.`;
    } else if (hasGarment) {
      // Main try-on flow — optimized for quality and speed
      promptText = `VIRTUAL TRY-ON: IMG1 is a photo of a PERSON. IMG2 is a photo of a GARMENT (clothing item).${sizeNote}

TASK: Generate ONE photorealistic image where the person from IMG1 is wearing the garment from IMG2.

CRITICAL INSTRUCTIONS:
1. IDENTITY: The person must look EXACTLY like IMG1 — same face, skin tone, hair, body shape, pose, and background. Do NOT alter the person.
2. GARMENT SWAP: Look at IMG2 carefully. It shows a specific garment (could be a shirt, dress, pants, jacket, etc). REMOVE the person's current clothing in that body area and REPLACE it with this exact garment from IMG2, preserving its color, pattern, texture, and design details.
3. GARMENT TYPE DETECTION: If IMG2 shows a top/shirt/blouse/jacket → only replace upper body clothing. If IMG2 shows pants/skirt → only replace lower body. If IMG2 shows a dress/jumpsuit/full outfit → replace all clothing.
4. REALISM: The garment must fit naturally on the person's body with proper draping, wrinkles, shadows, and proportions. It should look like a real photograph, not a collage.${hasSize ? '\n5. SIZE: Adjust the garment fit to match the specified size realistically.' : ''}

You MUST output exactly one photorealistic image. Do not output text only.`;
    } else {
      // Enhancement flow
      promptText = `Enhance this fashion photo. Keep person, clothing, pose identical. Improve lighting and quality. Output one photorealistic image. You MUST generate an image.`;
    }

    parts.push({ text: promptText });

    // Retry logic — 2 attempts, minimal delay
    const tryGenerate = async (inputParts: any[], label: string): Promise<string | null> => {
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          const currentParts = attempt === 1 ? inputParts : [
            ...inputParts.slice(0, -1),
            { text: hasGarment
              ? `Generate a photorealistic image of the person in IMG1 wearing the garment shown in IMG2. Keep the person identical (face, body, pose, background). The garment from IMG2 must replace their current clothing naturally. Output one image.`
              : `Enhance this fashion photo. Keep person identical. You MUST generate an image.`
            },
          ];

          const response = await ai.models.generateContent({
            model: 'gemini-3.1-flash-image-preview',
            contents: { parts: currentParts },
            config: {
              responseModalities: ["TEXT", "IMAGE"],
              temperature: 0.4,
            },
          });

          const candidate = response.candidates?.[0];
          const responseParts = candidate?.content?.parts || [];
          console.log(`${label} attempt ${attempt} - finishReason:`, candidate?.finishReason, "parts:", responseParts.length);

          for (const part of responseParts) {
            if ((part as any).inlineData?.data) {
              console.log(`Image generated (${label} attempt ${attempt}), size:`, (part as any).inlineData.data.length);
              return (part as any).inlineData.data;
            }
            if ((part as any).text) {
              console.log("Text part:", (part as any).text.substring(0, 200));
            }
          }
          console.warn(`${label} attempt ${attempt}/2 - no image returned, reason: ${candidate?.finishReason}`);
        } catch (retryErr: any) {
          console.warn(`${label} attempt ${attempt}/2 error:`, retryErr?.message?.substring(0, 200));
          if (retryErr?.message?.includes('INVALID_ARGUMENT')) throw retryErr;
          if (attempt === 2) throw retryErr;
        }
        if (attempt < 2) await new Promise(r => setTimeout(r, 150));
      }
      return null;
    };

    let lastFailReason = '';
    try {
      const result = await tryGenerate(parts, 'TryOn');
      if (result) return { image: `data:image/png;base64,${result}` };
      lastFailReason = 'no image returned';
    } catch (err: any) {
      lastFailReason = err?.message?.substring(0, 200) || 'unknown';
      console.warn('Generation failed:', lastFailReason);
    }

    console.error("All generation attempts failed, lastReason:", lastFailReason);
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
