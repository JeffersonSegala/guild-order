import './App.css';
import { useState, useEffect } from 'react';
import OnlineMembers from './OnlineMembers/OnlineMembers';
import Parties from './Party/Parties';

function App() {
  const [guild, setGuild] = useState(false);
  const [userKey, setUserKey] = useState('');

  useEffect(() => {
    fetch('https://dev.tibiadata.com/v4/guild/order')
      .then(response => response.json())
      .then(data => {
        setGuild(data.guild)
      });

      let lsUserKey = localStorage.getItem("userKey");
      if (!lsUserKey) {
        lsUserKey = new Date().getTime();
        localStorage.setItem("userKey", lsUserKey)
      }
      setUserKey(lsUserKey)
  }, []);
  
  return (
    <div className="App">
            
      <div className='header'>
        <img src={'logoNname.png'} className="logo" alt='logo' />
      </div>

      <div className="flex-container">

        <OnlineMembers members={guild?.members} />

        <Parties guildMembers={guild?.members} userKey={userKey} />   
       
      </div>

    </div>
  );
}

export default App;
