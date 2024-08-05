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

        <Window title={'Eventos'} isOpen={true} >
          <div>
            Final GT (250+)
            <div>&nbsp;<span>Toda semana alternado entre uma semana na quarta-feira às 19h, e na outra semana quinta-feira às 21h</span></div>
            <div>&nbsp;<span>Concentração na GH para garantir vaga na alavanca (vagas da lista são cedidas para quem estiver presente caso não compareça faltando 5 minutos)</span></div>
            
            <br />
            Final Ferumbras (250+)
            <div>&nbsp;<span>Após a GT Final da quarta-feira (ainda não temos gente suficiente pra confirmar o time de quinta-feira)</span></div>

            <br />
            Warzones 456
            <div>&nbsp;<span>{`Domingos às 11h > 15h > 18h`}</span></div>

            <br />
            Observações
            <div>&nbsp;<span>{`Listas lançadas ao meio dia do dia anterior ao evento`}</span></div>
          </div>
        </Window>
      
      </div>

    </div>
  );
}

export default App;
