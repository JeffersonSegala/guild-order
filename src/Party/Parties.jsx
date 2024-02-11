import React, { useState } from 'react';
import './style.css';
import { query } from 'thin-backend';
import { useQuery } from 'thin-backend-react';
import Party from './Party';
import CreateParty from '../CreateParty/CreateParty';

const Parties = ({ players, userKey }) => {
  const [openCreate, setOpenCreate] = useState(false);
  const parties = useQuery(query('party').orderByDesc('id'));
  const admins = useQuery(query('admin').orderByDesc('id'));

  return (
    <>
      {parties?.map(party => {
        return (
          <Party party={party} players={players} userKey={userKey} admins={admins} key={party.id} />
        )
      })}

      <CreateParty party={{}} userKey={userKey} open={openCreate} handleClose={() => setOpenCreate(false)} />

      <button onClick={() => setOpenCreate(true)}><img src={'runeConvince.gif'} className="deleteParty__icon" alt="voc" />Criar Evento/PT</button>
    </>
  )

}

export default Parties