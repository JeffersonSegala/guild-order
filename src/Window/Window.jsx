import React from 'react';
import './style.css';

const Window = ({ children, title, id }) => {
 
  return (
    <div className="simpleWindow" id={id} >
      <span>{title}</span>
      {children}
    </div>
  )

}

export default Window