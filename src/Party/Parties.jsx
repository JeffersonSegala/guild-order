import React, { useState } from 'react';
import './style.css';
import { query } from 'thin-backend';
import { useQuery } from 'thin-backend-react';
import Party from './Party';
import CreateParty from '../CreateParty/CreateParty';

const Parties = ({ guildMembers, userKey }) => {
  const [openCreate, setOpenCreate] = useState(false);
  const parties = useQuery(query('party').orderByDesc('id'));
  const admins = useQuery(query('admin').orderByDesc('id'));

  return (
    <>
      {parties?.map(party => {
        return (
          <Party party={party} guildMembers={guildMembers} userKey={userKey} admins={admins} key={party.id} />
        )
      })}

      <CreateParty party={{}} userKey={userKey} open={openCreate} handleClose={() => setOpenCreate(false)} />

      <button onClick={() => setOpenCreate(true)}>Criar PT</button>
    </>
  )

}

export default Parties