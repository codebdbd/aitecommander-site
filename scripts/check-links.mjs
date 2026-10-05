import fs from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve('dist');

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

function targetFor(href) {
  const clean = href.split('#')[0].split('?')[0];
  if (!clean || clean === '/') return path.join(dist, 'index.html');

  const pathname = decodeURIComponent(clean).replace(/^\//, '');
  if (path.extname(pathname)) return path.join(dist, pathname);
  return path.join(dist, pathname, 'index.html');
}

const htmlFiles = (await walk(dist)).filter((file) => file.endsWith('.html'));
const missing = [];

for (const file of htmlFiles) {
  const html = await fs.readFile(file, 'utf8');
  const links = [...html.matchAll(/href=["']([^"']+)["']/g)].map((match) => match[1]);

  for (const href of links) {
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const target = targetFor(href);
    try {
      await fs.access(target);
    } catch {
      missing.push({
        page: path.relative(dist, file),
        href,
        target: path.relative(dist, target)
      });
    }
  }
}

if (missing.length) {
  console.error('Broken internal links found:');
  for (const item of missing) console.error(`- ${item.page}: ${item.href} -> ${item.target}`);
  process.exit(1);
}

console.log(`Internal links OK: ${htmlFiles.length} HTML files checked.`);
