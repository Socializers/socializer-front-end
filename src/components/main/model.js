/* eslint-disable no-unused-vars */

import React, { useContext, useEffect, useState } from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import $ from 'jquery';

import { ModelContext } from '../../context/modal.js';
import useFetch from '../hooks/useFetch.js';
import FileUpload from '../fileUpload';
import './model.scss';

function Model(props) {
  const context = useContext(ModelContext);
  const [modelList, setModelList] = useState([]);
  useFetch('http://localhost:3030/api/v1/general', {}, setModelList);


  useEffect(() => {

    console.log('blabal', modelList);

    const header = document.querySelector('header');
    const sectionOne = document.querySelector('.zero-section-model');

    const sectionOneOptions = {
      rootMargin: '-70px 0px 0px 0px',
    };

    const sectionOneObserver = new IntersectionObserver(function (
      entries,
      sectionOneObserver,
    ) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          header.classList.add('nav-scrolled');
        } else {
          header.classList.remove('nav-scrolled');
        }
      });
    }, sectionOneOptions);

    sectionOneObserver.observe(sectionOne);

  });

  const submitHandler = e => {
    e.preventDefault();
    e.target.reset();
    return <Redirect to='/form' />;
  };

  const callAPI = (url, method = 'get', body, handler, errorHandler) => {
    return fetch(url, {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: body ? JSON.stringify(body) : undefined,
    })
      .then(response => response.json())
      .then(data => typeof handler === 'function' ? handler(data) : null)
      .catch(e => typeof errorHandler === 'function' ? errorHandler(e) : console.error(e));
  };

  const createModel = (name, des, img_url) => {

    console.log('name', name);
    console.log('des', des);

    fetch('http://localhost:3030/schemas', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ model: name }),
    });

    const _updateState = newItem =>
      setModelList([...modelList, newItem]);

    callAPI(`http://localhost:3030/api/v1/general`, 'POST', { name, des, img_url }, _updateState);


  };

  return (
    <>
      <section className='zero-section-model'></section>
      <section className='first-section-model wow fadeIn'>
        <h2>Welcome To Social Club</h2>
        <p>Make sure to pick what you want either to learn or to entertain yourself</p>
        <hr />
      </section>

      <section className='second-section-model'>
        {modelList.map(model => (
          <div className='card wow zoomIn' onClick={() => context.changeModelName(model.name)}>
            <Link to='/form'>
              <div>
                <div>
                  <h3>{model.name}</h3>
                  <p>{model.des}</p>
                </div>
                <div className='image'><img alt={model.name} src={model.img_url} /></div>
              </div>
            </Link>
          </div>
        ))}

      </section>

      <section className='third-section-model'>
        {/* <div className='fade-in'> */}
        <p className='wow fadeIn'>In case you want to add any section that you think it is valuable to our club just give it a name and hit the button below</p>

        <form className='wow fadeIn' onSubmit={() => createModel(context.modelName, context.modelDesc, context.modelImg)}>
          {/* <form> */}
          <input id="input-1" type="text" placeholder="Web Development" required autofocus onChange={e => context.changeModelName(e.target.value)} />
          <label for="input-1">
            <span className="label-text">Model Name</span>
            <span className="nav-dot"></span>
            <div className="signup-button-trigger">add any section</div>
          </label>
          <input id="input-2" type="text" required placeholder='http://www.awesome_Image.com ' onChange={e => context.changeModelImg(e.target.value)} />
          <label for="input-2">
            <span className="label-text">Image URL</span>
            <span className="nav-dot"></span>
          </label>
          <input id='input-3' placeholder='Here you can learn both fron-end & back-end' required onChange={e => context.changeModelDesc(e.target.value)} />
          <label for="input-3">
            <span className="label-text">Description</span>
            <span className="nav-dot"></span>
          </label>
          <button type="submit">Create Model</button>
          <p className="tip">Press Tab</p>
          <div className="signup-button">Add New Section</div>
        </form>

        {/* <form className='model-form' onSubmit={() => createModel(context.modelName, context.modelDesc, context.modelImg)}>
            <div>
              <input placeholder='Your Model Name' required onChange={e => context.changeModelName(e.target.value)} />
              <input id="input-2" type="text" required placeholder='Your Model Pic' onChange={e => context.changeModelImg(e.target.value)} />
              <textarea id='input-3' placeholder='Please fill this with a brief desription about the model that you wanna create' required onChange={e => context.changeModelDesc(e.target.value)} />
            </div>
            <FileUpload />
            <button> Create Model </button>
          </form> */}
        {/* </div> */}
      </section>
    </>
  );
}

export default Model;