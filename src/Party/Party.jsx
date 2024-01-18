import React, { useState, useEffect } from 'react';
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
  const partyMembers = useQuery(query('party_member').filterWhere('partyId', party.id).orderByAsc('createdAt'));
  const [players, setPlayers] = useState(guildMembers);
  const [fetched, setFetched] = useState([]); 

  useEffect(() => {
    if (!(partyMembers && players))  {
      return;
    }

    const toFecth = partyMembers
                      .filter(partyMember => !players.find(player => player.name.toLowerCase() === partyMember.name.toLowerCase()))
                      .filter(partyMember => !fetched.find(fetched => fetched.toLowerCase() === partyMember.name.toLowerCase()))
                      .map(character => character.name)
                      
    if (toFecth.length === 0) {
      return
    }

    setFetched([...fetched, ...toFecth])
                      
    const urls = toFecth.map(name => `https://api.tibiadata.com/v4/character/${name}`)

    console.log('urls', urls)
    const requests = urls.map(url => fetch(url))
    Promise.all(requests)
      .then(results => Promise.all(results.map(r => r.json())) )
      .then(results => { 
        const fetchedPlayers = []
        results.forEach(r => {
          fetchedPlayers.push(r.character.character)
        }) 
        setPlayers([...players, ...fetchedPlayers])
      })
      
  }, [partyMembers, guildMembers, players, fetched]);

  const addPartyMember = () => {
    if (!memberName.trim('')) return;

    createRecord('party_member', { partyId: party.id, name: memberName.trim(''), userkey: userKey });
    setMemberName('')
  }

  const buildTitle = () => {
    let title = party.name
    if (party.size) {
      title = `[${partyMembers?.length}/${party.size}] ${title}`
    } else if (party.qtEk || party.qtEd || party.qtSt) {
      title = `[${party.qtEk ? 'EKs:' + party.qtEk: ''} ${party.qtEd ? 'EDs:' + party.qtEd: ''}${party.qtSt ? ' Shooters:' + party.qtSt : ''}] ${title}` 
    }
    return <div onClick={handleOpenEdit}>{title}</div>
  }

  const handleOpenEdit = () => {
    if (party.userkey === userKey || admins.find(admin => admin.userkey === userKey)) {
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
            
      {userKey === partyMember.userkey || admins.find(admin => admin.userkey === userKey) ? <button onClick={() => deleteRecord('party_member', partyMember.id)}> &nbsp;X&nbsp; </button> : ''}
    
      {buildSlot(player)}
    </>)
  }

  let countEk = 0;
  let countEd = 0;
  let countSt = 0;
  let count = 0;
  const buildSlot = (guildMember) => {
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

  return (
    <Window title={buildTitle()} key={party.id} id={party.name} >
      {partyMembers?.map((partyMember, index) => {
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