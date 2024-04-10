import React, { useState, useEffect } from 'react';
import './style.css';
import { query } from 'thin-backend';
import { useQuery } from 'thin-backend-react';
import Party from './Party';
import CreateParty from '../CreateParty/CreateParty';

const Parties = ({ players, userKey }) => {
  const [openCreate, setOpenCreate] = useState(false);
  const parties = []//useQuery(query('party').orderByDesc('id'));
  const admins = []//useQuery(query('admin').orderByDesc('id'));

  useEffect(() => {
    fetchParties();
    setInterval(fetchParties, 60000);
  }, []);

  const fetchParties = () => {
    
    fetch('http://54.233.174.20:8080/api/v1/parties')
    // fetch('http://localhost:8080/api/v1/parties')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        // setGuild(data.guild.members)
    });
  }

  return (
    <>
      {parties?.sort((a, b) => a.name.localeCompare(b.name)).map(party => {
        return (
          <Party party={party} players={players} userKey={userKey} admins={admins} key={party.id} />
        )
      })}

      <CreateParty party={{}} userKey={userKey} open={openCreate} handleClose={() => setOpenCreate(false)} />

      {/* <button onClick={() => setOpenCreate(true)}><img src={'runeConvince.gif'} className="deleteParty__icon" alt="voc" />Criar Evento/PT</button> */}
    </>
  )

}

export default Parties