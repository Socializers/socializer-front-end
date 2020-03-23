/* eslint-disable no-unused-vars */
import React from 'react';
import { Route } from 'react-router-dom';

import Header from './header';
import Home from './homePage/';
import ModelProvider from '../context/modal.js';
import Model from './main/model.js';
import Form from './main/form.js';
import LoginContext from './auth/context.js';
import Login from './auth/login.js';
import Signup from './auth/signup.js';
// import Auth from './auth/auth.js';
import Footer from './footer';

// import './app.scss';

export default function App() {
  return(
    <>
      <ModelProvider>
        <Header />
        <Route exact path='/' render={()=>< Home/>} />
        <Route exact path='/form' render={()=><Form /> }></Route>
        <LoginContext>
          <Route exact path='/login' render={() => 
            <Login />
          }></Route>
          <Route exact path='/signup' render={() => 
            <Signup />
          }></Route>
        </LoginContext> 
        <Route exact path='/app' render={() => <Model />}></Route>
        <Footer />
      </ModelProvider>
    </>
  );
}