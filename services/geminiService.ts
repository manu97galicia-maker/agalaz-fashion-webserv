import { GoogleGenAI, type Chat } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY || '';

const SYSTEM_INSTRUCTION = `
You are Agalaz v7.0 "Precision Component Engine". Your specialty is surgical fashion editing.

STRICT PRESERVATION RULES:
1. IMMUTABLE BASE (Img 2): This is your master structure. DO NOT change pants, shoes, background, hair, or pose. If the user wears shorts in Img 2, they MUST remain shorts.
2. FACIAL MAPPING (Img 1): Project the facial identity from Img 1 onto the head of Img 2. The neck and jawline of Img 2 must be maintained for a natural transition. Avoid the "overlaid mask" effect.
3. TORSO REPLACEMENT (Img 3): Replace ONLY the upper garment (shirt/jacket) of Img 2 with the style and color from Img 3.
4. PHOTOGRAPHIC COHERENCE: The final result must preserve the grain, resolution, and exact lighting of the original body photo (Img 2).
5. TEXT: Respond with technical elegance in fewer than 8 words.
`;

// Truncate oversized base64 images by checking byte size
// Gemini works best with images under 1MB
function trimBase64(data: string, maxBytes: number = 1_500_000): string {
  // base64 length * 0.75 ≈ byte size
  if (data.length * 0.75 > maxBytes) {
    console.warn(`Image too large (${Math.round(data.length * 0.75 / 1024)}KB), may cause issues`);
  }
  return data;
}

