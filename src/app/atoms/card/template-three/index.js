import React from "react";
import styles from "./template-three-card.module.scss";
import Image from "next/image";
import Link from "next/link";

const TemplateThreeCard = ({ image, title, intro, link, category, time, priority }) => {
  return (
    <div className={styles.card} style={{
      flex: 1
    }}>
      <Link href={link} className={styles.contentTxt}>
        <Image
          src={image}
          alt={title}
          width={500}
          height={300}
          priority // Ensures LCP image loads early
          placeholder="blur" // Optional: Use blur-up for better UX
          blurDataURL="/placeholder.jpg" // Replace with actual low-quality image placeholder
          sizes="(max-width: 768px) 100vw, 500px" // Responsive loading
          style={{ width: '100%', height: 'auto' }} // Prevent layout shift
        />

        <h2 className="post-card-title">{title}</h2>
        {intro && <p className="post-card-intro">{intro}</p>}
      </Link>
      <div className={styles.cardFooter}>
        <span>{time} Min Lesezeit | </span>
        {category && <span className={styles.category}>{category}</span>}
      </div>
    </div>
  );
};

export default TemplateThreeCard;
