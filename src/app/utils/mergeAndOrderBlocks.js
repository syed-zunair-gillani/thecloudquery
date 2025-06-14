import * as cheerio from "cheerio";

const optimizeCloudinaryUrl = (url) => {
  if (!url || !url.includes("res.cloudinary.com")) return url;
  return url.replace("/upload/", "/upload/f_auto,q_auto/");
};

const getSlug = (url) => {
  if (!url || url === "#") return "";
  try {
    const path = new URL(url, "http://localhost").pathname;
    return path.replace(/\/$/, "").split("/").filter(Boolean).pop();
  } catch {
    return url.split("/").filter(Boolean).pop();
  }
};

export function mergeAndOrderBlocks(html, templates) {
  const $ = cheerio.load(html);
  const ordered = [];
  let firstImageHandled = false;
  let accumulatedHtml = "";

  function flushHtml() {
    if (accumulatedHtml.trim()) {
      ordered.push({
        type: "html",
        data: { content: accumulatedHtml },
      });
      accumulatedHtml = "";
    }
  }

  $("body").children().each((_, el) => {
    const $el = $(el);

    // ✅ Standalone <iframe> (e.g., YouTube or Vimeo)
    if ($el.is("iframe")) {
      flushHtml();
      ordered.push({
        type: "video",
        data: {
          videoSrc: $el.attr("src"),
          videoType: "iframe",
        },
      });
      return;
    }

    // ✅ Hero Featured Block
    if ($el.hasClass("hero-featured-block")) {
      flushHtml();

      const heroTextContent = {
        tagline: $el.find(".hero-tagline").text().trim(),
        title: $el.find(".hero-title").text().trim(),
        intro: $el.find(".hero-intro").text().trim(),
      };

      const cardThreeFData = {
        CoverImg: optimizeCloudinaryUrl($el.find(".card-three-f img").attr("src")),
        Title: $el.find(".card-three-f h2").text().trim(),
        Intro: $el.find(".card-three-f .post-card-intro").text().trim(),
        time: $el.find(".card-three-f .cardFooter-f").text().trim(),
        slug: getSlug($el.find(".card-three-f a").attr("href")),
      };

      ordered.push({
        type: "featured",
        data: { heroTextContent, cardThreeFData },
      });
      return;
    }

    // ✅ Match dynamic blocks from templates
    const matchedIndex = templates.findIndex((t) => {
      if (!t.__component) return false;
      const componentName = t.__component.split(".")[1];
      return componentName && $el.hasClass(componentName);
    });

    if (matchedIndex !== -1) {
      flushHtml();

      const matchedTemplate = templates[matchedIndex];
      templates.splice(matchedIndex, 1);

      ordered.push({
        type: "category",
        data: matchedTemplate,
      });
      return;
    }

    // ✅ Hero Block
    if ($el.hasClass("hero")) {
      flushHtml();

      const rawContent = $el.find(".herotxt div").html()?.trim() || "";
      const content = rawContent
        ? rawContent.split(/<br\s*\/?>/).map((line) => `<p>${line.trim()}</p>`).join("")
        : "";
      const buttonLink = getSlug($el.find(".heroBtn").attr("href"));
      const buttonText = $el.find(".heroBtn").text().trim();

      ordered.push({
        type: "hero",
        data: {
          title: $el.find(".herotxt h1").text().trim(),
          content,
          buttonLink,
          buttonText,
        },
      });
      return;
    }

    // ✅ Image + Text Blocks
    if ($el.hasClass("textImageContainer")) {
      flushHtml();

      const blockClassName = $el.hasClass("reverse") ? "reverse" : "";

      const title = $el.find(".textContainer h2").text().trim();
      const text = $el.find(".textContainer p").toArray().map(p => $(p).text().trim()).join("\n");
      const imageSrc = optimizeCloudinaryUrl($el.find(".imageContainer img").attr("src"));
      const imageAlt = $el.find(".imageContainer img").attr("alt") || "Image";

      ordered.push({
        type: "imageText",
        data: {
          blockClassName,
          title,
          text,
          imageSrc,
          imageAlt,
        },
      });
      return;
    }

    // ✅ Table of contents (ul.toc)
    if ($el.hasClass("toc") && $el.is("ul")) {
      flushHtml();

      const headers = [];
      $el.find("li a[href^='#']").each((_, a) => {
        const $a = $(a);
        const href = $a.attr("href");
        const text = $a.text().trim();
        if (href && text) {
          headers.push({ id: href.slice(1), text });
        }
      });

      if (headers.length > 0) {
        ordered.push({
          type: "toc",
          data: { headers },
        });
      }
      return;
    }

    // ✅ Media blocks inside <figure> (image, video, iframe)
    if ($el.is("figure")) {
      flushHtml();

      const $img = $el.find("img");
      const $video = $el.find("video");
      const $iframe = $el.find("iframe");

      if ($img.length > 0) {
        const className = !firstImageHandled ? "coverImg" : "";
        firstImageHandled = true;

        ordered.push({
          type: "image",
          data: {
            imageSrc: optimizeCloudinaryUrl($img.attr("src")),
            imageAlt: $img.attr("alt"),
            className,
          },
        });
        return;
      }

      if ($video.length > 0) {
        ordered.push({
          type: "video",
          data: {
            videoSrc: $video.attr("src"),
            videoType: "video",
          },
        });
        return;
      }

      // ✅ Handle iframe video (YouTube embeds)
      if ($iframe.length > 0) {
        ordered.push({
          type: "video",
          data: {
            videoSrc: $iframe.attr("src"),
            videoType: "iframe",
          },
        });
        return;
      }
    }

    // ✅ Default: Generic HTML block (strip WP classes)
    const allowedClasses = ["has-text-align-center"];

    const cleanedHtml = $.html(el, { decodeEntities: false }).replace(/class="([^"]+)"/g, (match, classList) => {
      const filtered = classList
        .split(/\s+/)
        .filter(cls => !cls.startsWith("wp-") || allowedClasses.includes(cls))
        .join(" ");
      return filtered ? `class="${filtered}"` : "";
    });

    accumulatedHtml += cleanedHtml;
  });

  flushHtml();

  return ordered;
}
