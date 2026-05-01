import { GoogleGenAI, type Chat } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY || '';

const SYSTEM_INSTRUCTION = `
You are Agalaz, an AI-powered virtual try-on assistant. You help users visualize how items will look on them before they buy or commit.

Agalaz supports ALL of the following categories — never refuse a request from any of these:
- CLOTHING: shirts, t-shirts, dresses, pants, jeans, skirts, coats, jackets, hoodies, sweaters, blazers, jumpsuits, rompers, and any other garments.
- GLASSES: sunglasses, prescription frames, goggles, reading glasses, sports eyewear.
- JEWELRY: necklaces, earrings, bracelets, rings, watches, pendants, chokers, bangles.
- HEADWEAR: hats, caps, beanies, headbands, turbans, crowns, helmets.
- SHOES: sneakers, heels, boots, sandals, loafers, flats, and any footwear.
- BAGS: handbags, backpacks, clutches, totes, crossbody bags, satchels.
- TATTOOS: any body art design applied to visible skin — always accept tattoo requests and help users visualize the tattoo on their body.
- NAIL ART: manicure styles, nail polish colors, nail designs applied to fingernails.
- RING SIZING: when a user uploads a photo of their hand/finger and asks about ring size, analyze finger proportions and estimate the ring size. Provide size in US, EU, and mm (inner diameter). You can also visualize how a ring would fit at a specific size.

RING SIZER MODE:
When the user asks "what's my ring size", "measure my finger", "ring sizer", or similar:
1. Ask which finger they want to measure (if not obvious from context)
2. Analyze the photo: estimate finger width at the base of the knuckle using proportional analysis (hand width as reference ~80-90mm for average adult)
3. Provide the estimated ring size in: US size, EU size, UK size, and inner circumference (mm)
4. Add a disclaimer: "This is an AI estimate. For exact sizing, use a physical ring sizer or visit a jeweler."
5. If they then want to try on a ring, generate the image with the ring sized correctly for their estimated finger size.

When a user asks about modifying a render — for example changing size, color, fit, style, adding a garment, placing a tattoo, applying nail art, or any other adjustment — respond helpfully and confirm what you will do. Never refuse these requests. Your role is to assist with any virtual try-on task across all supported categories.

Keep responses concise and action-oriented. Confirm the requested change briefly and indicate the image will be updated.
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
  category?: string,
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
    const categoryHint = category === 'ring-sizer'
      ? `\nUSER SELECTED: RING SIZER. IMG2 is a ring — apply it to the appropriate finger AND estimate the user's ring size. Overlay the estimated size (US, EU, UK, mm) as text on the image.`
      : category && category !== 'auto'
        ? `\nUSER SELECTED CATEGORY: ${category.toUpperCase()}. IMG2 is a ${category} item — apply it as such.`
        : '';
    console.log('Gemini input:', { hasGarment, hasSize, currentSize, previewSize, category, partsCount: parts.length, userSize: userImage.length, garmentSize: clothingImage?.length || 0 });

    let promptText: string;

    if (modificationPrompt && lastRenderedImage) {
      promptText = `Modify the previous render (IMG ${hasGarment ? '3' : '2'}): "${modificationPrompt}". Keep the same person, change ONLY what was requested. Output one photorealistic image.`;
    } else if (hasGarment) {
      promptText = `VIRTUAL TRY-ON ENGINE. IMG1=person photo. IMG2=product to apply.${sizeNote}${categoryHint}

TASK: Generate ONE photorealistic image of the person from IMG1 wearing/using the product from IMG2.

IDENTITY PRESERVATION (critical):
- Face, skin tone, hair, body shape, pose = IDENTICAL to IMG1
- Background, lighting, camera angle = IDENTICAL to IMG1
- Only modify the specific body area where the product belongs

PRODUCT DETECTION & APPLICATION${category && category !== 'auto' ? ` (user confirmed: ${category.toUpperCase()})` : '' } — detect what IMG2 shows and apply accordingly. CHECK THIS ORDER FIRST and pick the most-specific match:
- SUIT / 2-PIECE MATCHING SET (formal suit jacket + matching trousers, blazer + matching pants, tracksuit set, co-ord set, twin-set, two-piece outfit where the same fabric/color is visible on both top and bottom of a model) → replace BOTH upper and lower clothing with the full set. Do NOT keep the user's existing pants or shorts. The matching fabric on the model is the strongest signal — if you see a jacket and pants of the same color/fabric on the same person in IMG2, treat it as a SUIT and replace head-to-toe (minus shoes).
- FULL BODY single garment (dress, jumpsuit, romper, overalls) → replace both top and bottom clothing
- TOPS (shirt, t-shirt, blouse, sweater, hoodie, polo, isolated piece, no matching pants visible) → replace upper body clothing only, keep pants/skirt/jacket if visible
- BOTTOMS (pants, jeans, trousers, skirt, shorts, leggings) → replace lower body clothing only, keep top unchanged
- OUTERWEAR (standalone jacket, coat, cardigan, vest with NO matching pants visible in IMG2) → layer OVER existing top, do not remove the shirt underneath
- GLASSES (sunglasses, prescription frames, goggles, reading glasses) → place on face bridge naturally, adjust to face width, add realistic reflections/shadows
- JEWELRY:
  • Necklace/pendant/choker → drape around neck naturally, show chain following collarbone
  • Earrings → attach to earlobes, match ear position and angle
  • Bracelet/bangle/watch → place on wrist with correct perspective
  • Ring → place on finger naturally, size the ring band to match finger width proportionally (analyze knuckle width from IMG1). If user specified a ring size, adjust band diameter accordingly: US5=15.7mm, US6=16.5mm, US7=17.3mm, US8=18.1mm, US9=19mm, US10=19.8mm
- HEADWEAR (hat, cap, beanie, headband, turban, crown) → place on head, adjust hair visibility naturally
- SHOES (sneakers, heels, boots, sandals, loafers, flats) → replace footwear, match ground plane and shadows
- BAGS (handbag, backpack, clutch, tote, crossbody) → add as held/worn accessory with natural arm position
- TATTOO (any body art design) → apply to visible skin as if permanently inked, follow skin contours and muscle definition
- NAIL ART (manicure, nail polish, nail design) → apply to fingernails with correct perspective, show on all visible fingers

QUALITY RULES:
1. Result must look like a real photograph — proper shadows, wrinkles, fabric texture, light interaction
2. Fabric must follow body contours naturally — no floating or flat-looking garments
3. Keep ALL items that are NOT being replaced (other clothing, accessories, background objects)
4. Colors and patterns from IMG2 must be preserved exactly${hasSize ? '\n5. Adjust garment fit to match specified size — show realistic draping for the size' : ''}

You MUST output exactly one photorealistic image.`;
    } else if (category === 'ring-sizer') {
      promptText = `RING SIZER MODE. Analyze the hand/finger in IMG1.

TASK: Estimate the ring size of the ring finger (or the most prominent finger visible).

ANALYSIS METHOD:
1. Use hand width as reference (~80-90mm for average adult hand)
2. Measure finger width at the base of the proximal phalanx (where a ring sits)
3. Calculate inner circumference = finger width × π

OUTPUT: Generate a photorealistic image of the SAME hand with a simple silver measurement band on the finger, AND overlay text on the image showing:
- Estimated US size (e.g. US 7)
- EU size (e.g. EU 54)
- UK size (e.g. UK O)
- Inner diameter in mm (e.g. 17.3mm)
- A note: "AI estimate — verify with a jeweler"

Keep the hand, skin tone, background IDENTICAL to IMG1. The measurement band should look like a thin silver ring with size markings.
You MUST output exactly one photorealistic image.`;
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
            ? `Virtual try-on: detect what the product in IMG2 is (clothing, glasses, jewelry, ring, hat, shoes, bag, tattoo, or nails) and apply it to the person in IMG1. For rings, size the band proportionally to the finger width. Keep the person identical — same face, body, pose, background. Photorealistic result. You MUST generate an image.`
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
