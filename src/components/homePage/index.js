/* eslint-disable no-unused-vars */

import React from 'react';
import { Link } from 'react-router-dom';

import './home.scss';

function Home(props) {
  return(
    <>
      <img className='main-image' src={require('../images/1.jpg')} />
      <div className='main-content'>
        <img src={require('../images/logo.png')} />
        <h2>Are you Looking for investing in yourself In A Fun Way?</h2>
        <p>Join our vibrant community to experience a combination of knowledge and pure enjoyment of that is different from your usual boring routine</p>
        <p>Join up today by clicking the <strong>button</strong> below!</p>
        <Link to="/app"><button>Click Here to Get Started</button></Link>
      </div>
    </>
  );
}


export default Home;