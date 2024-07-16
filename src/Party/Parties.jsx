import React, {useEffect} from 'react';
import './style.css';
import Party from './Party';

const Parties = ({ players }) => {

  useEffect(() => {
    parties = parties;
  }, [players]);

  var parties = [
    {id: 1, name: 'GT FINAL > Ferumbras FINAL', eventDate: '17/07/2024', eventTime: '19:30', qtEk: 3, qtEd: 3, qtSt: 9, createdAt: '16/07/2024 00:00', 
      description: 'Reunião na ENTRADA do vortex para organização das vagas. level 250+ ',
      partyMembers: [
        {id: 1, name: 'Bepe Ferobra'},
        {id: 2, name: 'Bechin'},
        {id: 3, name: 'Air Mugah'},
      ]
    }
  ]

  return (
    <>
    {parties?.map(party => {
      return <Party party={party} players={players} key={party.id} />
    })}
    </>
  )

}

export default Parties