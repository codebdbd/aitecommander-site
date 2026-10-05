export const prerender = true;

export function GET({ site }: { site?: URL }) {
  const origin = site ?? new URL('http://localhost:4321');
  const isProduction = import.meta.env.DEPLOY_ENV === 'production';

  const body = isProduction
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', origin).href}\n`
    : 'User-agent: *\nDisallow: /\n';

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}
