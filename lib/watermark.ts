/**
 * Watermark for unauthenticated demo renders.
 * Tuned so the render quality is clearly visible (visitor thinks "wow") but
 * the watermark is unmistakable — they want to pay to remove it. Reducing
 * any of these values further risks making the demo look like the paid
 * product, which kills conversion.
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

      // Light dim — enough to signal "preview" without obscuring detail.
      ctx.fillStyle = 'rgba(0, 0, 0, 0.14)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Diagonal AGALAZ DEMO grid — sparser + lower opacity than before so the
      // render shines through but the brand mark stays anti-screenshottable.
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(-Math.PI / 4);
      ctx.font = `900 ${Math.max(canvas.width, canvas.height) * 0.06}px -apple-system, sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.32)';
      ctx.textAlign = 'center';
      const text = 'AGALAZ · DEMO';
      const spacing = Math.max(canvas.width, canvas.height) * 0.2;
      for (let y = -canvas.height; y < canvas.height * 2; y += spacing) {
        for (let x = -canvas.width; x < canvas.width * 2; x += spacing) {
          ctx.fillText(text, x - canvas.width / 2, y - canvas.height / 2);
        }
      }
      ctx.restore();

      // Smaller centre lock badge — present but stops dominating the face/body.
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const r = Math.min(canvas.width, canvas.height) * 0.12;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fill();
      ctx.font = `bold ${r * 0.85}px -apple-system, sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🔒', cx, cy - r * 0.18);
      ctx.font = `900 ${r * 0.32}px -apple-system, sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.fillText('AGALAZ', cx, cy + r * 0.42);
      ctx.font = `${r * 0.2}px -apple-system, sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.fillText('agalaz.com', cx, cy + r * 0.7);

      // Slimmer bottom-bar CTA — still tells the user how to remove the mark.
      const barHeight = Math.max(canvas.height * 0.055, 44);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.fillRect(0, canvas.height - barHeight, canvas.width, barHeight);
      ctx.font = `900 ${barHeight * 0.42}px -apple-system, sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        'PRUEBA · COMPRA PARA QUITAR LA MARCA · agalaz.com',
        canvas.width / 2,
        canvas.height - barHeight / 2,
      );

      resolve(canvas.toDataURL('image/jpeg', 0.85));
    };
    img.src = imageDataUrl;
  });
}
