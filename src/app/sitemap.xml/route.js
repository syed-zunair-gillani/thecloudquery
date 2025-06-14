// src/app/sitemap.xml/route.js
import { parseStringPromise } from 'xml2js';

export async function GET() {
  const sitemapIndexUrl = 'https://staging.thecloudquery.com/sitemap_index.xml';
  const frontendBaseUrl = 'https://hochzeitsmodus.de';

  const indexRes = await fetch(sitemapIndexUrl);
  const indexXml = await indexRes.text();
  const indexJson = await parseStringPromise(indexXml);

  const sitemapUrls = indexJson.sitemapindex.sitemap.map((s) => s.loc[0]);

  let urls = [];

  for (const sitemapUrl of sitemapUrls) {
    const subRes = await fetch(sitemapUrl);
    const subXml = await subRes.text();
    const subJson = await parseStringPromise(subXml);

    const subUrls = subJson.urlset.url.map((entry) => {
      const originalUrl = entry.loc[0];
      const path = new URL(originalUrl).pathname;

      return {
        loc: `${frontendBaseUrl}${path}`,
        lastmod: entry.lastmod ? entry.lastmod[0] : null,
      };
    });

    urls = urls.concat(subUrls);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
    <url>
      <loc>${url.loc}</loc>
      ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
        <priority>0.8</priority>

    </url>`
    )
    .join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
