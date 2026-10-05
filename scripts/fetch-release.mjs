import fs from 'node:fs/promises';
import path from 'node:path';

const repo = process.env.GITHUB_REPO || 'codebdbd/aitecommander';
const out = path.resolve('src/data/release.generated.json');
const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'aitecommander-site-build' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

function normalize(release) {
  const installer = release.assets.find(a => /^AiteCommander-Setup-.*\.exe$/i.test(a.name));
  const portable = release.assets.find(a => /portable/i.test(a.name));
  if (!installer) throw new Error(`Installer asset not found in ${release.tag_name}`);
  return {
    version: String(release.tag_name).replace(/^v/, ''),
    tag: release.tag_name,
    publishedAt: release.published_at,
    releaseUrl: release.html_url,
    installer: { available: true, name: installer.name, url: installer.browser_download_url, size: installer.size, sha256: installer.digest?.replace(/^sha256:/, '') ?? null },
    portable: portable ? { available: true, name: portable.name, url: portable.browser_download_url, size: portable.size } : { available: false, name: null, url: null, size: null }
  };
}

try {
  const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, { headers });
  if (!response.ok) throw new Error(`GitHub API ${response.status}: ${response.statusText}`);
  const data = normalize(await response.json());
  await fs.writeFile(out, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`Release data updated: ${data.tag}`);
} catch (error) {
  if (process.env.CI) throw error;
  console.warn(`Release fetch failed; keeping checked-in snapshot. ${error.message}`);
}
