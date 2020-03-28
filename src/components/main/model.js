/* eslint-disable no-unused-vars */

import React, { useContext, useEffect } from 'react';
import { ModelContext } from '../../context/modal.js';
import { Route, Redirect, Link } from 'react-router-dom';
import Form from './form.js';
import './model.scss';

function Model(props) {
  const context = useContext(ModelContext);

  useEffect(() => {
    const slider = document.querySelectorAll('.slide-in');

    const appearOptions = {
      threshold: 0,
      rootMargin: '0px 0px -50px 0px',
    };

    const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add('appear');
          appearOnScroll.unobserve(entry.target);
        }
      });
    }, appearOptions);

    slider.forEach(slider => {
      appearOnScroll.observe(slider);
    });

  });
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
      <section className='first-section-model'>
        <h2>Welcome To Social Club</h2>
        <p>Make sure to pick what you want either to learn or to entertain yourself</p>
        <hr />
      </section>

      <section className='second-section-model'>
        <div className='first-card slide-in from-left'>
          <div>
            <div>
              <h3>Web Development</h3>
              <p>A whole section about web development and how to become a professional softwaere engineer by watching our courses in this field.</p>
            </div>
            <img src={require('../images/homepage/developer.jpg')} />
          </div>
        </div>
        <div className='second-card slide-in from-left'>
          <div>
            <div>
              <h3>Science</h3>
              <p>Learn new languages like English and Arabic</p>
            </div>
            <img src={require('../images/homepage/science.jpg')} />
          </div>
        </div>
        <div className='third-card slide-in from-left'>
          <div>
            <div>
              <h3>Languages</h3>
              <p>Learn new languages like English and Arabic.</p>
            </div>
            <img src={require('../images/homepage/languages.jpg')} />
          </div>
        </div>
        <div className='fourth-card slide-in from-left'>
          <div>
            <div>
              <h3>Anime</h3>
              <p>Watch animes in way that will entertain you.</p>
            </div>
            <img src={require('../images/homepage/anime.jpg')} />
          </div>
        </div>
      </section>

      <section className='third-section-model'>
        <form onSubmit={submitHandler}>
          <input onChange={e => context.changeModel(e.target.value)} />
          {console.log(context.model)}
          <button onClick={()=> callAPI(context.model)} type='button'>Create Model</button>
        </form>
        <Link to='/form'>Go!</Link>
      </section>
    </>
  );
}

export default Model;