import React, { useState, useEffect } from 'react';
import './style.css';
import Party from './Party';
import CreateParty from '../CreateParty/CreateParty';
import Constants from '../Constants';

const Parties = ({ players, user }) => {
  const [openCreate, setOpenCreate] = useState(false);
  const [parties, setParties] = useState([]);

  useEffect(() => {
    fetchParties();
  }, []);

  const fetchParties = () => {
    console.log('fetching')
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
      {parties?.sort((a, b) => a.name.localeCompare(b.name)).map(party => {
        return (
          <Party party={party} players={players} user={user} key={party.id} fetchParties={fetchParties} />
        )
      })}

      <CreateParty party={{}} userKey={user.userKey} open={openCreate} handleClose={handleCloseCreateParty} />

      <button onClick={() => setOpenCreate(true)}>
        <img src={'runeConvince.gif'} className="deleteParty__icon" alt="voc" />
        Criar Evento/PT
      </button>
    </>
  )

}

export default Parties