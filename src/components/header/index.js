/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './header.scss';

export default function Header() {

  useEffect(() => {


  });
  return (

    <header>

      <h1 className="site-logo" aria-label='homepage'>Socializers</h1>

      <nav className="main-nav">
        <ul className="nav__list">
          <li class="nav__list-item"><Link to="/" className="nav__link">Home</Link></li>
          <li className="nav__list-item"><a href="#" className="nav__link">About</a></li>
          <li className="nav__list-item"><Link to="/app" className="nav__link">Dashboard</Link></li>
          <li className="nav__list-item"><Link to="/form" className="nav__link">Form</Link></li>
        </ul>
      </nav>

      <nav className='account'>
        <ul className="nav__list-account">
          <li className="nav__list-item"><Link className="nav__link nav__link--btn" to="/login">Signin</Link></li>
          <li className="nav__list-item"><Link className="nav__link nav__link--btn nav__link--btn--highlight" to="/signup">Signup</Link></li>
        </ul>
      </nav>

    </header>

  );
}