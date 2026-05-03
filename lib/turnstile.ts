// Cloudflare Turnstile token verification.
// Set TURNSTILE_SECRET_KEY in env to enforce. If missing, verification is
// skipped (returns true) — useful for local dev. In production you MUST set it.

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function verifyTurnstileToken(
  token: string | undefined | null,
  remoteIp?: string | null,
): Promise<{ ok: boolean; reason?: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    // Fail-open in dev so the flow keeps working before keys are configured.
    if (process.env.VERCEL_ENV === 'production') {
      console.warn('[turnstile] TURNSTILE_SECRET_KEY missing in production — captcha NOT enforced');
    }
    return { ok: true };
  }

  if (!token) {
    return { ok: false, reason: 'Captcha token missing' };
  }

  try {
    const body = new URLSearchParams();
    body.set('secret', secret);
    body.set('response', token);
    if (remoteIp) body.set('remoteip', remoteIp);

    const res = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return { ok: false, reason: `Verify HTTP ${res.status}` };
    const data = await res.json();
    if (data.success) return { ok: true };
    return { ok: false, reason: `Captcha rejected: ${(data['error-codes'] || []).join(',') || 'unknown'}` };
  } catch (err: any) {
    return { ok: false, reason: err?.message?.substring(0, 120) || 'verify failed' };
  }
}

export function turnstileSiteKey(): string {
  // Public site key — safe to expose.
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';
}
