import * as cheerio from "cheerio";

export function parseBlocks(htmlContent) {
  const $ = cheerio.load(htmlContent);
  const blocks = [];

  // Iterate through all top-level elements in the content
  $("body").children().each((index, element) => {
    const el = $(element);

    // Check for Hero block
    if (el.hasClass("wp-block-customblocks-textheroblock")) {
      const rawContent = el.find(".herotxt div").html()?.trim() || "";
      const content = rawContent
        ? rawContent.split(/<br\s*\/?>/).map((line) => `<p>${line.trim()}</p>`).join("")
        : "";

      const heroData = {
        type: "hero",
        title: el.find(".herotxt h1").text().trim(),
        content, // Processed content with <p> tags
      };
      blocks.push(heroData);
    }
    // Check for ImageText block
    else if (el.hasClass("wp-block-customblocks-textimageblock") || el.hasClass("wp-block-customblocks-imagetextblock")) {
      const blockClassName = el.hasClass("wp-block-customblocks-textimageblock") ? "default" : "reverse";
      const title = el.find(".textContainer h2").text().trim();
      const rawText = el.find(".textContainer > div").html();
      const text = rawText
        ? rawText.split(/<br\s*\/?>/).map((line) => line.trim()).filter((line) => line.length > 0)
        : [];
      const image = el.find("img");
      const imageSrc = image.attr("src");
      const imageAlt = image.attr("alt");

      blocks.push({
        type: "imageText",
        blockClassName,
        title,
        text,
        imageSrc,
        imageAlt,
      });
    }
    // Otherwise, treat it as raw HTML
    else {
      blocks.push({
        type: "html",
        content: el.toString(),
      });
    }
  });

  return blocks;
}