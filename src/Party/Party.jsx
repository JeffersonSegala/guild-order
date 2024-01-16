import React, { useState } from 'react';
import './style.css';
import { query } from 'thin-backend';
import { useQuery } from 'thin-backend-react';
import { createRecord, deleteRecord } from 'thin-backend';
import Window from '../Window/Window';
import EditParty from '../EditParty/EditParty';

const Party = ({ party, getGuildMember, userKey }) => {
  const [memberName, setMemberName] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const allPartyMembers = useQuery(query('party_member').orderByDesc('id'));

  const partyMembers = () => {
    return allPartyMembers?.filter(member => member.partyId === party.id)
  }

  const addPartyMember = () => {
    if (!memberName.trim('')) return;

    createRecord('party_member', { partyId: party.id, name: memberName.trim(''), userkey: userKey });
    setMemberName('')
  }

  const buildTitle = () => {
    let title = party.name
    if (party.size) {
      title = `[${partyMembers()?.length}/${party.size}] ${title}`
    }
    return <div onClick={handleOpenEdit}>{title}</div>
  }

  const handleOpenEdit = () => {
    setOpenEdit(true)
  }

  return (
    <Window title={buildTitle()} key={party.id} >
      {partyMembers()?.map(member => {
        return (
          <div className="flexRow" key={member.id}>

            {getGuildMember(member.name)}
            
            {userKey === member.userkey ? <button onClick={() => deleteRecord('party_member', member.id)}> &nbsp;X&nbsp; </button> : ''}

          </div>
        )
      })}

      <div className="flexRow">
        <input value={memberName} onChange={(e) => setMemberName(e.target.value)} /><button onClick={addPartyMember}> &nbsp;+&nbsp; </button>
      </div>

      
    </Window>
  );

}

export default Party