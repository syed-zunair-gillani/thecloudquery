// utils/generateTOC.js
import cheerio from "cheerio";

export const generateTOC = (htmlContent) => {
  const headers = [];
  const $ = cheerio.load(htmlContent);

  $("li.toc").each((_, el) => {
    const anchor = $(el).find("a");

    if (anchor.length) {
      const href = anchor.attr("href");
      const text = anchor.text();

      if (href && text) {
        const id = href.replace("#", "");
        headers.push({ id, text });
      }
    }
  });

  return { headers };
};
