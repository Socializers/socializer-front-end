/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './header.scss';

export default function Header() {
  return(
    <>
      <header>
        <img src={require('../images/logo.png')} />
        <nav>
          <ul>
            <li><Link to="/"> Home </Link></li>
            <li><Link to="/app"> Check App </Link></li>
            <li><Link to="/form"> Form </Link></li>
            <span>
              <Link to="/login"><li> Login </li></Link>
              <Link to="/signup"><li> Signup </li></Link>
            </span>
          </ul>
        </nav>
      </header>
    </>
  );
}