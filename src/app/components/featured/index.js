import React from "react";
import styles from "./featured.module.scss";
import { FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import CardThree from '../../atoms/card/template-three';

const Hero = ({ data }) => {
  return (
    <div className={styles.featuredHero}>
      <div className={styles.featuredHerotxt}>
        <p className={styles.tag}>
          {data?.tagline || "Willkommen bei Hochzeitsmodus"}
        </p>
        <h1>{data?.title || "Der neue Hochzeitsblog für euren großen Tag"}</h1>
        <p>{data?.intro || "Holt euch Ideen und Inspiration für eure Hochzeit."}</p>

        <Link className={styles.btn} href="/kontakt">
          <FaEnvelope />
          Kontaktiere uns
        </Link>
      </div>

      <div className={styles.featuredHeroPost}>
        {data?.post && (
          <CardThree
            title={data?.post?.nodes[0]?.title}
            intro={data?.post?.nodes[0]?.postMeta?.shortInfo}
            link={data?.post?.nodes[0]?.uri}
            image={data?.post?.nodes[0]?.featuredImage?.node?.mediaItemUrl}
            category={data?.post?.nodes[0]?.postMeta?.category}
            time={data?.post?.nodes[0]?.postMeta?.time}
            priority={true}
          />
        )}
      </div>
    </div>
  );
};

export default Hero;
