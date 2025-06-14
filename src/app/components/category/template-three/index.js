import React from 'react';
import TemplateThreeCard from '../../../atoms/card/template-three';

import styles from './template-three.module.scss';


const Category = ({title, listPost}) => {
//TODO: category and time should be fetched from api
    return (
        <>
        {title && <h2 className={styles.title}>{title}</h2>}
         <div className={styles.module}>
        
      
         {listPost && listPost.length > 0 && listPost.map((item, index) => (
            <TemplateThreeCard
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
    </>
    );
};

export default Category;