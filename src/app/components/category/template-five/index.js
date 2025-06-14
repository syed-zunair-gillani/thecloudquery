import React from "react";
import styles from "./template-five.module.scss";
import TemplateFourCard from "../../../atoms/card/template-four";
import Link from "next/link";

const Category = ({ title, featured, listPosts }) => {
  //TODO: category and time should be fetched from api

  return (
    <>
      <h2>{title}</h2>
      <div className={styles.module}>
        <TemplateFourCard
          image={featured.CoverImg}
          title={featured.Title}
          link={featured.slug}
          category={item.categories}
          time={item.time}
        />

        <ul className={styles.listPosts}>
          {listPosts.map((post) => (
            <li key={post.id} className={styles.postCard}>
              <Link href={post.slug}>
                <h4>{post.Title}</h4>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Category;
