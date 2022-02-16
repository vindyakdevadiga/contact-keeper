import React,{useContext,Fragment} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

const Navbar = ({title,icon}) => {
    const authContext=useContext(AuthContext);
    const contactContext=useContext(ContactContext);

    const {isAuthenticated,logoutUser,user}=authContext;
    const {clearContact} = contactContext;
    const onLogout =() =>{
        logoutUser();
        clearContact();
    };

    const authLinks = (
        <Fragment>
        <li>Hello{user && user.name}</li>
        <li>
            <a onClick={onLogout} href='/login'>
                <i className='fas fa-sign-out-alt'/>{' '}
                <span className='hide-sm'>Logout</span>
            </a>
        </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/about">about</Link>
          </li>
        </Fragment>
      );

    return (
        <nav className="navbar bg-primary">
            <h1>
                <i className={icon}/>{title}
            </h1>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}
                {/* <li>
                    <Link to='/'>Home</Link>
                </li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/register'>Register</Link></li>
                <li><Link to='/login'>Login</Link></li> */}
            </ul>
        </nav>
    )
}

Navbar.prototypes={
    title:PropTypes.string.isRequired,
    icon:PropTypes.string
}

Navbar.defaultProps={
    title :'Contact Keeper',
    icon:'fas fa-id-card-alt'
}

export default Navbar
