/* eslint-disable no-unused-vars */

import React, { useContext, useEffect, useState } from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import $ from 'jquery';

import { ModelContext } from '../../context/modal.js';
import FileUpload from '../fileUpload';
import './model.scss';

function Model(props) {
  const context = useContext(ModelContext);

  useEffect(() => {

    const header = document.querySelector('header');
    const sectionOne = document.querySelector('.zero-section-model');

    const sectionOneOptions = {
      rootMargin: '-70px 0px 0px 0px',
    };

    const sectionOneObserver = new IntersectionObserver(function(
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
    },
    sectionOneOptions);
    
    sectionOneObserver.observe(sectionOne);

    const faders = document.querySelectorAll('.fade-in');
    const slider = document.querySelectorAll('.slide-in');

    const appearOptions = {
      threshold: 0,
      rootMargin: '0px 0px -200px 0px',
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

    faders.forEach(fader => {
      appearOnScroll.observe(fader);
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

  const createCard = () => {
    console.log('here', context.modelName);
    $('.second-section-model').append(`
      <div class='card slide-in from-left'>
        <a href='/form'>
          <div>
            <div>
              <h3>${context.modelName}</h3>
              <p>${context.modelDesc}</p>
            </div>
${ context.uploadedFile.fileName !== undefined ? 
    ( `<div class='image'><img alt=${context.uploadedFile.fileName} src=${require(`../images/uploads/${context.uploadedFile.fileName}`)} /></div>` ) 
    : `<div class='image'><img alt='null' src=${require('../images/null.jpg')} /></div>`
}
            </div>
        </a>
      </div>`,
    );
    // $('.card a > div:first-of-type').attr('class', 'value');
    $('.card a > div:first-of-type').on('click', () => context.changeModelName(context.modelName));
  };
  
  return (
    <>
      <section className='zero-section-model'></section>
      <section className='first-section-model'>
        <h2>Welcome To Social Club</h2>
        <p>Make sure to pick what you want either to learn or to entertain yourself</p>
        <hr />
      </section>

      <section className='second-section-model'>
        <div className='card slide-in from-left'>
          <Link to='/form'>
            <div onClick={()=> context.changeModelName('developers')}>
              <div>
                <h3>Web Development</h3>
                <p>A whole section about web development and how to become a professional softwaere engineer by watching our courses in this field.</p>
              </div>
              <div className='image'><img alt='development' src={require('../images/homepage/developer.jpg')} /></div>
            </div>
          </Link>
        </div>

        <div className='card slide-in from-left'>
          <Link to='/form'>
            <div onClick={()=> context.changeModelName('science')}>
              <div>
                <h3>Science</h3>
                <p>Learn new languages like English and Arabic</p>
              </div>
              <div className='image'><img alt='science' src={require('../images/homepage/science.jpg')} /></div>
            </div>
          </Link>
        </div>

        <div className='card slide-in from-left'>
          <Link to='/form'>
            <div onClick={()=> context.changeModelName('languages')}>
              <div>
                <h3>Languages</h3>
                <p>Learn new languages like English and Arabic.</p>
              </div>
              <div className='image'><img alt='languages' src={require('../images/homepage/languages.jpg')} /></div>
            </div>
          </Link>
        </div>
        
        <div className='card slide-in from-left'>
          <Link to='/form'>
            <div onClick={()=> context.changeModelName('anime')}>
              <div>
                <h3>Anime</h3>
                <p>Watch animes in way that will entertain you.</p>
              </div>
              <div className='image'><img alt='anime' src={require('../images/homepage/anime.jpg')} /></div>
            </div>
          </Link>
        </div>
      </section>

      <section className='third-section-model'>
        <div className='fade-in'>
          <h4>In case you want to add any section that you think it is valuable to our club just give it a name and hit the button below</h4>
          <form className='model-form' onSubmit={submitHandler}>
            <div>
              <input placeholder='Your Model Name' required onChange={e => context.changeModelName(e.target.value)} />
              <textarea placeholder='Please fill this with a brief desription about the model that you wanna create' required onChange={e => context.changeModelDesc(e.target.value)} />
            </div>
            <FileUpload />
            <button onClick={()=> {
              callAPI(context.modelName);
              createCard();
            // window.location.href='/form';
            }} type='button'> Create Model </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Model;