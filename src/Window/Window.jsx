import React, { useState } from 'react';
import './style.css';

const Window = ({ children, title, id, isOpen, onClose, onEdit }) => {
  const [open, setOpen] = useState(isOpen)
  
  return (
    <div className="window" id={id} >
      <div className='window__headers'>
        <div className='window__pointer' onClick={() => setOpen(open => !open)} >{title}</div>
        <div className='window__actions'>
          <img src={open ? 'minusIcon.png' : 'plusIcon.png'} className="window__header-icon" alt="" onClick={() => setOpen(open => !open)} /> 
          {onEdit && 
            <img src={'iconOptions.jpg'} className="window__header-icon" alt="" onClick={onEdit} /> 
          }
          {onClose && 
            <img src={'iconClose.jpg'} className="window__header-icon" alt="" onClick={onClose} /> 
          }
        </div>
      </div>
      {open && children}
    </div>
  )

}

export default Window