import React, { useState, useEffect } from 'react';
import './style.css';

const Window = ({ children, title, id, isOpen, onClose, onEdit, hint, onOpen, onCopy }) => {
  const [open, setOpen] = useState(isOpen)
  
  useEffect(() => {
    if (open && onOpen) {
      onOpen();
    }
  }, [open]);

  return (
    <div className="window" id={id} >
      <div className='window__headers'>
        <div className='window__pointer' onClick={() => setOpen(open => !open)} title={hint} >
          <img src={open ? 'minusIcon.png' : 'plusIcon.png'} className="window__header-icon" alt="" /> 
          {title}
        </div>
        <div className='window__actions'>
          {onCopy && 
            <img src={'copyIcon.png'} className="window__header-icon" alt="" onClick={onCopy} title="Copiar" />
          }
          {onEdit && 
            <img src={'iconOptions.jpg'} className="window__header-icon" alt="" onClick={onEdit} title="Editar" /> 
          }
          {onClose && 
            <img src={'iconClose.jpg'} className="window__header-icon" alt="" onClick={onClose} title="Excluir" /> 
          }
        </div>
      </div>
      {open && children}
    </div>
  )

}

export default Window