import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({setAppState, isAuthenticated}) {

  const onClick = () => {
    localStorage.removeItem("token")
    setAppState((prevState) => ({
      ...prevState,
      isAuthenticated: false,
    }));

    

  }
  if (isAuthenticated) {
  
    return (
      <nav className="Navbar">
        <div className="navbar-container">
          <Link to="/Exercise" className="navbar-link"><img src="../src/assets/codepath.svg" className='nav-img'/></Link>
          <Link to="/Activity" className="navbar-link"><h1 className='nav-text'>Activity</h1></Link>
          <Link to="/Exercise" className="navbar-link"><h1 className='nav-text'>Excercise</h1></Link>
          <Link to="/Nutrition" className="navbar-link"><h1 className='nav-text'>Nutrition</h1></Link>
          <Link to="/Sleep" className="navbar-link"><h1 className='nav-text'>Sleep</h1></Link>
          <Link to="/" className="navbar-link"><button className='nav-button1' onClick={onClick}><strong>Sign Out</strong></button></Link>
  
        </div>
      </nav>
    );
  } else {
  return (
    <nav className="Navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-link"><img src="../src/assets/codepath.svg" className='nav-img'/></Link>
        <Link to="/Activity" className="navbar-link"><h1 className='nav-text'>Activity</h1></Link>
        <Link to="/Exercise" className="navbar-link"><h1 className='nav-text'>Excercise</h1></Link>
        <Link to="/Nutrition" className="navbar-link"><h1 className='nav-text'>Nutrition</h1></Link>
        <Link to="/Sleep" className="navbar-link"><h1 className='nav-text'>Sleep</h1></Link>
        <Link to="/Login" className="navbar-link"><button className='nav-button1'><strong>Sign In</strong></button></Link>
        <Link to="/Register" className="navbar-link"><button className='nav-button2'><strong>Register</strong></button></Link>

      </div>
    </nav>
  );
}
}
