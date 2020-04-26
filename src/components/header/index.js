/* eslint-disable no-unused-vars */
import React, { useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LoginContext } from '../auth/context.js';
import $ from 'jquery';

import './header.scss';

const If = props => {
  return props.condition ? props.children : null;
};

export default function Header() {
  const context = useContext(LoginContext);
  useEffect(()=> {

    $('.dropbtn').click(function (e) { 
      e.preventDefault();
      $('.dropdown-content-container').toggle(500);
    });
  });
  
  return (

    <header>

      <h1 className="site-logo" aria-label='homepage'>Socializers</h1>

      <nav className="main-nav">
        <ul className="nav__list">
          <li className="nav__list-item"><Link to="/" className="nav__link">Home</Link></li>
          <li className="nav__list-item"><a href="#" className="nav__link">About</a></li>
          <li className="nav__list-item"><Link to="/app" className="nav__link">Dashboard</Link></li>
          <li className="nav__list-item"><Link to="/form" className="nav__link">Form</Link></li>
        </ul>
      </nav>

      <nav className='account'>
        <If condition={!context.loggedIn}>
          <ul className="nav__list-account">
            <li className="nav__list-item"><Link className="nav__link nav__link--btn" to="/login">Signin</Link></li>
            <li className="nav__list-item"><Link className="nav__link nav__link--btn nav__link--btn--highlight" to="/signup">Signup</Link></li>
          </ul>
        </If>
        <If condition={context.loggedIn}>
          {/* <div className="dropdown">
            <button className="dropbtn">{context.user.username}</button>
            <div className="dropdown-content">
              <a href="#">Profile</a>
              <a href="#contact">Logout!</a>
            </div>
          </div> */}
          <div className="dropdown">
            <button className="dropbtn"><p>{context.user.username}</p></button>
            <div className='dropdown-content-container'>
              <div className="dropdown-content">
                <Link to='/'>Profile</Link>
                <Link onClick={context.logout} to='/'>Logout!</Link>
              </div>
            </div>
          </div>
        </If>
      </nav>

    </header>

  );
}