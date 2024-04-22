import Constants from '../../Constants';
import './style.css';

const Header = ({lsUserKey, user}) => {
 
  const shareParties = () => {
    fetch(Constants.API_URL + '/parties/share')
      .then(response => response.text())
      .then(data => {
        navigator.clipboard.writeText(data)
    });
  }

  return (
    <>
    <div className='user'>
      {lsUserKey+'.'+ (user?.id||'?') + (user.logout ? '.ADM' : '')}
    </div>
    <div className='header'>
      <div className='rules'>
        {user.logout && <img src={'secretInstruction.gif'} title="Regras/Infos" />}
      </div>
      <div>
        <img src={'logoNname.webp'} className="logo" alt='logo' />
      </div>
      <div className='rules'>
        {user.logout && <img src={'letter.gif'} onClick={shareParties} title="Copiar eventos" />}
      </div>
    </div>
    </>
  );
}

export default Header;