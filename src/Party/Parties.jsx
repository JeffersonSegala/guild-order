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
        {id: 1, name: 'Air Mugah'},
        {id: 2, name: 'Parli On Three'},
        {id: 3, name: 'Gaelbriel'},
        {id: 4, name: 'Slavim Metiis'},
        {id: 5, name: 'Calamity Knight'},
        {id: 6, name: 'Red Rot'},
        {id: 7, name: 'Benckiser'},
        {id: 8, name: 'Wolla Har'},
        {id: 9, name: 'Brus Morphrix'},
        {id: 10, name: 'Scavengeer'},
        {id: 11, name: 'Bechin'},
        {id: 12, name: 'Lizaso'},
        {id: 13, name: 'Nico Pally'},
        {id: 14, name: 'Rafa Candido'},
        {id: 15, name: 'Soares Kalidus'},
        {id: 16, name: 'Imperius Solarion'},
        {id: 17, name: 'Ubume San'},
        {id: 18, name: 'Apollo Rampage'},
        {id: 19, name: 'Andy Chinelo'}
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