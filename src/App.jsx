import './App.css';
import { useState, useEffect } from 'react';
import { query } from 'thin-backend';
import { useQuery } from 'thin-backend-react';
import { createRecord, deleteRecord } from 'thin-backend';

function App() {
  const [guild, setGuild] = useState(false);
  const [memberName, setMemberName] = useState('');
  const parties = useQuery(query('party').orderByDesc('id'));
  const partyMembers = useQuery(query('party_member').orderByDesc('id'));

  useEffect(() => {
    fetch('https://dev.tibiadata.com/v3/guild/order')
      .then(response => response.json())
      .then(data => {
        console.log('response', data)
        setGuild(data.guilds.guild)
      });
  }, []);
  
  const charTibiaLink = (name) => {
    return `https://www.tibia.com/community/?name=${name}`
  }

  const addPartyMember = (partyId, name) => {
    createRecord('party_member', { partyId: partyId, name: name });
    setMemberName('')
  }

  const getGuildMember = (name) => {
    const member = guild?.members?.find(member => member.name === name)
    if (member) {
      return buildGuildMember(member)
    } else {
      return name
    }
  }

  const onlineMembers = () => {
    return guild?.members?.filter(member => member.status === "online")
  }

  const buildGuildMember = (member) => {
    return (
      <div className={`member ${member.status === "online" ? 'online' : 'offline'}`} key={member.name} >
        <a href={charTibiaLink(member.name)} target='_blank' rel='noreferrer'>
        <img src={member.vocation+'.png'} className="vocationImage" alt="voc" /> 
        {' ' + member.name + ' ('+member.level+')'}
        </a>
      </div>
    )
  }

  return (
    <div className="App">
      
      <div className='header'>
        <img src={'logoNname.png'} className="logo" alt='logo' />
      </div>

      <div className="flex-container">
        
        
        
        
        <div className="simpleWindow" >
          <span>Online Members</span>
          {onlineMembers()?.sort((a, b) => {return b.level - a.level}).map((member, index) => {
            return (
              buildGuildMember(member)            
            )
          })}
        </div>





        {parties?.map(party => {
          return (
          <div className="simpleWindow" key={party.id} >
            <span>{party.name + ' - ' + party.schedule}</span>
            {partyMembers?.filter(member => member.partyId === party.id).map((member, index) => {
              return (
                <div className="flexRow" key={member.id}>
                  {index > 4 ? 'Reserva ' : ''}
                  
                  <button onClick={() => deleteRecord('party_member', member.id)}> &nbsp;X&nbsp; </button>
                  {getGuildMember(member.name)}
                  

                </div>
              )
            })}
            <div className="flexRow">
              <input value={memberName} onChange={(e) => setMemberName(e.target.value)} /><button onClick={() => addPartyMember(party.id, memberName)}> &nbsp;+&nbsp; </button>
            </div>
          </div>
          )
        })}

        <button onClick={() => {}}>Create Party</button>

        {/* <div className="simpleWindow" >
          <span>GT</span>
          <div key={1} className='member'>
                  <img src={'Elite Knight.png'} className="vocationImage" alt="voc" /> 
                  {' ab'}
                </div>
        </div>

        <div className="simpleWindow" >
          <span>Portais de Thais</span>
          <div key={1} className='member'>
            <img src={'Elite Knight.png'} className="vocationImage" alt="voc" /> 
            {' Bepe Ferobra'}
          </div>
          <div key={1} className='member'>
            <img src={'Elite Knight.png'} className="vocationImage" alt="voc" /> 
            {' Bepe Ferobra'}
          </div>
        </div> */}
       
      </div>

    </div>
  );
}

export default App;
