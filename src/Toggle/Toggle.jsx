import React from 'react';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

const Toggle = ({ title, checked, onChange }) => {

  const StyledSwitch = styled(Switch)(() => ({
    width: 48,
    height: 24,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#949494',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('greenBp.gif')`,
          backgroundSize: '16px'
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: checked ? '#20822a' : '#20822a',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: checked ? '#2b2d31' : '#2b2d31',
      width: 20,
      height: 20,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('greyBp.gif')`,
        backgroundSize: '16px'
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: checked ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

  return (
    <StyledSwitch 
      checked={checked}
      onChange={onChange}
      title={title} />
  );

}

export default Toggle