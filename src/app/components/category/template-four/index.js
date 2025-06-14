import React from 'react';
import TemplateFourCard from '../../../atoms/card/template-four';

import styles from './template-four.module.scss';


const Category = ({title, listPosts}) => {
//TODO: category and time should be fetched from api
console.log("listPosts", listPosts);
    return (
        <>
        {title && <h1>{title}</h1>}
        <div className={styles.module}>
        
            {listPosts && listPosts.length > 0 && listPosts.map((item, index) => (
                
                <TemplateFourCard
                key={index}
                image={item.CoverImg}
                title={item.Title}
                link={item.slug}
                category={item.categories}
                time={item.time}
                />
            ))} 
       
        </div>
    </>
    );
};

export default Category;