import './style.css';

const Header = ({lsUserKey, user}) => {
 
  return (
    <>
    <div className='user'>
      {lsUserKey+'.'+ (user?.id||'?') + (user.logout ? '.ADM' : '')}
    </div>
    <div className='header'>
      <img src={'logoNname.webp'} className="logo" alt='logo' />
    </div>
    </>
  );
}

export default Header;