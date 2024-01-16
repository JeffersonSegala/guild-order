import './App.css';
import { useState, useEffect } from 'react';
import { query } from 'thin-backend';
import { useQuery } from 'thin-backend-react';
import { createRecord } from 'thin-backend';
import Party from './Party/Party';

function App() {
  const [guild, setGuild] = useState(false);
  
  const [partyName, setPartyName] = useState('');
  const [userKey, setUserKey] = useState('');
  const parties = useQuery(query('party').orderByDesc('id'));
  

  useEffect(() => {
    fetch('https://dev.tibiadata.com/v3/guild/order')
      .then(response => response.json())
      .then(data => {
        setGuild(data.guilds.guild)
      });

      let lsUserKey = localStorage.getItem("userKey");
      if (!lsUserKey) {
        lsUserKey = new Date().getTime();
        localStorage.setItem("userKey", lsUserKey)
      }
      setUserKey(lsUserKey)
  }, []);
  
  const charTibiaLink = (name) => {
    return `https://www.tibia.com/community/?name=${name}`
  }

  const createParty = () => {
    if (!partyName) return;

    createRecord('party', { name: partyName, userkey: userKey });
    setPartyName('')
  }

  const getGuildMember = (name) => {
    const member = guild?.members?.find(member => member.name.toLowerCase() === name.toLowerCase())
    if (member) {
      return buildGuildMember(member)
    } else {
      return buildGuildMember({name: name, status: 'offline', vocation: undefined, level: '?' })
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
            <Party party={party} getGuildMember={getGuildMember} userKey={userKey} />
          )
        })}

        <div className="flexRow">
          <input value={partyName} onChange={(e) => setPartyName(e.target.value)} /><button onClick={createParty}>Create PT</button>
        </div>      
       
      </div>

    </div>
  );
}

export default App;
