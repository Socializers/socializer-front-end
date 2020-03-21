/* eslint-disable no-unused-vars */
import React from 'react';
import { Route } from 'react-router-dom';

import Header from './header';
import ModelProvider from '../context/modal.js';
import Model from './main/model.js';
import Form from './main/form.js';
import LoginContext from './auth/context.js';
import Login from './auth/login.js';
import Auth from './auth/auth.js';
import Footer from './footer';


export default function App() {
  return(
    <>
      <ModelProvider>
        <Header />
        <Route exact path='/form' render={()=><Form /> }></Route>
        <Route exact path='/login' render={() => 
          <LoginContext>
            <Login />
            {/* <Edit />
          <Delete /> */}
          </LoginContext>
        }></Route>
        <Route exact path='/app' render={() => <Model />}></Route>
        <Footer />
      </ModelProvider>
    </>
  );
}