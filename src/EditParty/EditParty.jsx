import './style.css';
import { Box, Snackbar, TextField, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { query } from 'thin-backend';
import SendIcon from '@mui/icons-material/Send';
import { updateRecord } from 'thin-backend';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const EditParty = ({ party, user, open, handleClose }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [users, setUsers] = useState([]);
  const [sendUser, setSendUser] = useState({});
  const [sendValue, setSendValue] = useState('');

  useEffect(() => {
    query('users').whereNot('id', user?.id).orderByDesc('id').fetch().then(results => {
      setUsers(results)
      setSendUser(results[0])
    })
  }, [user?.id]);

  const handleChangeSendValue = (e) => {
    setSendValue(e.target.value)
  }
  
  const handleSelectUser = (e) => {
    setSendUser(users.find(u => u.id === e.target.value))
  }

  const handleSend = () => {
    if (!sendValue || sendValue < 0 || user.balance < sendValue) {
      return;
    }
    updateRecord('users', user.id, { balance: parseFloat(user.balance) - parseFloat(sendValue) });
    updateRecord('users', sendUser.id, { balance: parseFloat(sendUser.balance) + parseFloat(sendValue) });
    handleClose();
    setShowMessage(true);
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 210,
    maxWidth: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
    <Modal
      open={open}
      onClose={handleClose} >
      <Box sx={style}>
        <Typography variant="h6" component="h2" className='send-header-container'>
          <div>{}</div>
          <CloseOutlinedIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
        </Typography>
        <br/>
        <input value={party.name} />
        <TextField 
          type="number" 
          label="Valor" 
          variant="standard"
          defaultValue={party.name} 
          onChange={handleChangeSendValue} />
        <br/>
        <br/>
        <TextField
          select
          label="Usuário"
          SelectProps={{ native: true }}
          helperText="Selecione para quem deseja enviar"
          variant="standard" 
          onChange={handleSelectUser}
          >
          {users?.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </TextField>
        <br/>
        <br/>
        <span onClick={handleSend} className='send-button' >
          <SendIcon />Enviar
        </span> 
      </Box>
    </Modal>
    <Snackbar
      open={showMessage}
      autoHideDuration={3000}
      onClose={() => setShowMessage(false)}
      message="Enviado"
      action={<></>}
    />
    </>
  );
}

export default EditParty;
