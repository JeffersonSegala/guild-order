import React from 'react';
import './style.css';

const GuildMember = ({ member }) => {
 
  const charTibiaLink = (name) => {
    return `https://www.tibia.com/community/?name=${name}`
  }

  return (
    <div className={`member ${member.status === "online" ? 'online' : 'offline'}`} key={member.name} >
      <a href={charTibiaLink(member.name)} target='_blank' rel='noreferrer'>
      <img src={member.vocation+'.png'} className="vocationImage" alt="voc" /> 
      {' ' + member.name + ' (' + member.level + ')'}
      </a>
    </div>
  )

}

export default GuildMember