import React, { useState } from 'react';
import './style.css';
import { query } from 'thin-backend';
import { useQuery } from 'thin-backend-react';
import { createRecord, deleteRecord } from 'thin-backend';

const Party = ({ party, getGuildMember, userKey }) => {
  const [memberName, setMemberName] = useState('');
  const partyMembers = useQuery(query('party_member').orderByDesc('id'));

  const addPartyMember = () => {
    if (!memberName.trim('')) return;

    createRecord('party_member', { partyId: party.id, name: memberName.trim(''), userkey: userKey });
    setMemberName('')
  }

  return (
    <div className="simpleWindow" key={party.id} >
      <span>{party.name}</span>
      {partyMembers?.filter(member => member.partyId === party.id).map((member, index) => {
        return (
          <div className="flexRow" key={member.id}>
            {userKey === member.userkey ?
              <button onClick={() => deleteRecord('party_member', member.id)}> &nbsp;X&nbsp; </button> : ''}
            {getGuildMember(member.name)}
          </div>
        )
      })}
      <div className="flexRow">
        <input value={memberName} onChange={(e) => setMemberName(e.target.value)} /><button onClick={addPartyMember}> &nbsp;+&nbsp; </button>
      </div>
    </div>
  );

}

export default Party