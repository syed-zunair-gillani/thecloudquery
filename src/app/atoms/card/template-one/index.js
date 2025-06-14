import React from "react";
import styles from "./template-one-card.module.scss";
import Image from "next/image";
import Link from "next/link";
import ConditionalLazyImage from "../../conditional-image/ConditionalLazyImage";

const TemplateOneCard = ({ image, title, intro, link, category, time }) => {
  return (
    <div className={styles.card}>
      <Link href={link} className={styles.cardImage}>
        <div style={{ objectFit: "cover" }} className={styles.cardImageImg}>
          <ConditionalLazyImage
            src={image}
            alt={title}
            width={160}
            height={120}
          />
        </div>
    
      </Link>
      <div className={styles.cardContent}>
        <Link href={link} className={styles.cardText}>
          <h2>{title}</h2>
          <p>{intro}</p>
        </Link>
        <div className={styles.cardFooter}>
          <span>{time} Min Lesezeit</span> |<span>{category}</span>
        </div>
      </div>
    </div>
  );
};

export default TemplateOneCard;
