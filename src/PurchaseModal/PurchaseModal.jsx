import './style.css';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const PurchaseModal = ({ open, handleClose, handleBuy, feature }) => {
  const [reason, setReason] = useState('');

  const handleBuyButton = () => {
    handleBuy(reason)
    setReason('')
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    maxWidth: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose} >
      <Box sx={style}>
        <div>
          <Typography variant="h6" component="h2" className='purchase-header-container' >
            <div>{feature.title}</div>
            <CloseOutlinedIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </div>
        <br/>
        <div>
          <TextField 
            type="number" 
            label="Valor do investimento" 
            variant="standard"
            value={feature.price} 
            disabled={true}
            className='purchase-value'
            helperText={'O valor do investimento é o valor total da Feature'}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            key='featureBuyValue' />
        </div>
        <br/>
        <div>
          <TextField 
            type="text" 
            label="Motivo da escolha" 
            variant="standard"
            value={reason} 
            className='purchase-value'
            helperText={'Opcional'}
            onChange={(e) => setReason(e.target.value)}
            key='reason' />
        </div>
        <br/>
        <div className='purchase-button-container'>
          <div onClick={handleBuyButton} className='purchase-button' >
            <CheckOutlinedIcon />{'Comprar'}
          </div> 
        </div>
      </Box>
    </Modal>
  );
}

export default PurchaseModal;
