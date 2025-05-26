import './App.css';
import { useState, useEffect } from 'react';
import OnlineMembers from './OnlineMembers/OnlineMembers';
import Header from './Components/Header/Header';
import LastLoreKeeper from './LastLoreKeeper/LastLoreKeeper';

function App() {
  const [guild, setGuild] = useState([]);

  useEffect(() => {
    fetchOrder();
    setInterval(fetchOrder, 60000);
  }, []);

  const fetchOrder = () => {
    fetch('https://api.tibiadata.com/v4/guild/order')
      .then(response => response.json())
      .then(data => {
        setGuild(data.guild.members)
    });
  }

  return (
    <div className="App">
            
      <Header />

      <div className="flex-container">

        <OnlineMembers members={guild} />

        <LastLoreKeeper/>

      </div>

    </div>
  );
}

export default App;
