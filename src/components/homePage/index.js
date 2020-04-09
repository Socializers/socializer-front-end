/* eslint-disable no-unused-vars */

import React from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'swiper';

import './home.scss';

import developrs from '../images/homepage/developers.jpg';
import anime from '../images/homepage/anime.png';
import languages from '../images/homepage/language.jpg';
import science from '../images/homepage/science.jpg';

class Home extends React.Component {

  componentDidMount() {

    // Params
    let sliderSelector = document.querySelector('.swiper-container'),
      options = {
        init: false,
        loop: true,
        speed: 800,
        slidesPerView: 2, // or 'auto'
        // spaceBetween: 10,
        centeredSlides: true,
        effect: 'coverflow', // 'cube', 'fade', 'coverflow',
        coverflowEffect: {
          rotate: 50, // Slide rotate in degrees
          stretch: 0, // Stretch space between slides (in px)
          depth: 100, // Depth offset in px (slides translate in Z axis)
          modifier: 1, // Effect multipler
          slideShadows: true, // Enables slides shadows
        },
        grabCursor: true,
        parallax: true,
        pagination: {
          el: document.querySelector('.swiper-pagination'),
          clickable: true,
        },
        navigation: {
          nextEl: document.querySelector('.swiper-button-next'),
          prevEl: document.querySelector('.swiper-button-prev'),
        },
        breakpoints: {
          1023: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
        },
        // Events
        on: {
          imagesReady: function () {
            this.el.classList.remove('loading');
          },
        },
      };
    var mySwiper = new Swiper(sliderSelector, options);

    // Initialize slider
    mySwiper.init();

    const header = document.querySelector('header');
    const sectionOne = document.querySelector('.zero-section');

    const sectionOneOptions = {
      rootMargin: '-100px 0px 0px 0px',
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

  }

  render() {

    return (
      <>
        <section className='zero-section'>
          <div>
            <img src={require('../images/homepage/slide-1.jpg')} />
            <h2 className='animated fadeInDown delay-0.5s'>Are you Looking for investing in yourself In A Fun Way?</h2>
            <p className='animated fadeInUp delay-1s'>Join our vibrant community to experience a combination of knowledge and pure enjoyment of that is different from your usual boring routine</p>
            <Link className='animated fadeIn delay-2s' to="/app"><button>Let's Get Started</button></Link>
          </div>
        </section>

        <section className='first-section'>
          <div className='main-content wow zoomIn'>
            <h2>Who Are We? Meet Some Socilazers...</h2>
            <p>bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla </p>
            <p>Join up today by clicking the <strong>button</strong> below!</p>
          </div>
          <div className='white'></div>
          <video autoPlay loop className='main-video' src={require('../images/vid.mp4')} />
        </section>

        < section className='fourth-section' >
          <h2>A Word From The Team</h2>
          <p>We hope that our app will drive the benefits to every single member in our society.</p>
          <p>With that being said, our message is to let our community educated and filled with many skills that will help them to face the life.</p>
        </section >

        <section className='second-section'>
          <h2 className='wow fadeIn'>Welcome to Social Club Family</h2>
          <h6 className='wow fadeIn'>Here's why our members love our club</h6>
          <div className='container'>
            <div className='card wow fadeInLeft'>
              <img src={require('../images/homepage/icon1.png')} />
              <h3>knowledge Filled With Enjoyment</h3>
              <p>This is how you are going to learn new things in your life but NOT in a boring way. In pur club, we make sure to makes joyment while you learn anything.</p>
            </div>
            <div className='card wow fadeInUp'>
              <img src={require('../images/homepage/icon2.png')} />
              <h3>Lifetime Access</h3>
              <p>By signing up in our club, you will be a permenant which means you can access the content and see your edits whenever you want and at the comfort of your home.</p>
            </div>
            <div className='card wow fadeInRight'>
              <img src={require('../images/homepage/icon3.png')} />
              <h3>Meeting Online</h3>
              <p>Sometimes you have such a great skill that you want to share with someone who you want to learn something from and to make this super smooth you can now meet each other online with a click of button.</p>
            </div>
          </div>
        </section>

        <section className="third-section swiper-container swiper-container-coverflow swiper-container-3d swiper-container-horizontal wow fadeIn">
          <div className="swiper-wrapper" style={{ transitionDuration: '0ms', transform: 'translate3d(-929px, 0px, 0px)', perspectiveOrigin: '1393.5px 50%' }}>

            <div className="swiper-slide" style={{ backgroundImage: `url(${developrs})` }}>
              <img src="https://drive.google.com/uc?export=view&id=0B_koKn2rKOkLRml1b3B6eXVqQ2s" className="entity-img" />
              <div className="content" style={{ color: '#fff' }}>
                <p className="title" data-swiper-parallax="-30%" data-swiper-parallax-scale=".7">Web Development</p>
                <span className="caption" data-swiper-parallax="-20%">Users will be able to watch many courses online for some of the web developers in the world. These courses are here to help the people in our local communities to have new set of skills in their lives.</span>
              </div>
            </div>

            <div className="swiper-slide" style={{ backgroundImage: `url(${anime})` }}>
              <img src="https://drive.google.com/uc?export=view&id=0B_koKn2rKOkLRml1b3B6eXVqQ2s" className="entity-img" />
              <div className="content" style={{ color: '#fff' }}>
                <p className="title" data-swiper-parallax="-30%" data-swiper-parallax-scale=".7">Anime</p>
                <span className="caption" data-swiper-parallax="-20%">Users will be able to create, read, update and delete any Anime series the want from their list.</span>
              </div>
            </div>

            <div className="swiper-slide" style={{ backgroundImage: `url(${science})` }}>
              <img src="https://drive.google.com/uc?export=view&id=0B_koKn2rKOkLWTdaX3J5b1VueDg" className="entity-img" />
              <div className="content" style={{ color: '#fff' }}>
                <p className="title" data-swiper-parallax="-30%" data-swiper-parallax-scale=".7">Science</p>
                <span className="caption" data-swiper-parallax="-20%">being able to calculate things quickly and understand some of the major topics in physics, calculus and chemistry would defeintily help you out to pass these materials in the university.</span>
              </div>
            </div>

            <div className="swiper-slide" style={{ backgroundImage: `url(${languages})` }}>
              <img src="https://drive.google.com/uc?export=view&id=0B_koKn2rKOkLRml1b3B6eXVqQ2s" className="entity-img" />
              <div className="content" style={{ color: '#000' }}>
                <p className="title" data-swiper-parallax="-30%" data-swiper-parallax-scale=".7">Languages</p>
                <span className="caption" data-swiper-parallax="-20%">Learning new languages means a new birth and it is also considered to be a crucial skills that can make you special in the workfield. You will learn new languages in our App such as English and Arabic, etc.</span>
              </div>
            </div>

          </div>

          {/* <!-- If we need pagination --> */}
          <div className="swiper-pagination"></div>
          {/* <!-- If we need navigation buttons --> */}
          <div className="swiper-button-prev swiper-button-white"></div>
          <div className="swiper-button-next swiper-button-white"></div>
        </section >

      </>
    );
  }
}


export default Home;