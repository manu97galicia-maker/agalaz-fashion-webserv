/**
 * Helpers for normalising the inputs that anti-abuse checks key on.
 *
 *   `myshop.com` / `MyShop.com` / `https://www.myshop.com/` / `myshop.com/products/x`
 * all collapse to `myshop.com`, so a customer can't sneak past the
 * "one trial per store" gate by varying capitalisation, scheme, or path.
 *
 * Email normalisation collapses Gmail aliases (`+abc`, dots) to a canonical
 * form so `user+test@gmail.com`, `u.s.e.r@gmail.com`, `USER@gmail.com` all
 * resolve to the same identity. Other providers only get `+alias` stripped.
 */

export function normalizeStoreDomain(input: string | null | undefined): string {
  if (!input) return '';
  try {
    const url = new URL(input.startsWith('http') ? input : `https://${input}`);
    return url.hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    return (input || '')
      .toLowerCase()
      .trim()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/.*$/, '');
  }
}

export function normalizeEmail(email: string | null | undefined): string {
  if (!email) return '';
  const e = email.toLowerCase().trim();
  const [local, domain] = e.split('@');
  if (!domain) return e;
  // Gmail / Googlemail: dots in local part are ignored, +alias is ignored.
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    return `${local.replace(/\./g, '').split('+')[0]}@gmail.com`;
  }
  // Other providers: strip +alias only.
  return `${local.split('+')[0]}@${domain}`;
}
