import { GoogleGenAI, type Chat } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY || '';

const SYSTEM_INSTRUCTION = `
You are Agalaz, a virtual try-on engine. You take a photo of a person and a garment, and generate a realistic image of that person wearing the garment.
`;

// Warn on oversized images
function trimBase64(data: string, maxBytes: number = 1_500_000): string {
  if (data.length * 0.75 > maxBytes) {
    console.warn(`Image too large (${Math.round(data.length * 0.75 / 1024)}KB), may cause issues`);
  }
  return data;
}

/**
 * Generate a try-on image from a single user photo + optional garment.
 * Simplified flow: 1 user photo instead of separate face + body.
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
    const sizeInstruction = hasSize
      ? previewSize
        ? `\n    SIZE: The person's actual size is ${currentSize}. Show the garment fitting as a SIZE ${previewSize} would look on them. ${
            ['XS', 'S'].includes(previewSize) && ['L', 'XL', 'XXL', '3XL'].includes(currentSize || '')
              ? 'The garment should look tight/fitted on the person.'
              : ['XL', 'XXL', '3XL'].includes(previewSize) && ['XS', 'S', 'M'].includes(currentSize || '')
                ? 'The garment should look oversized/loose/baggy on the person.'
                : 'Adjust the garment fit accordingly.'
          }`
        : `\n    SIZE: The person wears size ${currentSize}. Show the garment fitting naturally for this size.`
      : '';
    console.log('Gemini input:', { hasGarment, hasSize, currentSize, previewSize, partsCount: parts.length, userSize: userImage.length, garmentSize: clothingImage?.length || 0 });

    const promptBase = hasGarment
      ? `VIRTUAL TRY-ON — CLOTHING SWAP:
    - IMAGE 1 (PERSON): Photo of a person. Keep their exact face, skin tone, hair, body shape, pose, and background.
    - IMAGE 2 (NEW GARMENT): This is the NEW clothing item. The person MUST wear this exact garment in the output.
    ${lastRenderedImage ? '- IMAGE 3 (PREVIOUS RENDER): Use as base, apply ONLY the requested change.' : ''}${sizeInstruction}

    TASK: ${modificationPrompt
        ? `Modify the previous render: "${modificationPrompt}". Keep the same person and change ONLY what was requested.`
        : `REMOVE the clothing the person is currently wearing in the relevant area and REPLACE it with the garment from IMAGE 2. The output MUST show the person wearing the NEW garment from IMAGE 2, NOT their original clothing. This is a clothing swap — the original top/bottom/outfit must be completely replaced by the new garment.`}

    CRITICAL RULES:
    1. The person MUST be wearing the garment from IMAGE 2 in the final output. Do NOT keep their original clothing.
    2. The person MUST look identical to IMAGE 1 — same face, skin tone, hair, pose, background.
    3. Match the garment type: if IMAGE 2 is a top (shirt, sweater, jacket), replace the person's upper body clothing. If it's pants, replace lower body. If it's a full outfit, replace everything.
    4. The garment must fit naturally on the person's body with realistic wrinkles, shadows, and draping.${hasSize ? `\n    5. The garment fit MUST reflect the specified size — show realistic sizing differences (tight, normal, loose, oversized).` : ''}
    5. Keep any clothing that is NOT being replaced (e.g., if swapping a top, keep the original pants).

    OUTPUT: One single 8k photorealistic image showing the person wearing the new garment. You MUST generate an image.`
      : `PHOTO ENHANCEMENT:
    - PERSON (IMG 1): Photo of the person.
    ${lastRenderedImage ? '- PREVIOUS RENDER (IMG 2): Use as base, apply ONLY the requested change.' : ''}

    TASK: ${modificationPrompt
        ? `Modify the image: "${modificationPrompt}". Keep the same person.`
        : "Generate an enhanced fashion editorial version of this photo. Keep the person, clothing, and pose identical. Improve lighting and quality."}

    OUTPUT: 8k photorealistic image. You MUST generate an image.`;

    parts.push({ text: promptBase });

    // Retry logic
    const tryGenerate = async (inputParts: any[], label: string): Promise<string | null> => {
      const retryPrompts = [
        inputParts[inputParts.length - 1].text,
        hasGarment
          ? `SWAP the person's clothing: REMOVE their current clothes and DRESS them in the garment from IMAGE 2. The output must show the person wearing ONLY the new garment, not their original clothing. Photorealistic result. You MUST generate an image.`
          : `Enhance this fashion photo. Keep the person identical. You MUST generate an image.`,
      ];

      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          const currentParts = attempt === 1 ? inputParts : [
            ...inputParts.slice(0, -1),
            { text: retryPrompts[attempt - 1] },
          ];

          const response = await ai.models.generateContent({
            model: 'gemini-3.1-flash-image-preview',
            contents: { parts: currentParts },
            config: { responseModalities: ["TEXT", "IMAGE"] },
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
        await new Promise(r => setTimeout(r, 500));
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
