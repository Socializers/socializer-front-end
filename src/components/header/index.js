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
            <li><Link to="/"> Home </Link></li>
            <li><Link to="/app"> Dashboard</Link></li>
            <li><Link to="/form"> Form </Link></li>
          </ul>
        </nav>

        <nav className='account'>
          <ul>
            <li><Link to="/login">Signin</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </ul>
        </nav>

      </header>
    </>
  );
}