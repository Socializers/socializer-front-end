/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './header.scss';

export default function Header() {

  useEffect(()=>{


  });
  return(
    <>
      <header>
        
        <h1>Socializers</h1>

        <nav className='main'>
          <ul>
            <Link to="/"><li> Home </li></Link>
            <Link to="/app"><li> Check App</li></Link>
            <Link to="/form"><li>Form</li></Link>
          </ul>
        </nav>

        <nav className='account'>
          <ul>
            <Link to="/login"><li> Signin </li></Link>
            <Link to="/signup"><li> Signup </li></Link>
          </ul>
        </nav>

      </header>
    </>
  );
}