import './App.css';
import { useState, useEffect } from 'react';
import OnlineMembers from './OnlineMembers/OnlineMembers';
import Parties from './Party/Parties';
import Header from './Components/Header/Header';
import Constants from './Constants';

function App() {
  const [guild, setGuild] = useState([]);
  const [united, setUnited] = useState([]);
  const [lsUserKey, setLsUserKey] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    fetchOrder();
    setInterval(fetchOrder, 60000);

    fetchUnited();

    fetchUser();
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

  const fetchUser = () => {
    let lsUserKey = localStorage.getItem("userKey");
    if (!lsUserKey) {
      lsUserKey = new Date().getTime();
      localStorage.setItem("userKey", lsUserKey)
    }
    setLsUserKey(lsUserKey)

    fetch(Constants.API_URL + '/user/' + lsUserKey)
      .then(response => response.json())
      .then(data => {
        setUser(data)
    });
  }
  
  return (
    <div className="App">
            
      <Header lsUserKey={lsUserKey} user={user} />

      <div className="flex-container">

        <OnlineMembers members={guild} />

        <Parties players={guild.concat(united)} user={user} />   
       
      </div>

    </div>
  );
}

export default App;
