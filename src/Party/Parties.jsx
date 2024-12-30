import React, {useEffect} from 'react';
import './style.css';
import Party from './Party';

const Parties = ({ players }) => {

  useEffect(() => {
    parties = parties;
  }, [players]);

  var parties = [
    {id: 1, name: 'GT FINAL > Ferumbras FINAL', eventDate: '30/12/2024', eventTime: '19:00', qtEk: 3, qtEd: 3, qtSt: 9, createdAt: '16/07/2024 00:00', 
      description: 'Reunião na GH - level 250+ ',
      partyMembers: [
        {id: 1, name: 'Bepesz'},
        {id: 2, name: 'Simprozo'},
        {id: 3, name: 'Ssumail'},
        {id: 4, name: 'Raposa Estelar'},
        {id: 5, name: 'Aime Flu'},
        {id: 6, name: 'Benckiser'},
        {id: 7, name: 'Archimedes Arturiano'},
        {id: 8, name: 'Guizao Inocente'},
        {id: 9, name: 'Nuevo hogar'},
        {id: 10, name: 'Royaladino'},
        {id: 11, name: 'Rakoda'},
        {id: 12, name: 'Donta Al'},
        {id: 13, name: 'Mystdeath'},
        {id: 14, name: 'Calcagil'},
        {id: 15, name: 'Nico Pally'},
        {id: 16, name: 'Tazin Stylles'},
        {id: 17, name: 'Juanit Ania'}
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