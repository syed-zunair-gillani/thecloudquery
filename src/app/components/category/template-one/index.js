import React from 'react';
import styles from './template-one.module.scss';
import TemplateOneCard from '../../../atoms/card/template-one';
import TemplateThreeCard from '../../../atoms/card/template-three';

const Category = ({ title, featured, listPosts }) => {

    //TODO: category and time should be fetched from api

    return (
        <>
            {title && <h2 className={styles.title}>{title}</h2>}
            <div className={styles.module}>

                <TemplateThreeCard image={featured.CoverImg} title={featured.Title} intro={featured.Intro} link={featured.slug} category={"Category"} time={"16"} />

                <div className={styles.listPosts}>
                    {listPosts && listPosts.length > 0 && listPosts.map((item, index) => (
                        <TemplateOneCard
                            key={index}
                            image={item.CoverImg}
                            title={item.Title}
                            intro={item.Intro}
                            link={item.slug}
                            category={item.categories}  
                            time={item.time}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Category;