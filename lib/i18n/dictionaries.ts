import { es } from './es';
import { en } from './en';

export type Dictionary = typeof es;
export type Locale = 'es' | 'en';

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries.es;
}
