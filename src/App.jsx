import './App.css';
import { useState, useEffect } from 'react';
import OnlineMembers from './OnlineMembers/OnlineMembers';
import Header from './Components/Header/Header';
import Window from './Window/Window';

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

        <Window title={'[28/06/24 - 19:30] GT FINAL > FERUMBRAS FINAL'} >
          <div>
            Concentração na entrada da GT para formação da PT, as 19:20 as vagas remanecentes da PT serão ofertadas no Advertising.
          </div>
          <br/>
          <div>Inscrições nos eventos do discord</div>
          <div>
            <img src={'guia1.png'} />
            <img src={'guia2.png'} />
          </div>
        </Window>

        <Window title={'[30/06/24 - 10:30 > 14:30 > 18:30] Warzone 4'} >
          <div>Inscrições nos eventos do discord</div>
          <div>
            <img src={'guia1.png'} />
            <img src={'guia3.png'} />
          </div>
        </Window>
      
      </div>

    </div>
  );
}

export default App;
