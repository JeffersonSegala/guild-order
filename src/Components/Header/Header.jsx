import './style.css';

const Header = ({lsUserKey}) => {
 
  return (
    <>
    <div className='user'>
      {lsUserKey}
    </div>
    <div className='header'>
      <img src={'logoNname.webp'} className="logo" alt='logo' />
    </div>
    </>
  );
}

export default Header;
