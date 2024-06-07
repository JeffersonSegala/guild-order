import React, { useState, useEffect } from 'react';
import './style.css';
import Party from './Party';
import CreateParty from '../CreateParty/CreateParty';
import Constants from '../Constants';
import Toggle from '../Toggle/Toggle';

const Parties = ({ players, user }) => {
  const [openCreate, setOpenCreate] = useState(false);
  const [parties, setParties] = useState([]);
  const [scheduledParty, setScheduledParty] = useState(true);

  useEffect(() => {
    fetchParties();
  }, []);

  const fetchParties = () => {
    fetch(Constants.API_URL + '/parties')
      .then(response => response.json())
      .then(data => {
        setParties(data)
    });
  }

  const handleCloseCreateParty = () => {
    setOpenCreate(false);
    fetchParties();
  }

  return (
    <>

      <div className='flexCenter'>
        <div>{scheduledParty ? 'Eventos agendados' : 'Eventos em formação'}</div>
        <img src={scheduledParty ? 'theSupremeCube.gif' : 'theCube.gif'} alt='cube' />
        <Toggle 
          checked={scheduledParty}
          onChange={() => setScheduledParty(scheduledParty => !scheduledParty)}
          title={'Eventos agendados'} />
      </div>

      {scheduledParty ? 
        <>
        {parties?.filter(party => party.eventDate || party.eventTime).map(party => {
          return (
            <Party party={party} players={players} user={user} key={party.id} fetchParties={fetchParties} />
          )
        })}
        </>
      :
        <>
        {parties?.filter(party => !party.eventDate && !party.eventTime).map(party => {
          return (
            <Party party={party} players={players} user={user} key={party.id} fetchParties={fetchParties} />
          )
        })}
        </>
      }
  
      <CreateParty party={{}} userKey={user.userKey} open={openCreate} handleClose={handleCloseCreateParty} />

      <button onClick={() => setOpenCreate(true)}>
        <img src={'runeConvince.gif'} className="deleteParty__icon" alt="voc" />
        Criar Evento/PT
      </button>
    </>
  )

}

export default Parties