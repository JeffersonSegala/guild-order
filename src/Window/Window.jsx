import React from 'react';
import './style.css';

const Window = ({ children, title }) => {
 
  return (
    <div className="simpleWindow" >
      <span>{title}</span>
      {children}
    </div>
  )

}

export default Window