import React, { useState } from 'react';
import './style.css';
import { query } from 'thin-backend';
import { useQuery } from 'thin-backend-react';
import { createRecord, deleteRecord } from 'thin-backend';
import Window from '../Window/Window';
import CreateParty from '../CreateParty/CreateParty';
import GuildMember from '../GuildMember/GuildMember';

const Party = ({ party, guildMembers, userKey, admins }) => {
  const [memberName, setMemberName] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const allPartyMembers = useQuery(query('party_member').orderByAsc('createdAt'));

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
    } else if (party.qtEk || party.qtEd || party.qtSt) {
      title = `[${party.qtEk}x${party.qtEd}x${party.qtSt}] ${title}` 
    }
    return <div onClick={handleOpenEdit}>{title}</div>
  }

  const handleOpenEdit = () => {
    if (party.userkey === userKey || admins.find(admin => admin.userkey === userKey)) {
      setOpenEdit(true)
    }
  }

  const getGuildMember = (name) => {
    const member = guildMembers?.find(member => member.name.toLowerCase() === name.toLowerCase())
    if (member) {
      return member
    }
    return {name: name, status: 'offline', vocation: 'Undefined', level: '?' }
  }

  const buildPartyMember = (partyMember) => {
    const guildMember = getGuildMember(partyMember.name);
    
    return (<>
      <GuildMember member={getGuildMember(partyMember.name)} />
            
      {userKey === partyMember.userkey ? <button onClick={() => deleteRecord('party_member', partyMember.id)}> &nbsp;X&nbsp; </button> : ''}
    
      {buildSlot(guildMember)}
    </>)
  }

  let countEk = 0;
  let countEd = 0;
  let countSt = 0;
  let count = 0;
  const buildSlot = (guildMember) => {
    if (party.size) {
      count++
      if (count > party.size) {
        return 'reserva'
      }
    } else if (party.qtEk && guildMember.vocation.includes('Knight')) {
      countEk++
      if (countEk <= party.qtEk) {
        return countEk + '/' + party.qtEk
      } else {
        return 'reserva'
      }
    } else if (party.qtEd && guildMember.vocation.includes('Druid')) {
      countEd++
      if (countEd <= party.qtEd) {
        return countEd + '/' + party.qtEd
      } else {
        return 'reserva'
      }
    } else if (party.qtEd && (guildMember.vocation.includes('Paladin') || guildMember.vocation.includes('Sorcerer')) ) {
      countSt++
      if (countSt <= party.qtSt) {
        return countSt + '/' + party.qtSt
      } else {
        return 'reserva'
      }
    }
  }
  
  return (
    <Window title={buildTitle()} key={party.id} id={party.name} >
      {partyMembers()?.map((partyMember, index) => {
        return (
          <div className="flexRow" key={partyMember.id}>
            {buildPartyMember(partyMember)}
          </div>
        )
      })}

      <div className="flexRow">
        <input value={memberName} onChange={(e) => setMemberName(e.target.value)} placeholder='Char name' /><button onClick={addPartyMember}> &nbsp;+&nbsp; </button>
      </div>
      
      <CreateParty party={party} open={openEdit} handleClose={() => setOpenEdit(false)} />
    </Window>
  );

}

export default Party