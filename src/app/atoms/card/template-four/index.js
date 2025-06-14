import React from "react";
import styles from "./template-four-card.module.scss";
import Image from "next/image";
import Link from "next/link";
import ConditionalLazyImage from "../../conditional-image/ConditionalLazyImage";

const TemplateThreeCard = ({ image, title, intro, link, category, time }) => {
  return (
    <div className={styles.card}>
      <Link href={link}>
        <div  className={styles.cardImage}>
          <ConditionalLazyImage
            src={image}
            alt={title}
            width={600}
            height={600}
          />
        </div>
       
        <h2 className="post-card-title">{title}</h2>
      </Link>
      <div className={styles.cardFooter}>
        <span>{time} Min Lesezeit | </span>
        <span>{category}</span>
      </div>
    </div>
  );
};

export default TemplateThreeCard;
