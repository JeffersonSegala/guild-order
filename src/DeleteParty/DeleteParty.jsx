import './style.css';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import React from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import axios from 'axios';
import Constants from '../Constants';

const DeleteParty = ({ party, open, handleClose }) => {

  const handleDelete = () => {
    axios.delete(Constants.API_URL + '/party/' + party.id)
        .then(response => {
          console.log(response)
          handleClose(true);
        });  
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    maxWidth: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: "url('../background.png')"
  };
  
  return (
    <Modal open={open} onClose={handleClose} >
       
      <Box sx={style}>
      
        <div className='send-header-container'>
          <div>&nbsp;</div>
          <div>
            <CloseOutlinedIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </div>
        </div>
        <br/>
        <div className='flexRow' >
          Confirma exclusão da PT?
        </div>      
        <br/>

        <div className='deleteParty__buttons'>
          <button onClick={handleClose} ><img src={'runeUH.gif'} className="deleteParty__icon" alt="voc" />Cancelar</button> 
          <button onClick={handleDelete} ><img src={'runeSD.gif'} className="deleteParty__icon" alt="voc" />Excluir</button> 
        </div>
      </Box>
    </Modal>
  );
}

export default DeleteParty;
