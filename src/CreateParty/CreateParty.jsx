import './style.css';
import { Box, Snackbar } from '@mui/material';
import Modal from '@mui/material/Modal';
import React, { useState } from 'react';
import { createRecord } from 'thin-backend';
import { updateRecord } from 'thin-backend';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const DeleteParty = ({ party, open, handleClose, userKey }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [name, setName] = useState(party.name || '');
  const [size, setSize] = useState(party.size || '');
  const [qtEk, setQtEk] = useState(party.qtEk || '');
  const [qtEd, setQtEd] = useState(party.qtEd || '');
  const [qtSt, setQtSt] = useState(party.qtSt || '');

  const handleSave = () => {
    if (party.id) {
      update()
    } else {
      create()
    }

    handleClose();
    setShowMessage(true);
  }

  const create = () => {
    if (!name) return;

    createRecord('party', { 
      name: name.trim(''), 
      size: size === '' ? null : size, 
      qtEk: qtEk === '' ? null : qtEk, 
      qtEd: qtEd === '' ? null : qtEd, 
      qtSt: qtSt === '' ? null : qtSt,
      userkey: userKey 
    });
    setName('')
    setSize('')
    setQtEk('')
    setQtEd('')
    setQtSt('')
  }

  const update = () => {
    if (!name) return;

    updateRecord('party', party.id, {
      name: name.trim(''), 
      size: size === '' ? null : size, 
      qtEk: qtEk === '' ? null : qtEk, 
      qtEd: qtEd === '' ? null : qtEd, 
      qtSt: qtSt === '' ? null : qtSt, 
    })
  }

  const disableGeneric = () => {
    return qtEk > 0 || qtEd  > 0 || qtSt > 0
  }

  const disableSpecific = () => {
    return size > 0
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
    <>
    <Modal open={open} onClose={handleClose} >
       
      <Box sx={style}>
      
        <div className='send-header-container'>
          <div>&nbsp;</div>
          <div>
            <CloseOutlinedIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </div>
        </div>
        <br/>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder='Descrição da PT ( adicione horário e informações relevantes )' />
        <br/>
        <div className='flexRow' >
          <img src={'Elite Knight.png'} className="vocationImage vocIcon" alt="voc" style={{marginLeft: '26px'}} /> 
          <input value={qtEk} type="number" onChange={(e) => setQtEk(e.target.value)} disabled={disableSpecific()} placeholder='EKs' />
        </div>
        <div className='flexRow' >
          <img src={'Elder Druid.png'} className="vocationImage vocIcon" alt="voc" style={{marginLeft: '26px'}} /> 
          <input value={qtEd} type="number" onChange={(e) => setQtEd(e.target.value)} disabled={disableSpecific()} placeholder='EDs'  />
        </div>
        <div className='flexRow' >
          <img src={'Royal Paladin.png'} className="vocationImage vocIcon" alt="voc" /> 
          <img src={'Master Sorcerer.png'} className="vocationImage vocIcon" alt="voc" /> 
          <input value={qtSt} type="number" onChange={(e) => setQtSt(e.target.value)} disabled={disableSpecific()}  placeholder='Shooters' />
        </div>
        <br/>
        <div className='flexRow' >
          <img src={'Undefined.png'} className="vocationImage vocIcon" alt="voc" style={{marginLeft: '26px'}} /> 
          <input value={size} type="number" onChange={(e) => setSize(e.target.value)} disabled={disableGeneric()} placeholder='Sem restrição' />
        </div>      
        <br/>

        <div className='flexColumn'>
          <button onClick={handleSave} ><img src={'runeUH.gif'} className="deleteParty__icon" alt="voc" />Salvar</button> 
        </div>
      </Box>
    </Modal>

    <Snackbar
      open={showMessage}
      autoHideDuration={3000}
      onClose={() => setShowMessage(false)}
      message="Sucesso"
      action={<></>}
    />
    </>
  );
}

export default DeleteParty;
