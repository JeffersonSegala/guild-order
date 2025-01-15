import React, {useEffect} from 'react';
import './style.css';
import Party from './Party';

const Parties = ({ players }) => {

  useEffect(() => {
    parties = parties;
  }, [players]);

  var parties = [
    {id: 1, name: 'GT FINAL > Ferumbras FINAL', eventDate: '15/01/2025', eventTime: '19:00', qtEk: 3, qtEd: 3, qtSt: 9, createdAt: '16/07/2024 00:00', 
      description: 'Reunião na GH - level 250+ ',
      partyMembers: [
        {id: 1, name: 'Bepesz'},
        {id: 2, name: 'Archimedes Arturiano'},
        {id: 3, name: 'Shakaw Al'},
        {id: 4, name: 'Benckiser'},
        {id: 5, name: 'Vicious Delicious'},
        {id: 6, name: 'Skinkz Phyrosoul'},
        {id: 7, name: 'Fuegolleon'},
        {id: 8, name: 'Calcagil'},
        {id: 9, name: 'Nico Pally'},
        {id: 10, name: 'Rakoda'},
        {id: 11, name: 'Juanit Ania'},
        {id: 12, name: 'Choozer'},
        {id: 13, name: 'Mystdeath'},
        {id: 14, name: 'Noseout'},
        {id: 15, name: 'Simprozo'},
        
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