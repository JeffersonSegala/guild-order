import React, { Fragment, useState } from 'react';
import './style.css';
import Window from '../Window/Window';
import CreateParty from '../CreateParty/CreateParty';
import GuildMember from '../GuildMember/GuildMember';
import Toggle from '../Toggle/Toggle';
import DeleteParty from '../DeleteParty/DeleteParty';
import { Snackbar } from '@mui/material';
import axios from 'axios';
import Constants from '../Constants';

const Party = ({ party, players, user, fetchParties }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [service, setService] = useState(false);
  const [partyMembers, setPartyMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const rankOrder = ['Leader', 'Vice Leader', 'Honorary', 'Frontline', 'Member', 'Apprentice', 'Retired'];
  const vocOrder = ['Elite Knight', 'Elder Druid', 'Shooter'];

  const fetchPartyMembers = () => {
    setLoading(true)
    fetch(Constants.API_URL + '/partyMembers/' + party.id)
      .then(response => response.json())
      .then(data => {
        setPartyMembers(data)
        setLoading(false)
    });
  }

  const buildTitle = () => {
    let title = party.name
    if (party.eventDate && party.eventTime) {
      title = `[${dateTimeFormat(party.eventDate + ' ' + party.eventTime).replace(/(.*)\D\d+/, '$1')}] ${title}`
    } else if (party.eventDate) {
        title = `[${new Date(party.eventDate + ' 12:00:00').toLocaleDateString()}] ${title}`
    } else if (party.eventTime) {
      title = `[${new Date('2024-03-03 ' + party.eventTime).toLocaleTimeString().replace(/(.*)\D\d+/, '$1')}] ${title}`
    }
    return <div>{title}</div>
  }

  const handleOpenEdit = () => {
    if (hasPermission(party.user.userKey)) {
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

  const dateTimeFormat = (dateTime) => {
    const date = new Date(dateTime)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }

  const buildPartyMember = (partyMember) => {
    const player = getPlayer(partyMember.name);
    
    return (<>
      <GuildMember member={player} hint={dateTimeFormat(partyMember.createdAt)} />
            
      {hasPermission(partyMember.user.userKey) ? <button onClick={() => deletePartyMember(partyMember.id)}> &nbsp;X&nbsp; </button> : ''}
    
      {buildSlot(player, partyMember)}
    </>)
  }

  const deletePartyMember = (partyMemberId) => {
    axios.delete(Constants.API_URL + '/partyMembers/' + partyMemberId)
        .then(response => {
          console.log(response)
          fetchPartyMembers();
        });
  }

  const hasPermission = (itemUserKey) => {
    return itemUserKey === user.userKey || user.logout
  }

  let countEk = 0;
  let countEd = 0;
  let countSt = 0;
  let count = 0;
  const buildSlot = (guildMember, partyMember) => {
    if (!guildMember?.vocation) return 'ops';
    if (partyMember.service) return '';

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
    } else if (party.qtSt && (guildMember.vocation.includes('Paladin') || guildMember.vocation.includes('Sorcerer')) ) {
      countSt++
      if (countSt <= party.qtSt) {
        return countSt + '/' + party.qtSt
      } else {
        return 'reserva'
      }
    }
  }

  const addPartyMember = () => {
    if (!memberName.trim('') || partyMembers.find(pm => pm.name.toLowerCase() === memberName.toLowerCase().trim(''))) return;

    const newPartymember = { 
      party: {id: party.id},
      name: memberName.trim(''), 
      service: service, 
      user: {userKey: user.userKey}
    }

    axios.post(Constants.API_URL + '/partyMember', newPartymember)
      .then(response => {
        fetchPartyMembers();
      });
    
    setMemberName('')
    setService(false)
  }

  const closeDelete = (success) => {
    setOpenDelete(false)
    if (success) setShowMessage(true)
    fetchParties();
  }

  const closeCreate = (success) => {
    setOpenEdit(false)
    if (success) setShowMessage(true)
    fetchParties();
  }

  const sortByVoc = (a, b) => {
    if (!party.qtEk && !party.qtEd && !party.qtSt) return 0
    return vocOrder.indexOf(getPlayerVocation(a.name)) - vocOrder.indexOf(getPlayerVocation(b.name))
  }

  const sortByRank = (a, b) => {
    return rankOrder.indexOf(getPlayer(a.name).rank) - rankOrder.indexOf(getPlayer(b.name).rank)
  }
  
  const getPlayerVocation = (name) => {
    const vocation = getPlayer(name).vocation
    return vocation === 'Royal Paladin' || vocation === 'Master Sorcerer' ? 'Shooter' : vocation
  }

  return (
    <>
      <Window title={buildTitle()} id={party.name} 
              onClose={hasPermission(party.user.userKey) ? () => setOpenDelete(true) : null} 
              onEdit={hasPermission(party.user.userKey) ? handleOpenEdit : null}
              hint={dateTimeFormat(party.createdAt)} 
              onOpen={fetchPartyMembers}>

        <div className='party__description'>
          {party.description}
        </div>

        {loading && 'carregando...'}

        {partyMembers?.filter(partyMember => !partyMember.service)
          .sort(sortByRank)
          .sort(sortByVoc)
          .map((partyMember) => {
            return (
              <div className="flexRow" key={partyMember.id}>
                {buildPartyMember(partyMember)}
              </div>
            )
          })
        }

        {partyMembers?.filter(partyMember => partyMember.service).map((partyMember, index) => {
          return (
            <Fragment key={partyMember.id}>
              {index === 0 && 
                <div className='service'>
                  <img src={'greenBp.gif'} className="party__icon" alt="img" /> Abaixo precisam do Service <img src={'greenBp.gif'} className="party__icon" alt="img" />
                </div>
              }
              <div className="flexRow" >
                {buildPartyMember(partyMember)}
              </div>
            </Fragment>
          )
        })}

        <div className="flexRow">
          <input value={memberName} onChange={(e) => setMemberName(e.target.value)} placeholder='Adicionar membro' />
          <button onClick={addPartyMember}> &nbsp;+&nbsp; </button>
          <Toggle 
            checked={service}
            onChange={() => setService(service => !service)}
            title={'Preciso do Service'} />
            <div className="flexRow" style={{color: service ? 'green' : 'gray'}}>Service</div>
        </div>
        
      </Window>

      <DeleteParty party={party} open={openDelete} handleClose={closeDelete} />

      <CreateParty party={party} open={openEdit} handleClose={closeCreate} />

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