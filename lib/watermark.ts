/**
 * Aggressive watermark for unauthenticated demo renders.
 * Goal: visibly degrade the free output enough that visitors are pushed to sign up
 * and buy a render pack. Used by every public try-on landing demo.
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

      // Heavy dimming so the demo render is clearly worse than a paid one.
      ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dense diagonal AGALAZ DEMO grid — tighter spacing + bigger + more opaque.
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(-Math.PI / 4);
      ctx.font = `900 ${Math.max(canvas.width, canvas.height) * 0.085}px -apple-system, sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.textAlign = 'center';
      const text = 'AGALAZ · DEMO';
      const spacing = Math.max(canvas.width, canvas.height) * 0.14;
      for (let y = -canvas.height; y < canvas.height * 2; y += spacing) {
        for (let x = -canvas.width; x < canvas.width * 2; x += spacing) {
          ctx.fillText(text, x - canvas.width / 2, y - canvas.height / 2);
        }
      }
      ctx.restore();

      // Centre lock badge — bigger circle, heavier opacity, brand + URL underneath.
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const r = Math.min(canvas.width, canvas.height) * 0.18;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fill();
      ctx.font = `bold ${r * 0.9}px -apple-system, sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🔒', cx, cy - r * 0.18);
      ctx.font = `900 ${r * 0.32}px -apple-system, sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.fillText('AGALAZ', cx, cy + r * 0.42);
      ctx.font = `${r * 0.2}px -apple-system, sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.fillText('agalaz.com', cx, cy + r * 0.7);

      // Bottom-bar CTA so the user clearly sees how to remove it.
      const barHeight = Math.max(canvas.height * 0.08, 60);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
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
