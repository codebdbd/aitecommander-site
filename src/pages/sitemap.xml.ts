const routes = [
  '/ru/',
  '/ru/features/',
  '/ru/use-cases/',
  '/ru/download/',
  '/ru/docs/',
  '/ru/docs/getting-started/',
  '/ru/docs/structure/',
  '/ru/docs/resources/',
  '/ru/docs/search/',
  '/ru/docs/quick-look/',
  '/ru/docs/share/',
  '/ru/docs/backup/',
  '/ru/docs/hotkeys/',
  '/ru/docs/troubleshooting/',
  '/ru/changelog/',
  '/ru/faq/',
  '/ru/license/'
];

export const prerender = true;

export function GET({ site }: { site?: URL }) {
  const origin = site ?? new URL('http://localhost:4321');
  const urls = routes
    .map((route) => `  <url><loc>${new URL(route, origin).href}</loc></url>`)
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
}
