// src/lib/metadata.js
export async function fetchPostSEO(slug) {
    // Fetch the post by slug from WP REST API
    const res = await fetch(`https://staging.thecloudquery.com/wp-json/wp/v2/posts?slug=${slug}`);
    const posts = await res.json();
    if (!posts.length) {
      return null;
    }
    const post = posts[0];
  
    // Rank Math or Yoast SEO data is often in _yoast or rank_math key, check your API output
    // Example assumes Rank Math exposes `rank_math` object with SEO metadata
    const seo = post.rank_math || post.yoast_head_json || {};
  
    return {
      title: seo.title || post.title.rendered,
      description: seo.description || post.excerpt.rendered.replace(/<[^>]+>/g, ''),
      robots: seo.robots || 'index, follow',
      canonical: seo.canonical || post.link,
      url: post.link,
      image: {
        url: seo.social_image || post.featured_media_src_url || 'https://www.hochzeitsmodus.de/default-image.jpg',
        width: 1200,
        height: 630,
        alt: seo.social_image_alt || post.title.rendered,
      },
      jsonLd: seo.schema || null, // Add this line
    };
  }
  