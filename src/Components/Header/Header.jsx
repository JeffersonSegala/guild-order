import './style.css';

const Header = ({userKey}) => {
 
  return (
    <>
    <div className='user'>
      {userKey}
    </div>
    <div className='header'>
      <img src={'logoNname.webp'} className="logo" alt='logo' />
    </div>
    </>
  );
}

export default Header;
