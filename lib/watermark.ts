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
      const fontSize = Math.max(minDim * 0.026, 13);
      const sparkSize = fontSize * 0.95;
      const innerPaddingX = fontSize * 0.85;
      const innerPaddingY = fontSize * 0.55;
      const margin = minDim * 0.028;

      ctx.font = `600 ${fontSize}px -apple-system, "Inter", "Helvetica Neue", sans-serif`;
      const text = 'Made with Agalaz AI';
      const textWidth = ctx.measureText(text).width;

      // Pill geometry: spark + gap + text
      const sparkGap = fontSize * 0.45;
      const contentWidth = sparkSize + sparkGap + textWidth;
      const pillW = contentWidth + innerPaddingX * 2;
      const pillH = fontSize + innerPaddingY * 2;
      const pillX = canvas.width - pillW - margin;
      const pillY = canvas.height - pillH - margin;
      const radius = pillH / 2;

      // Rounded pill background — frosted dark, soft shadow underneath.
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
      ctx.shadowBlur = fontSize * 0.6;
      ctx.shadowOffsetY = fontSize * 0.12;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.55)';
      ctx.beginPath();
      ctx.moveTo(pillX + radius, pillY);
      ctx.arcTo(pillX + pillW, pillY, pillX + pillW, pillY + pillH, radius);
      ctx.arcTo(pillX + pillW, pillY + pillH, pillX, pillY + pillH, radius);
      ctx.arcTo(pillX, pillY + pillH, pillX, pillY, radius);
      ctx.arcTo(pillX, pillY, pillX + pillW, pillY, radius);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Subtle inner stroke for crispness against busy backgrounds.
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = Math.max(1, fontSize * 0.06);
      ctx.beginPath();
      ctx.moveTo(pillX + radius, pillY);
      ctx.arcTo(pillX + pillW, pillY, pillX + pillW, pillY + pillH, radius);
      ctx.arcTo(pillX + pillW, pillY + pillH, pillX, pillY + pillH, radius);
      ctx.arcTo(pillX, pillY + pillH, pillX, pillY, radius);
      ctx.arcTo(pillX, pillY, pillX + pillW, pillY, radius);
      ctx.closePath();
      ctx.stroke();

      // Sparkle glyph (✦) — gives the pill a "premium AI" vibe.
      const contentX = pillX + innerPaddingX;
      const centreY = pillY + pillH / 2;
      ctx.font = `700 ${sparkSize}px -apple-system, "Inter", sans-serif`;
      ctx.fillStyle = 'rgba(167, 139, 250, 0.95)';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('✦', contentX, centreY);

      // Brand mark — semi-bold white, tight tracking.
      ctx.font = `600 ${fontSize}px -apple-system, "Inter", "Helvetica Neue", sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
      ctx.fillText(text, contentX + sparkSize + sparkGap, centreY);

      resolve(canvas.toDataURL('image/jpeg', 0.92));
    };
    img.src = imageDataUrl;
  });
}
