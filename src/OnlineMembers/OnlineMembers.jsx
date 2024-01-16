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

  return (
    <Window title={'Membros Online'} >
      {onlineMembersByLevel()?.map(member => {
        return (
          <GuildMember member={member} />        
        )
      })}
    </Window>
  )

}

export default OnlineMembers