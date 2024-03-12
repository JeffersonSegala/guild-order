import './App.css';
import { useState, useEffect } from 'react';
import OnlineMembers from './OnlineMembers/OnlineMembers';
import Parties from './Party/Parties';
import Header from './Components/Header/Header';

function App() {
  const [guild, setGuild] = useState([]);
  const [united, setUnited] = useState([]);
  const [userKey, setUserKey] = useState('');

  useEffect(() => {
    fetch('https://api.tibiadata.com/v4/guild/order')
      .then(response => response.json())
      .then(data => {
        setGuild(data.guild.members)
    });

    fetch('https://api.tibiadata.com/v4/guild/united')
    .then(response => response.json())
    .then(data => {
      setUnited(data.guild.members)
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
            
      <Header/>

      <div className="flex-container">

        <OnlineMembers members={guild} />

        <Parties players={guild.concat(united)} userKey={userKey} />   
       
      </div>

    </div>
  );
}

export default App;
