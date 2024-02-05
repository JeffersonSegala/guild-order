import React, { useState } from 'react';
import './style.css';

const Window = ({ children, title, id, isOpen }) => {
  const [open, setOpen] = useState(isOpen)
  
  return (
    <div className="simpleWindow" id={id} >
      <div className='windowHeaders' >
        <div>{title}</div>
        <img src={open ? 'minusIcon.png' : 'plusIcon.png'} className="headerIcon" alt="" onClick={() => setOpen(open => !open)} /> 
      </div>
      {open && children}
    </div>
  )

}

export default Window