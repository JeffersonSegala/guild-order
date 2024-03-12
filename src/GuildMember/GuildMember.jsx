import React from 'react';
import './style.css';

const GuildMember = ({ member }) => {
 
  const charTibiaLink = (name) => {
    return `https://www.tibia.com/community/?name=${name}`
  }

  function extrairIniciais(frase) {
      const palavras = frase.split(" ");
      let iniciais = "";
      for (let i = 0; i < palavras.length; i++) {
          iniciais += palavras[i].charAt(0);
      }
      return iniciais;
  }

  return (
    
    <div className={`member ${member.status === "online" ? 'online' : 'offline'}`} key={member.name} >
      <a href={charTibiaLink(member.name)} target='_blank' rel='noreferrer'>
      <img src={member.vocation+'.png'} className="vocationImage" alt={extrairIniciais(member.vocation)} /> 
      {' ' + member.name + ' (' + member.level + ')'}
      </a>
    </div>
  )

}

export default GuildMember