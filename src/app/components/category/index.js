
import React from 'react';
import TemplateOne from './template-one';
import TemplateTwo from './template-two';
import TemplateThree from './template-three';
import TemplateFour from './template-four';
import TemplateFive from './template-five';
import TemplateSix from './template-six';

const Category = ({ moduleItem }) => {
  const { __component } = moduleItem;
  switch (__component) {
    case 'category-modules.template1-block':
        return <TemplateOne title={moduleItem.Title} featured={moduleItem.Featured} listPosts={moduleItem.ListPost} />;
    case 'category-modules.template2-block':
        return <TemplateTwo title={moduleItem.Title} featured={moduleItem.Featured} listPosts={moduleItem.ListPost} />;
    case 'category-modules.template3-block':
        return <TemplateThree title={moduleItem.Title} listPost={moduleItem.ListPost} />;
    case 'category-modules.template4-block':
        return <TemplateFour title={moduleItem.Title} listPosts={moduleItem.ListPost} />;
    case 'category-modules.template-five':
        return <TemplateFive title={moduleItem.Title} featured={moduleItem.Featured} listPosts={moduleItem.ListPost} />;
    case 'category-modules.template-six':
        return <TemplateSix title={moduleItem.Title} featured={moduleItem.Featured} />;
    default:
      return null;
  }
};

export default Category;