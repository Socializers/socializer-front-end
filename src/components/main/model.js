/* eslint-disable no-unused-vars */

import React, { useContext } from 'react';
import { ModelContext } from '../../context/modal.js';
import { Route, Redirect, Link } from 'react-router-dom';
import Form from './form.js';

function Model(props) {
  const context = useContext(ModelContext);

  const submitHandler = e => {
    e.preventDefault();
    e.target.reset();
    return <Redirect to='/form'/>;
  };

  const callAPI = (modelName) => {
    return fetch('http://localhost:3030/schemas', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({model: modelName}),
    });
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <input onChange={e => context.changeModel(e.target.value)} />
        {console.log(context.model)}
        <button onClick={()=> callAPI(context.model)} type='button'>Create Model</button>
      </form>
      <Link to='/form'>Go!</Link>
    </>
  );
}

export default Model;