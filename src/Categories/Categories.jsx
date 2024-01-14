import React from 'react';
import './style.css';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const Categories = ({ categories, selectedCategory, handleSelectCatagory }) => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
      <ToggleButtonGroup 
        className="categories-buttons"
        value={selectedCategory}
        exclusive
        orientation={width < 800 ? 'vertical' : 'horizontal'}
        color="success"
        onChange={handleSelectCatagory}
        size="small"
        aria-label="categorias" >
        {categories?.map(category => 
          <ToggleButton key={category} value={category} aria-label="left aligned">
            {category}
          </ToggleButton>  
        )}
      </ToggleButtonGroup>
  );

}

export default Categories