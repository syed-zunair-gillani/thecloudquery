// utils/parseHeroBlock.js

export function parseFeaturedBlock(renderedContent) {
    let hasHero = false;
    let heroTextContent = null;
    let cardThreeFData = null;
  
    if (renderedContent.includes("hero-featured-block")) {
      hasHero = true;
  
      // Extract hero tagline, title, intro
      const heroMatch = renderedContent.match(
        /<div class="hero-featured-block"[^>]*>[\s\S]*?<div[^>]+class="hero-tagline"[^>]*>(.*?)<\/div>[\s\S]*?<h2[^>]+class="hero-title"[^>]*>(.*?)<\/h2>[\s\S]*?<p[^>]+class="hero-intro"[^>]*>(.*?)<\/p>/
      );
  
      if (heroMatch) {
        heroTextContent = {
          tagline: heroMatch[1].trim(),
          title: heroMatch[2].trim(),
          intro: heroMatch[3].trim(),
        };
      }
  
      // Extract card-three-f block data
      const parser = new DOMParser();
      const doc = parser.parseFromString(renderedContent, "text/html");
      const featuredCard = doc.querySelector(".card-three-f");
  
      if (featuredCard) {
        const img = featuredCard.querySelector("img")?.getAttribute("src") || "";
        const title = featuredCard.querySelector("h2")?.textContent?.trim() || "";
        const intro = featuredCard.querySelector(".post-card-intro")?.innerText?.trim() || "";
        const time = featuredCard.querySelector(".cardFooter-f")?.textContent?.trim() || "";
        const slug = featuredCard.querySelector("a")?.getAttribute("href") || "";
  
        cardThreeFData = {
          CoverImg: img,
          Title: title,
          Intro: intro,
          time: time,
          slug: slug,
        };
      }
    }
  
    return { hasHero, heroTextContent, cardThreeFData };
  }
  