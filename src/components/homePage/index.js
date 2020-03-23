/* eslint-disable no-unused-vars */

import React from 'react';

import './home.scss';

function Home(props) {
  return(
    <>
      <img className='main-image' src={require('../images/1.jpg')} />
      <div className='main-content'>
        <img src={require('../images/logo.png')} />
        <h2>Are you Looking for Investion in yourself In A Fun Way?</h2>
        <p>Join our vibrant community to experience a combination of knowledge and pure enjoyment of that is different from your usual boring routine</p>
        <p>Join up today by clicking the <strong>button</strong> below!</p>
        <button>Click Here to Get Started</button>
      </div>
    </>
  );
}


export default Home;