import React from 'react';
import styles from './template-one.module.scss';
import TemplateOneCard from '../../../atoms/card/template-one';
import TemplateThreeCard from '../../../atoms/card/template-three';

const Category = ({featured, listPosts}) => {
   
//TODO: category and time should be fetched from api

    return (
        <div className={styles.module}>
       Hello
   </div>
    );
};

export default Category;