import React from 'react';
import './style.css';
import Feature from './Feature';
import Categories from '../Categories/Categories';

const Features = ({ features, handleOpenPurchase, categories, selectedCategory, handleSelectCatagory  }) => {
  return (
    <>
      <Categories categories={categories} 
          selectedCategory={selectedCategory} 
          handleSelectCatagory={handleSelectCatagory} />
      <div className="feature-container">
        {features?.map((feature, index) => {
          return <Feature 
          feature={feature} 
          handleOpenPurchase={handleOpenPurchase} 
          key={index} />
        })}
      </div>
    </>
  );
}

export default Features