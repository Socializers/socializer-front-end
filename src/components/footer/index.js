/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGooglePlusG } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import $ from 'jquery';

import './footer.scss';

export default function Footer() {

  useEffect(() => {

    function generateBalls() {
      for (var i = 0; i < Math.floor(window.innerWidth/20); i++) {
        $('.gooey-animations').append(`
        <div class="ball"></div>
      `);
        var colors = ['#9acd32','#d6f7a2'];
        $('.ball').eq(i).css({'bottom':'0px','left':Math.random()*window.innerWidth-100,'animation-delay':Math.random()*5+'s','transform':'translateY('+Math.random()*10+'px)','background-color':colors[i%2]});
      }
    }
    generateBalls();
      
    window.addEventListener('resize', function(e) {
      $('.gooey-animations .ball').remove();
      generateBalls();
    });

    $(document).ready(function() {
      $('.letter').click(function() {
        $('.hide').toggle(500);
        $('.letter').css({
          border: 'none',
          cursor: 'pointer',
          borderBottomLeftRadius: '0px',
          borderBottomRightRadius: '0px',
        });
        $('.hide').css({
          borderTopLeftRadius: '0px',
          borderTopRightRadius: '0px',
        });
        $('#email').focus();
      });
    });
      
  });

  const submitHandeler  = e => {
    e.preventDefault();
    $('.hide').slideUp(500);
    e.target.reset();
  };

  return (
    <>
      <footer>
        <div className="gooey-animations"></div>
        <div className='content'>

          <section>
            <h2>Quick Links</h2>
            <ul className='nav-list'>
              <li><Link to="/">Home</Link></li>
              <li><a href="#">About</a></li>
              <li><Link to="/app">Dashboard</Link></li>
              <li><Link to="/form">Form</Link></li>
            </ul>
          </section>


          <section>
            <h2>CONTACT US</h2>
            <p>Contact us if need help withanything</p>
            <div className="socialLinks">
              <ul>
                <li>
                  <a href="#">
                    <i className="fab fa-facebook-f"><FaFacebookF/></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-twitter"><FaTwitter/></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-linkedin-in"><FaLinkedinIn /></i>
                  </a>
                </li>
                <li>
                  <a href="#"><i className="fab fa-google-plus-g"><FaGooglePlusG /></i></a>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2>Newsletter</h2>
            <p>Sign Up to Our Newsletter to Get Latest Updates & Services</p>
            <div className="button">
              <button className='letter'>Sign Up for our Newsletter</button>
              <form onSubmit={submitHandeler} className="hide">
                <input type="email" placeholder="abc@example.com" id="email" required />
                <input type="submit" value="Submit" />
              </form>
            </div>
          </section>
        </div>
      </footer>

      <svg className='footer' xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -7"
              result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>


      <svg className='footer' viewBox="0 0 1440 328" width="100vw">
        <defs>
          <clipPath id="wave" clipPathUnits="objectBoundingBox" transform="scale(0.00069444444, 0.00304878048)">
            <path
              d="M504.452 27.7002C163.193 -42.9551 25.9595 38.071 0 87.4161V328H1440V27.7002C1270.34 57.14 845.711 98.3556 504.452 27.7002Z" />
          </clipPath>
        </defs>
      </svg>

    </>
  );
}