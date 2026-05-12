/**
 * Viral attribution mark for demo renders.
 *
 * Strategic shift from earlier "anti-piracy" heavy watermark to a small,
 * shareable brand pill in the bottom-right corner. The render itself is shown
 * pristine — when users screenshot/share to friends, the mark advertises
 * Agalaz instead of screaming "demo limitation". Conversion comes from the
 * unlock CTAs surrounding the image (sign in / share to remove), not from
 * disfiguring the render.
 */
export function applyWatermark(imageDataUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);

      const minDim = Math.min(canvas.width, canvas.height);
      const fontSize = Math.max(minDim * 0.024, 12);
      const sparkSize = fontSize * 0.88;
      const innerPaddingX = fontSize * 0.95;
      const innerPaddingY = fontSize * 0.60;
      const margin = minDim * 0.030;

      ctx.font = `500 ${fontSize}px -apple-system, "Inter", "Helvetica Neue", sans-serif`;
      const text = 'agalaz.com';
      const textWidth = ctx.measureText(text).width;

      // Pill geometry: spark + gap + text
      const sparkGap = fontSize * 0.42;
      const contentWidth = sparkSize + sparkGap + textWidth;
      const pillW = contentWidth + innerPaddingX * 2;
      const pillH = fontSize + innerPaddingY * 2;
      const pillX = canvas.width - pillW - margin;
      const pillY = canvas.height - pillH - margin;
      const radius = pillH / 2;

      // Helper: draw a rounded pill path on the current ctx.
      const pillPath = () => {
        ctx.beginPath();
        ctx.moveTo(pillX + radius, pillY);
        ctx.arcTo(pillX + pillW, pillY, pillX + pillW, pillY + pillH, radius);
        ctx.arcTo(pillX + pillW, pillY + pillH, pillX, pillY + pillH, radius);
        ctx.arcTo(pillX, pillY + pillH, pillX, pillY, radius);
        ctx.arcTo(pillX, pillY, pillX + pillW, pillY, radius);
        ctx.closePath();
      };

      // Rounded pill — vertical gradient (slate-800 → slate-950) gives the
      // pill a subtle glass-depth feel instead of a flat black tag. Soft
      // drop-shadow underneath floats it off the render.
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.30)';
      ctx.shadowBlur = fontSize * 0.8;
      ctx.shadowOffsetY = fontSize * 0.18;
      const gradient = ctx.createLinearGradient(0, pillY, 0, pillY + pillH);
      gradient.addColorStop(0, 'rgba(30, 41, 59, 0.62)');   // slate-800 top
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0.68)');   // slate-900 bottom
      ctx.fillStyle = gradient;
      pillPath();
      ctx.fill();
      ctx.restore();

      // Highlight rim — top-half lighter stroke for the glass effect, full
      // pill darker stroke for crispness.
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
      ctx.lineWidth = Math.max(1, fontSize * 0.05);
      pillPath();
      ctx.stroke();

      // Sparkle glyph (✦) — accent color matches the site's indigo brand.
      const contentX = pillX + innerPaddingX;
      const centreY = pillY + pillH / 2;
      ctx.font = `600 ${sparkSize}px -apple-system, "Inter", sans-serif`;
      ctx.fillStyle = 'rgba(165, 180, 252, 0.98)';   // indigo-300
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('✦', contentX, centreY);

      // Brand mark — light, lowercase, slightly tighter than default.
      ctx.font = `500 ${fontSize}px -apple-system, "Inter", "Helvetica Neue", sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.97)';
      ctx.fillText(text, contentX + sparkSize + sparkGap, centreY);

      resolve(canvas.toDataURL('image/jpeg', 0.92));
    };
    img.src = imageDataUrl;
  });
}
