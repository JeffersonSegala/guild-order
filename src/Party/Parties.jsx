import React, { useState } from 'react';
import './style.css';
import { query } from 'thin-backend';
import { useQuery } from 'thin-backend-react';
import { createRecord } from 'thin-backend';
import Party from './Party';

const Parties = ({ getGuildMember, userKey }) => {
  const [partyName, setPartyName] = useState('');
  const parties = useQuery(query('party').orderByDesc('id'));

  const createParty = () => {
    if (!partyName) return;

    createRecord('party', { name: partyName, userkey: userKey });
    setPartyName('')
  }

  return (
    <>
      {parties?.map(party => {
        return (
          <Party party={party} getGuildMember={getGuildMember} userKey={userKey} />
        )
      })}

      <div className="flexRow">
        <input value={partyName} onChange={(e) => setPartyName(e.target.value)} /><button onClick={createParty}>Create PT</button>
      </div>   
    </>
  )

}

export default Parties