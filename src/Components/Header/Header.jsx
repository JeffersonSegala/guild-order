import './style.css';

const Header = ({user}) => {
 
  return (
    <>
    <div className='user'>
      {user.userKey}
    </div>
    <div className='header'>
      <img src={'logoNname.webp'} className="logo" alt='logo' />
    </div>
    </>
  );
}

export default Header;
