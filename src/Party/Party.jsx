import React, { useState } from 'react';
import './style.css';
import { query } from 'thin-backend';
import { useQuery } from 'thin-backend-react';
import { createRecord, deleteRecord } from 'thin-backend';
import Window from '../Window/Window';
import CreateParty from '../CreateParty/CreateParty';
import GuildMember from '../GuildMember/GuildMember';
import Toggle from '../Toggle/Toggle';
import DeleteParty from '../DeleteParty/DeleteParty';
import { Snackbar } from '@mui/material';

const Party = ({ party, players, userKey, admins }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [service, setService] = useState(false);
  const partyMembers = useQuery(query('party_member').filterWhere('partyId', party.id).orderByAsc('createdAt'));

  const addPartyMember = () => {
    if (!memberName.trim('') || partyMembers.find(pm => pm.name.toLowerCase() === memberName.toLowerCase().trim(''))) return;

    createRecord('party_member', { partyId: party.id, name: memberName.trim(''), service: service, userkey: userKey });
    setMemberName('')
    setService(false)
  }

  const buildTitle = () => {
    let title = party.name
    if (party.size) {
      title = `[${partyMembers?.length}/${party.size}] ${title}`
    } else if (party.qtEk || party.qtEd || party.qtSt) {
      title = `[${party.qtEk ? 'EKs:' + party.qtEk: ''} ${party.qtEd ? 'EDs:' + party.qtEd: ''}${party.qtSt ? ' Shooters:' + party.qtSt : ''}] ${title}` 
    }
    return <div>{title}</div>
  }

  const handleOpenEdit = () => {
    if (hasPermission(party.userkey)) {
      setOpenEdit(true)
    }
  }

  const getPlayer = (name) => {
    const player = players?.find(player => player.name.toLowerCase() === name.toLowerCase())
    if (player) {
      return player
    }
    
    return {name: name, status: 'offline', vocation: 'Undefined', level: '?' };
  }

  const buildPartyMember = (partyMember) => {
    const player = getPlayer(partyMember.name);
    
    return (<>
      <GuildMember member={player} />
            
      {hasPermission(partyMember.userkey) ? <button onClick={() => deleteRecord('party_member', partyMember.id)}> &nbsp;X&nbsp; </button> : ''}
    
      {buildSlot(player, partyMember)}
    </>)
  }

  const hasPermission = (itemUserKey) => {
    return itemUserKey === userKey || admins?.find(admin => admin.userkey === userKey)
  }

  let countEk = 0;
  let countEd = 0;
  let countSt = 0;
  let count = 0;
  const buildSlot = (guildMember, partyMember) => {
    if (!guildMember?.vocation) return 'ops';

    

    if (party.size) {
      count++
      if (count > party.size) {
        return 'reserva'
      }
    } else if (partyMember.service) {
      return <><img src={'greenBp.gif'} className="party__icon" alt="img" />me carrega</>
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
    } else if (party.qtSt && (guildMember.vocation.includes('Paladin') || guildMember.vocation.includes('Sorcerer')) ) {
      countSt++
      if (countSt <= party.qtSt) {
        return countSt + '/' + party.qtSt
      } else {
        return 'reserva'
      }
    }
  }

  const closeDelete = (success) => {
    setOpenDelete(false)
    if (success) setShowMessage(true)
  }

  return (
    <>
      <Window title={buildTitle()} id={party.name} 
        onClose={hasPermission(party.userkey) ? () => setOpenDelete(true) : null} 
        onEdit={hasPermission(party.userkey) ? handleOpenEdit : null} >

        {partyMembers?.map((partyMember, index) => {
          return (
            <div className="flexRow" key={partyMember.id}>
              {buildPartyMember(partyMember)}
            </div>
          )
        })}

        <div className="flexRow">
          <input value={memberName} onChange={(e) => setMemberName(e.target.value)} placeholder='Adicionar membro' />
          <Toggle 
            checked={service}
            onChange={() => setService(service => !service)}
            title={'Preciso do Service'} />
          <button onClick={addPartyMember}> &nbsp;+&nbsp; </button>
        </div>
        
      </Window>

      <DeleteParty party={party} open={openDelete} handleClose={closeDelete} />

      <CreateParty party={party} open={openEdit} handleClose={() => setOpenEdit(false)} />

      <Snackbar
        open={showMessage}
        autoHideDuration={3000}
        onClose={() => setShowMessage(false)}
        message="Sucesso"
        action={<></>}
      />
    </>
  );

}

export default Party