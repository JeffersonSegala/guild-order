import './App.css';
import { useState, useEffect } from 'react';
import OnlineMembers from './OnlineMembers/OnlineMembers';
import Parties from './Party/Parties';
import GuildMember from './GuildMember/GuildMember';

function App() {
  const [guild, setGuild] = useState(false);
  const [userKey, setUserKey] = useState('');

  useEffect(() => {
    fetch('https://dev.tibiadata.com/v3/guild/order')
      .then(response => response.json())
      .then(data => {
        console.log('a', data.guilds.guild)
        setGuild(data.guilds.guild)
      });

      let lsUserKey = localStorage.getItem("userKey");
      if (!lsUserKey) {
        lsUserKey = new Date().getTime();
        localStorage.setItem("userKey", lsUserKey)
      }
      setUserKey(lsUserKey)
  }, []);
  
  const getGuildMember = (name) => {
    const member = guild?.members?.find(member => member.name.toLowerCase() === name.toLowerCase())
    if (member) {
      return <GuildMember member={member} />
    } else {
      return <GuildMember member={{name: name, status: 'offline', vocation: 'Undefined', level: '?' }} />
    }
  }

  return (
    <div className="App">
            
      <div className='header'>
        <img src={'logoNname.png'} className="logo" alt='logo' />
      </div>

      <div className="flex-container">

        <OnlineMembers members={guild?.members} />

        <Parties getGuildMember={getGuildMember} userKey={userKey} />   
       
      </div>

    </div>
  );
}

export default App;
