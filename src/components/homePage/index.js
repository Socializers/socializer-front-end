/* eslint-disable no-unused-vars */

import React from 'react';
import { Link } from 'react-router-dom';

import './home.scss';

class Home extends React.Component {

  componentDidMount(){
    
    const faders = document.querySelectorAll('.fade-in');
    const slider2 = document.querySelectorAll('.slide-in-2');
    const sliders3 = document.querySelectorAll('.slide-in-3');

    const appearOptions2 = {
      threshold: 0,
      rootMargin: '0px 0px -50px 0px',
    };

    const appearOptions3 = {
      threshold: 0,
      rootMargin: '0px 0px -250px 0px',
    };
    
    const appearOnScroll2 = new IntersectionObserver((entries, appearOnScroll) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add('appear');
          appearOnScroll.unobserve(entry.target);
        }
      });
    }, appearOptions2);

    const appearOnScroll3 = new IntersectionObserver((entries, appearOnScroll) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add('appear');
          appearOnScroll.unobserve(entry.target);
        }
      });
    }, appearOptions3);

    faders.forEach(fader => {
      appearOnScroll3.observe(fader);
    });
    
    slider2.forEach(slider => {
      appearOnScroll2.observe(slider);
    });

    sliders3.forEach(slider => {
      appearOnScroll3.observe(slider);
    });

  }

  render(){

    return(
      <>
        <section className='first-section'>
          <div className='main-content'>
            <img src={require('../images/homepage/logo.png')} />
            <h2>Are you Looking for investing in yourself In A Fun Way?</h2>
            <p>Join our vibrant community to experience a combination of knowledge and pure enjoyment of that is different from your usual boring routine</p>
            <p>Join up today by clicking the <strong>button</strong> below!</p>
            <Link to="/app"><button>Click Here to Get Started</button></Link>
          </div>
          <div className='white'></div>
          <img className='main-image' src={require('../images/homepage/1.jpg')} />
        </section>

        <section className='second-section fade-in'>
          <h2>Welcome to Social Club Family</h2>
          <h6>Here's why our members love our club</h6>
          <div className='container'>
            <div className='first-card slide-in-2 from-top'>
              <img src={require('../images/homepage/icon1.png')} />
              <h3>knowledge Filled With Enjoyment</h3>
              <p>This is how you are going to learn new things in your life but NOT in a boring way. In pur club, we make sure to makes joyment while you learn anything.</p>
            </div>
            <div className='second-card slide-in-2 from-bottom'>
              <img src={require('../images/homepage/icon2.png')} />
              <h3>Lifetime Access</h3>
              <p>By signing up in our club, you will be a permenant which means you can access the content and see your edits whenever you want and at the comfort of your home.</p>
            </div>
            <div className='third-card slide-in-2 from-top'>
              <img src={require('../images/homepage/icon3.png')} />
              <h3>Meeting Online</h3>
              <p>Sometimes you have such a great skill that you want to share with someone who you want to learn something from and to make this super smooth you can now meet each other online with a click of button.</p>
            </div>
          </div>
        </section>

        <section className='third-section fade-in'>
          <div className='first-card'>
            <div className='slide-in-3 from-left'>
              <h2>Section 1</h2>
              <h3>Web Development</h3>
              <hr />
              <p>Users will be able to watch many courses online for some of the web developers in the world. These courses are here to help the people in our local communities to have new set of skills in their lives.</p>
            </div>
            <span className='slide-in-3 from-right'><img src={require('../images/homepage/developer.jpg')} /></span>
          </div>
          <div className='second-card'>
            <div className='slide-in-3 from-right'>
              <h2>Section 2</h2>
              <h3>Science</h3>
              <hr />
              <p>being able to calculate things quickly and understand some of the major topics in physics, calculus and chemistry would defeintily help you out to pass these materials in the university.</p>
            </div>
            <span className='slide-in-3 from-left'><img src={require('../images/homepage/science.jpg')} /></span>
          </div>
          <div className='third-card'>
            <div className='slide-in-3 from-left'>
              <h2>Section 3</h2>
              <h3>Languages</h3>
              <hr />
              <p>Learning new languages means a new birth and it is also considered to be a crucial skills that can make you special in the workfield. You will learn new languages in our App such as English and Arabic, etc.</p>
            </div>
            <span className='slide-in-3 from-right'><img src={require('../images/homepage/languages.jpg')} /></span>
          </div>
          <div className='fourth-card'>
            <div className='slide-in-3 from-right'>
              <h2>Section 4</h2>
              <h3>Anime</h3>
              <hr />
              <p>Users will be able to create, read, update and delete any Anime series the want from their list.</p>
            </div>
            <span className='slide-in-3 from-left'><img src={require('../images/homepage/anime.jpg')} /></span>
          </div>
        </section>
      </>
    );
  }
}


export default Home;