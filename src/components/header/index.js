/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return(
    <>
      <h1>
            SOCIALIZER
      </h1>
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/app"> Check App </Link>
        <Link to="/form"> Form </Link>
        <Link to="/login"> Signup </Link>
      </nav>
    </>
  );
}