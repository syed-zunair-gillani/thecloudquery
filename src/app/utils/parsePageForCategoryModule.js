import { JSDOM } from "jsdom";

export const parsePageForTemplates = (page, templateBlockClass, cardTypes) => {
  console.log("parsePageForTemplates called");

  const html = page.content?.rendered || "";
  console.log("HTML length:", html.length);

  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const blocks = doc.querySelectorAll(`.${templateBlockClass}`);
  console.log(`Found ${blocks.length} blocks for class: ${templateBlockClass}`);
  
  if (!blocks.length) return [];

  const getSlug = (url) => {
    if (!url || url === "#") return "";
    try {
      const path = new URL(url, "http://localhost").pathname;
      return path.replace(/\/$/, "").split("/").filter(Boolean).pop();
    } catch {
      return url.split("/").filter(Boolean).pop();
    }
  };

  const optimizeCloudinaryUrl = (url) => {
    if (!url || !url.includes("res.cloudinary.com")) return url;
    return url.replace("/upload/", "/upload/f_auto,q_auto/");
  };

  const extractFeaturedData = (featuredCard) => {
    const featuredImg = optimizeCloudinaryUrl(
      featuredCard?.querySelector("img")?.getAttribute("src") || ""
    );
    const featuredTitle = featuredCard?.querySelector("h2")?.textContent?.trim() || "";
    const featuredIntro =
      featuredCard?.querySelector(".post-card-intro")?.textContent?.trim() || "";
    const featuredLink = (() => {
      const anchor = featuredCard?.querySelector("a[href]");
      if (anchor) return anchor.getAttribute("href");
      const possibleHref = [...featuredCard?.querySelectorAll("[class*='cardText'] a") || []]
        .map((a) => a.getAttribute("href"))
        .find(Boolean);
      return possibleHref || "";
    })();

    return {
      CoverImg: featuredImg,
      Title: featuredTitle,
      Intro: featuredIntro,
      slug: getSlug(featuredLink),
    };
  };

  return Array.from(blocks).map((templateBlock, blockIndex) => {
    const title = templateBlock.querySelector(".block-title")?.textContent?.trim() || "";
    const featuredCard = templateBlock.querySelector(".card-three");
    const featured = featuredCard ? extractFeaturedData(featuredCard) : null;

    const listCards = templateBlock.querySelectorAll(
      `.listPosts ${cardTypes.map((type) => `.${type}`).join(", ")}`
    );

    const listPosts = [];
    listCards.forEach((card) => {
      if (templateBlockClass !== "template3-block" && card === featuredCard) return;

      const imgSrcRaw = card.querySelector("img")?.getAttribute("src") ||
                        card.querySelector("img")?.getAttribute("data-src") || "";

      const img = optimizeCloudinaryUrl(imgSrcRaw);
      const title = card.querySelector("h2")?.textContent?.trim() || "";
      const intro = card.querySelector(".cardText-l p")?.textContent?.trim() || "";
      const href = card.querySelector("a")?.getAttribute("href") || "";
      const dataId = card.getAttribute("data-id") || "";
      const type = cardTypes.find((t) => card.classList.contains(t)) || "";

      listPosts.push({
        CoverImg: img,
        Title: title,
        Intro: intro,
        slug: getSlug(href),
        categories: ["Category"],
        time: "5",
        type,
        dataId,
      });
    });

    return {
      __component: `category-modules.${templateBlockClass}`,
      Title: title,
      Featured: featured,
      ListPost: listPosts,
    };
  });
};
