/**
 * Free-demo watermark — intentionally invasive.
 *
 * Strategic logic: the free demo render exists to *prove* Agalaz works on
 * the user's photo, not to be a free product. A discreet corner pill let
 * too many users screenshot the clean render and bounce. The new mark:
 *
 *   1. Bottom-right brand pill (same shareable identity)
 *   2. Repeated DEMO / AGALAZ.COM diagonal across the entire frame
 *      — soft enough to read the render, loud enough that it's clearly
 *      a demo (you couldn't post this to Instagram and pretend it's clean)
 *   3. Bottom band "UNLOCK CLEAN VERSION" CTA hint
 *
 * Once the user buys ANY pack (trial / starter / pro), the same render is
 * surfaced in /try-on without watermark via localStorage (see
 * TryOnDemoBlock.tsx → setItem('agalaz_demo_unwatermarked', dataUrl)).
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
      const maxDim = Math.max(canvas.width, canvas.height);

      // ─────────────────────────────────────────────────────────────────
      // 1. Diagonal repeated text — fills the whole canvas
      // ─────────────────────────────────────────────────────────────────
      const tileFont = Math.max(minDim * 0.06, 24);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(-Math.PI / 6); // -30°
      ctx.font = `900 ${tileFont}px -apple-system, "Inter", "Helvetica Neue", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const tileText = 'DEMO · AGALAZ.COM ·';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
      const strokeStyle = 'rgba(0, 0, 0, 0.18)';
      ctx.lineWidth = Math.max(2, tileFont * 0.06);
      ctx.strokeStyle = strokeStyle;

      const stepY = tileFont * 2.4;
      const stepX = ctx.measureText(tileText).width + tileFont * 1.8;
      const range = maxDim * 1.5; // overshoot so rotation still covers corners

      for (let y = -range; y <= range; y += stepY) {
        // Offset every other row so the pattern doesn't form columns
        const offset = (Math.floor((y + range) / stepY) % 2) * (stepX / 2);
        for (let x = -range + offset; x <= range; x += stepX) {
          ctx.strokeText(tileText, x, y);
          ctx.fillText(tileText, x, y);
        }
      }
      ctx.restore();

      // ─────────────────────────────────────────────────────────────────
      // 2. Bottom band — "UNLOCK CLEAN VERSION →" semi-transparent overlay
      // ─────────────────────────────────────────────────────────────────
      const bandHeight = Math.max(minDim * 0.075, 36);
      const bandY = canvas.height - bandHeight;
      const bandGradient = ctx.createLinearGradient(0, bandY, 0, canvas.height);
      bandGradient.addColorStop(0, 'rgba(15, 23, 42, 0.0)');
      bandGradient.addColorStop(0.45, 'rgba(15, 23, 42, 0.72)');
      bandGradient.addColorStop(1, 'rgba(15, 23, 42, 0.88)');
      ctx.fillStyle = bandGradient;
      ctx.fillRect(0, bandY, canvas.width, bandHeight);

      const bandFont = Math.max(minDim * 0.022, 11);
      ctx.font = `800 ${bandFont}px -apple-system, "Inter", "Helvetica Neue", sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        'UNLOCK CLEAN VERSION  →  agalaz.com',
        canvas.width / 2,
        bandY + bandHeight * 0.55,
      );

      // ─────────────────────────────────────────────────────────────────
      // 3. Bottom-right brand pill — same shareable identity as before,
      //    sits over the bottom band so it remains readable.
      // ─────────────────────────────────────────────────────────────────
      const fontSize = Math.max(minDim * 0.024, 12);
      const sparkSize = fontSize * 0.88;
      const innerPaddingX = fontSize * 0.95;
      const innerPaddingY = fontSize * 0.6;
      const margin = minDim * 0.03;

      ctx.font = `500 ${fontSize}px -apple-system, "Inter", "Helvetica Neue", sans-serif`;
      const text = 'agalaz.com';
      const textWidth = ctx.measureText(text).width;
      const sparkGap = fontSize * 0.42;
      const contentWidth = sparkSize + sparkGap + textWidth;
      const pillW = contentWidth + innerPaddingX * 2;
      const pillH = fontSize + innerPaddingY * 2;
      const pillX = canvas.width - pillW - margin;
      const pillY = bandY - pillH - margin * 0.5;
      const radius = pillH / 2;

      const pillPath = () => {
        ctx.beginPath();
        ctx.moveTo(pillX + radius, pillY);
        ctx.arcTo(pillX + pillW, pillY, pillX + pillW, pillY + pillH, radius);
        ctx.arcTo(pillX + pillW, pillY + pillH, pillX, pillY + pillH, radius);
        ctx.arcTo(pillX, pillY + pillH, pillX, pillY, radius);
        ctx.arcTo(pillX, pillY, pillX + pillW, pillY, radius);
        ctx.closePath();
      };

      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
      ctx.shadowBlur = fontSize * 1.1;
      ctx.shadowOffsetY = fontSize * 0.2;
      const gradient = ctx.createLinearGradient(0, pillY, 0, pillY + pillH);
      gradient.addColorStop(0, 'rgba(30, 41, 59, 0.92)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0.96)');
      ctx.fillStyle = gradient;
      pillPath();
      ctx.fill();
      ctx.restore();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = Math.max(1, fontSize * 0.05);
      pillPath();
      ctx.stroke();

      const contentX = pillX + innerPaddingX;
      const centreY = pillY + pillH / 2;
      ctx.font = `600 ${sparkSize}px -apple-system, "Inter", sans-serif`;
      ctx.fillStyle = 'rgba(165, 180, 252, 1)';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('✦', contentX, centreY);

      ctx.font = `500 ${fontSize}px -apple-system, "Inter", "Helvetica Neue", sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.fillText(text, contentX + sparkSize + sparkGap, centreY);

      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };
    img.src = imageDataUrl;
  });
}
