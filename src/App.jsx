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
    fetchOrder();
    setInterval(fetchOrder, 60000);

    fetchUnited();

    let lsUserKey = localStorage.getItem("userKey");
    if (!lsUserKey) {
      lsUserKey = new Date().getTime();
      localStorage.setItem("userKey", lsUserKey)
    }
    setUserKey(lsUserKey)
  }, []);

  const fetchOrder = () => {
    fetch('https://api.tibiadata.com/v4/guild/order')
      .then(response => response.json())
      .then(data => {
        setGuild(data.guild.members)
    });
  }

  const fetchUnited = () => {
    fetch('https://api.tibiadata.com/v4/guild/united')
      .then(response => response.json())
      .then(data => {
        setUnited(data.guild.members)
    });
  }
  
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
