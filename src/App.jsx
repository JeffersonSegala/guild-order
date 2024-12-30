import './App.css';
import { useState, useEffect } from 'react';
import OnlineMembers from './OnlineMembers/OnlineMembers';
import Header from './Components/Header/Header';
import Window from './Window/Window';
import Parties from './Party/Parties';

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

        <Window title={'Finais'} isOpen={true} >
          <div>
            Final GT (250+)
            <div>&nbsp;<span>Quartas-feiras às 19h</span></div>
            <div>&nbsp;<span>Concentração na GH (vagas da lista são cedidas para quem estiver presente caso não compareça faltando 5 minutos)</span></div>
            
            <br />
            Final Ferumbras (250+)
            <div>&nbsp;<span>Após a GT Final da quarta-feira</span></div>
          </div>
        </Window>

        <Parties players={guild} />
      </div>

    </div>
  );
}

export default App;
