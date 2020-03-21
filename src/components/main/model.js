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
  return (
    <>
      <form onSubmit={submitHandler}>
        <input onChange={e => context.changeModel(e.target.value)} />
        {console.log(context.model)}
      </form>
      <Link to='/form'>Go!</Link>
    </>
  );
}

export default Model;