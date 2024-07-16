import React, { useState } from 'react';
import './style.css';
import Window from '../Window/Window';
import GuildMember from '../GuildMember/GuildMember';
import { Snackbar } from '@mui/material';
import Constants from '../Constants';

const Party = ({ party, players }) => {
  const [showMessage, setShowMessage] = useState('');

  const rankOrder = ['Leader', 'Vice Leader', 'Honorary', 'Frontline', 'Member', 'Apprentice', 'Retired'];
  const vocOrder = ['Elite Knight', 'Elder Druid', 'Shooter'];

  const buildTitle = () => {
    let title = party.name
    if (party.eventDate && party.eventTime) {
      title = `[${party.eventDate + ' ' + party.eventTime}] ${title}`
    } else if (party.eventDate) {
        title = `[${new Date(party.eventDate + ' 12:00:00').toLocaleDateString()}] ${title}`
    } else if (party.eventTime) {
      title = `[${new Date('2024-03-03 ' + party.eventTime).toLocaleTimeString().replace(/(.*)\D\d+/, '$1')}] ${title}`
    }
    return <div>{title}</div>
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
            
      {buildSlot(player, partyMember)}
    </>)
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

  const copyParty = () => {
    fetch(Constants.API_URL + '/party/share/' + party.id)
      .then(response => response.text())
      .then(data => {
        navigator.clipboard.writeText(data)
        setShowMessage('Copiado')
    });
  }

  return (
    <>
      <Window title={buildTitle()} id={party.name} 
              hint={party.createdAt} 
              isOpen={true}
              onCopy={copyParty}>

        <div className='party__description'>
          {party.description}
        </div>

        {party.partyMembers
          .sort(sortByRank)
          .sort(sortByVoc)
          .map((partyMember) => {
            {console.log(partyMember)}
            return (
              <div className="flexRow" key={partyMember.id}>
                {buildPartyMember(partyMember)}
              </div>
            )
          })
        }

      </Window>

      <Snackbar
        open={showMessage}
        autoHideDuration={3000}
        onClose={() => setShowMessage('')}
        message={showMessage}
        action={<></>}
      />
    </>
  );

}

export default Party