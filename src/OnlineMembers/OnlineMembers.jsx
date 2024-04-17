import React from 'react';
import './style.css';
import Window from '../Window/Window';
import GuildMember from '../GuildMember/GuildMember';

const OnlineMembers = ({ members }) => {
 
  const onlineMembers = () => {
    return members?.filter(member => member.status === "online")
  }

  const onlineMembersByLevel = () => {
    return onlineMembers()?.sort((a, b) => {return b.level - a.level})
  }

  function sharingMinLevel (level) {
    return Math.trunc(level - (level/3))
  }

  function sharingMaxLevel (level) {
    return Math.trunc(level + (level/2))
  }

  return (
    <Window title={'Membros Online'} isOpen={true} >
      {members.length === 0 && 'carregando...'}
      {onlineMembersByLevel()?.map(member => {
        return (
          <div className='onlineMember' key={member.name} >
            <GuildMember member={member} />    
            <img src={'sharedMember.gif'} alt='sharing' height='11px' width='11px' className='sharingIcon' />
            <span>{sharingMinLevel(member.level) +'-'+ sharingMaxLevel(member.level)}</span>        
          </div>
        )
      })}
    </Window>
  )

}

export default OnlineMembers