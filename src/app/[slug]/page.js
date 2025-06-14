import React from "react";
import { fetchPageBySlug } from "../utils/wordpressApi";
import { parseAllTemplates } from "../utils/parseAllTemplates";
import { parseBlocks } from "../utils/componentParser";
import { mergeAndOrderBlocks } from "../utils/mergeAndOrderBlocks";
import ConditionalLazyImage from "../atoms/conditional-image/ConditionalLazyImage";
import Breadcrumbs from "../atoms/breadcrumbs";
import Category from "../components/category";
import Hero from "../components/hero";
import TOC from "../atoms/toc";
import ImageText from "../components/image-text";
import { fetchPostSEO } from "../utils/metadata";

import styles from "./page.module.scss";

export async function generateMetadata({ params }) {
  const seo = await fetchPostSEO(params.slug);

  if (!seo) {
    return {
      title: "Nicht gefunden",
      description: "Die angeforderte Seite konnte nicht gefunden werden.",
      robots: "noindex, nofollow",
    };
  }

  return {
    title: seo.title,
    description: seo.description,
    robots: seo.robots,
    alternates: {
      canonical: seo.canonical,
    },
    openGraph: {
      type: "article",
      title: seo.title,
      description: seo.description,
      url: seo.url,
      images: [
        {
          url: seo.image.url,
          width: seo.image.width,
          height: seo.image.height,
          alt: seo.image.alt,
        },
      ],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = params;

  try {
    const page = await fetchPageBySlug(slug);
    const seo = await fetchPostSEO(slug);

    if (!page) {
      return <h1>Page Not Found</h1>;
    }

    const html = page.content?.rendered || "";
    const parsedTemplates = parseAllTemplates(page);
    const customBlocks = parseBlocks(html);
    const blocks = mergeAndOrderBlocks(html, parsedTemplates);

    return (
      <>
        <div className={styles.page}>
          <Breadcrumbs title={page.title.rendered} />
          <h1 className={styles.pageTitle}>{page.title.rendered}</h1>

          {/* Hero block */}
          {blocks.map((block, index) =>
            block.type === "hero" ? (
              <Hero
                key={index}
                title={block.data.title}
                content={block.data.content}
                buttonLink={block.data.buttonLink}
                buttonText={block.data.buttonText}
              />
            ) : null
          )}

          <div className={styles.pageContent}>
            {blocks.map((block, index) => {
              if (block.type === "hero") return null;

              switch (block.type) {
                case "imageText":
                  return (
                    <ImageText
                      key={index}
                      blockClassName={block.data.blockClassName}
                      title={block.data.title}
                      text={block.data.text}
                      imageSrc={block.data.imageSrc}
                      imageAlt={block.data.imageAlt}
                    />
                  );
                case "toc":
                  return <TOC key={index} headers={block.data.headers} />;
                case "html":
                  return (
                    <section
                      key={index}
                      dangerouslySetInnerHTML={{ __html: block.data.content }}
                    />
                  );
                case "category":
                  return (
                    <div key={index} className={styles.moreSection}>
                      <Category moduleItem={block.data} />
                    </div>
                  );
                case "image":
                  return (
                    <div
                      key={index}
                      className={`${styles[block.data.className] || ""}`}
                    >
                      <ConditionalLazyImage
                        src={block.data.imageSrc}
                        alt={block.data.imageAlt}
                        className={block.data.className}
                        width={600}
                        height={400}
                      />
                    </div>
                  );
                case "video":
                  return (
                    <div key={index} className={styles.videoContainer}>
                      <iframe
                        width="100%"
                        height="450"
                        src={block.data.videoSrc}
                        title={block.data.videoTitle}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>

        {/* JSON-LD structured data */}
        {seo?.jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.jsonLd) }}
          />
        )}
      </>
    );
  } catch (error) {
    console.error("Error fetching page:", error);
    return <h1>Page Not Found</h1>;
  }
}
