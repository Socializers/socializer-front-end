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
            <Link to="/"><li> Home </li></Link>
            <Link to="/app"><li> Check App</li></Link>
            <Link to="/form"><li>Form</li></Link>
            <span>
              <Link to="/login"><li> Signin </li></Link>
              <Link to="/signup"><li> Signup </li></Link>
            </span>
          </ul>
        </nav>
      </header>
    </>
  );
}