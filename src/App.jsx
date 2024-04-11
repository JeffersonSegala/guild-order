import './App.css';
import { useState, useEffect } from 'react';
import OnlineMembers from './OnlineMembers/OnlineMembers';
import Parties from './Party/Parties';
import Header from './Components/Header/Header';
import Window from './Window/Window';
import Constants from './Constants';

function App() {
  const [guild, setGuild] = useState([]);
  const [united, setUnited] = useState([]);
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

    fetch(Constants.API_URL + '/user/' + lsUserKey)
      .then(response => response.json())
      .then(data => {
        setUser(data)
    });
  }
  
  return (
    <div className="App">
            
      <Header user={user} />

      <div className="flex-container">

        <OnlineMembers members={guild} />


        <Window title={'AVISO'} isOpen={true} >
          Devido a problemas com nosso serviço atual que não tem previsão de retorno, estamos desenvolvendo novo banco de dados na AWS, agradecemos a compreensão.
        </Window>

        <Window title={'[10/04/2024 - 19:30] - GT Final HOJE'} isOpen={true} >
          <div style={{textAlign: 'justify'}} >
          ⚔ EK Bepe ferobra <br/>
          ⚔ EK Qwene <br/>
          ⚔ EK Lucreria <br/>
          🧙‍♂ ED Vollcom kawano <br/>
          🧙‍♂ ED Bechin <br/>
          🧙‍♂ ED kommandeer <br/>
          🏹🪄 Wolla har RP <br/>
          🏹🪄 Lord leoozin MS <br/>
          🏹🪄 Arqueiro Brizado <br/>
          🏹🪄 Bucetinha <br/>
          🏹🪄 Baiano Supremo  <br/>
          🏹🪄 Rapoza Estelar <br/>
          🏹🪄 Noseout <br/>
          🏹🪄 miconruyel rodrain  <br/>
          🏹🪄 Apollo Rampage <br/>
          </div>
        </Window>

        <Parties players={guild.concat(united)} user={user} />   
       
      </div>

    </div>
  );
}

export default App;