export async function generateTryOnImage(
  faceImage: string,
  bodyImage: string,
  clothingImage?: string,
  modificationPrompt?: string,
  lastRenderedImage?: string,
  clothingMimeType?: string,
): Promise<string | null> {
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    // Clean base64 data (remove data URL prefix if present)
    const cleanBase64 = (s: string) => s.replace(/^data:image\/[^;]+;base64,/, '');

    const parts: any[] = [
      { inlineData: { mimeType: 'image/jpeg', data: trimBase64(cleanBase64(faceImage)) } },
      { inlineData: { mimeType: 'image/jpeg', data: trimBase64(cleanBase64(bodyImage)) } },
    ];

    if (clothingImage) {
      parts.push({ inlineData: { mimeType: clothingMimeType || 'image/jpeg', data: trimBase64(cleanBase64(clothingImage)) } });
    }

    if (lastRenderedImage) {
      const base64Data = cleanBase64(lastRenderedImage);
      parts.push({ inlineData: { mimeType: 'image/png', data: base64Data } });
    }

    const hasGarment = !!clothingImage;
    const lastImgLabel = hasGarment
      ? (lastRenderedImage ? 'IMG 4' : null)
      : (lastRenderedImage ? 'IMG 3' : null);

    const promptBase = hasGarment
      ? `STRICT EDITORIAL COMPOSITING & CONSISTENCY:
    - IDENTITY (IMG 1): Source for the face. THE PERSON IN THE FINAL IMAGE MUST BE THE SAME PERSON AS IMG 1. Use their exact facial features, skin tone, hair color, and facial structure.
    - STRUCTURE (IMG 2): Source for the body pose, background, and environment. Full-body photo from head to feet.
    - GARMENT (IMG 3): Source for the top clothing only.
    ${lastImgLabel ? `- CURRENT STATE (${lastImgLabel}): This is the PREVIOUS RENDER. Use as base and apply ONLY the requested change. The face MUST still match IMG 1.` : ''}

    CRITICAL TASK: ${modificationPrompt ? `Modify the image according to: "${modificationPrompt}". Start from ${lastImgLabel || 'the composition'} and apply ONLY this change. The face MUST remain identical to IMG 1. Keep every other pixel unchanged.` : "Seamlessly integrate the face (IMG 1) and the top garment (IMG 3) onto the body (IMG 2)."}

    ABSOLUTE RULES:
    1. FACE IDENTITY: The face in the output MUST be the EXACT same person as IMG 1. Never generate a different person.
    2. PRESERVATION: Pants, shoes, and background from IMG 2 are SACRED. Do not alter unless asked.
    3. CONSISTENCY: If ${lastImgLabel || 'a previous render'} exists, change ONLY what was requested. Keep the same person.
    4. REALISM: Shadows and lighting must match perfectly.

    QUALITY: 8k, photorealistic, perfect skin blending, no anatomical distortions.`
      : `FACE SWAP & BODY PRESERVATION:
    - IDENTITY (IMG 1): Source for the face. THE OUTPUT MUST SHOW THE EXACT SAME PERSON AS IMG 1. Use their exact facial features, skin tone, hair color, and facial structure.
    - STRUCTURE (IMG 2): Source for the body, clothing, pose, background, and environment. Full-body photo from head to feet.
    ${lastImgLabel ? `- CURRENT STATE (${lastImgLabel}): This is the PREVIOUS RENDER. Use as base and apply ONLY the requested change. The face MUST still match IMG 1.` : ''}

    CRITICAL TASK: ${modificationPrompt ? `Modify the image according to: "${modificationPrompt}". The face MUST remain identical to IMG 1. Keep every other pixel as close to ${lastImgLabel || 'IMG 2'} as possible.` : "Seamlessly map the face from IMG 1 onto the body in IMG 2. Keep the ENTIRE outfit, pose, background, and body proportions from IMG 2 completely unchanged."}

    ABSOLUTE RULES:
    1. FACE IDENTITY: The face in the output MUST be the EXACT same person as IMG 1. Never generate a different person.
    2. PRESERVATION: ALL clothing, shoes, accessories, and background from IMG 2 are SACRED.
    3. REALISM: Skin tone blending, lighting, and shadows must match perfectly.

    QUALITY: 8k, photorealistic, perfect skin blending, no anatomical distortions.`;

    parts.push({ text: promptBase + "\n\nIMPORTANT: You MUST output a generated image. Do NOT respond with text only. Generate the composite image now." });

    // Attempt generation with up to 2 retries
    const MAX_ATTEMPTS = 3;
    let lastFailReason = '';
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        // On retry, use a simpler prompt to reduce safety filter triggers
        const currentParts = attempt === 1 ? parts : [
          ...parts.slice(0, -1),
          { text: attempt === 2
            ? `Create a fashion editorial photo: place the face from IMG 1 onto the body in IMG 2${hasGarment ? ', wearing the garment from IMG 3' : ''}. Output a photorealistic full-body image. You MUST generate an image.`
            : `Combine these photos into one fashion photo. Face from first image, body from second${hasGarment ? ', clothing from third' : ''}. Generate the image now.`
          },
        ];

        const response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-image-preview',
          contents: { parts: currentParts },
          config: {
            responseModalities: ["TEXT", "IMAGE"],
          },
        });

        const candidate = response.candidates?.[0];
        const responseParts = candidate?.content?.parts || [];
        console.log(`Gemini attempt ${attempt} - finishReason:`, candidate?.finishReason, "parts:", responseParts.length);

        for (const part of responseParts) {
          if ((part as any).inlineData?.data) {
            console.log(`Image generated on attempt ${attempt}, size:`, (part as any).inlineData.data.length);
            return `data:image/png;base64,${(part as any).inlineData.data}`;
          }
          if ((part as any).text) {
            console.log("Text part:", (part as any).text.substring(0, 200));
          }
        }

        const finishReason = candidate?.finishReason;
        lastFailReason = finishReason || 'no image returned';
        console.warn(`Attempt ${attempt}/${MAX_ATTEMPTS} failed - reason: ${lastFailReason}`);

        // Always retry if we have attempts left
        if (attempt < MAX_ATTEMPTS) {
          console.log(`Retrying with simpler prompt (attempt ${attempt + 1})...`);
          await new Promise(r => setTimeout(r, 500));
          continue;
        }
      } catch (retryErr: any) {
        lastFailReason = 'error: ' + (retryErr?.message?.substring(0, 200) || 'unknown');
        console.warn(`Attempt ${attempt}/${MAX_ATTEMPTS} error:`, lastFailReason);
        if (attempt === MAX_ATTEMPTS) throw retryErr;
        await new Promise(r => setTimeout(r, 1000));
      }
    }

    console.error("All generation attempts failed, lastReason:", lastFailReason);
    return null;
  } catch (error: any) {
    const status = error?.status || error?.code;
    const message = error?.message || '';
    console.error("Gemini error:", status, message?.substring(0, 500));
    return null;
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
