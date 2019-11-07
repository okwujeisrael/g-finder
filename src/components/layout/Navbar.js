import React from 'react'; 
import PropTypes from 'prop-types'; //shortcut impt + ENTER
import { Link } from 'react-router-dom';



const Navbar = ({icon, title}) => {
  
    return (
      <nav className= 'navbar bg-primary'>
        <h1> 
          <i className = {icon} /> {title}
        </h1>
        <ul>
          <li>
            <Link to= "/">Home</Link>
          </li>
          <li>
            <Link to = "/about">About</Link>
          </li>
        </ul>
      </nav>
    );
};

//static default props can be overriden by the parent class
Navbar.defaultProps = {
  title: 'Github Finder',
  icon:'fab fa-github'
};

//Used to determine the type of data, type checking
Navbar.propTypes = {
  title:PropTypes.string.isRequired,
  icon:PropTypes.string.isRequired
};


export default Navbar
