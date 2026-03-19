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

    const promptBase = hasGarment
      ? `VIRTUAL TRY-ON:
    - PERSON (IMG 1): Photo of the person. This is the person who will wear the garment. Preserve their exact face, body, pose, and background.
    - GARMENT (IMG 2): The clothing item to try on.
    ${lastRenderedImage ? '- PREVIOUS RENDER (IMG 3): Use as base, apply ONLY the requested change.' : ''}

    TASK: ${modificationPrompt
        ? `Modify the previous render: "${modificationPrompt}". Keep the same person and change ONLY what was requested.`
        : "Generate a photorealistic image of the person in IMG 1 wearing the garment from IMG 2. Replace ONLY the relevant clothing area — keep face, hair, pose, background, and any non-replaced clothing intact."}

    RULES:
    1. The person MUST be the same person as IMG 1 — same face, skin tone, hair.
    2. Keep the pose, background, and body proportions from IMG 1.
    3. Only replace the clothing area that matches the garment type (top, bottom, full outfit, accessory).
    4. Realistic lighting, shadows, and fabric draping.

    OUTPUT: 8k photorealistic image. You MUST generate an image.`
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
          ? `Show the person from IMG 1 wearing the garment from IMG 2. Photorealistic result. You MUST generate an image.`
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
