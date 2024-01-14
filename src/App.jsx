import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [guild, setGuild] = useState(false);

  useEffect(() => {
    fetch('https://dev.tibiadata.com/v3/guild/order')
      .then(response => response.json())
      .then(data => {
        console.log('response', data)
        setGuild(data.guilds.guild)
      });
  }, []);
  
  const charTibiaLink = (name) => {
    return `https://www.tibia.com/community/?name=${name}`
  }

  return (
    <div className="App">
      
      <div className='header'>
        <img src={'logoNname.png'} className="logo" alt='logo' />
      </div>

      <div className="flex-container">
        <div className="simpleWindow" >
          <span>Online Members</span>

          {guild?.members?.filter(member => member.status === "online").sort((a, b) => {return b.level - a.level}).map((member, index) => {
            return (
              
                <div key={member.name} className='member' >
                  <a href={charTibiaLink(member.name)} target='_blank' rel='noreferrer'>
                  <img src={member.vocation+'.png'} className="vocationImage" alt="voc" /> 
                  {' ' + member.name + ' ('+member.level+')'}
                  </a>
                </div>
              
            )
          })}

        </div>

        <div className="simpleWindow" >
          <span>GT</span>
          <div key={1} className='member'>
                  <img src={'Elite Knight.png'} className="vocationImage" alt="voc" /> 
                  {' ab'}
                </div>
        </div>

        <div className="simpleWindow" >
          <span>Portais de Thais</span>
          <div key={1} className='member'>
            <img src={'Elite Knight.png'} className="vocationImage" alt="voc" /> 
            {' Bepe Ferobra'}
          </div>
          <div key={1} className='member'>
            <img src={'Elite Knight.png'} className="vocationImage" alt="voc" /> 
            {' Bepe Ferobra'}
          </div>
        </div>
       
      </div>

    </div>
  );
}

export default App;
