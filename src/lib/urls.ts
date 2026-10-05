import type { Locale } from '@/i18n/config';

export function localePath(locale: Locale, path = '') {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return `/${locale}/${clean ? `${clean}/` : ''}`;
}
