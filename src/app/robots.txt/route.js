// src/app/robots.txt/route.js

export async function GET() {
    const robots = `
  User-Agent: *
Allow: /
  
Sitemap: https://www.hochzeitsmodus.de/sitemap.xml
  `;
  
    return new Response(robots.trim(), {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
  