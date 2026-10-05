import fs from 'node:fs/promises';
const required = ['ru'];
for (const locale of required) {
  await fs.access(new URL(`../src/i18n/${locale}.ts`, import.meta.url));
}
console.log(`Translation scaffold OK: ${required.join(', ')}`);
