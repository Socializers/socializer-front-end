/* eslint-disable no-unused-vars */

import React from 'react';
import { FaUser, FaLock, FaEnvelope, FaGoogle, FaFacebook, FaGithub, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import $ from 'jquery';

import { LoginContext } from './context.js';
import './signup.scss';

const If = props => {
  return props.condition ? props.children : null;
};

class Signup extends React.Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = e => {
    console.log('dede', this.state);
    this.setState({ [e.target.name]: e.target.value });
  }

  loginHandleSubmit = e => {
    e.preventDefault();
    // console.log('__STATE__', this.state);
    this.context.login(this.state.username, this.state.password);
    // e.target.reset();
  }

  signupHandleSubmit = e => {
    e.preventDefault();
    this.context.signup(this.state.username, this.state.password);
    e.target.reset();
  }

  handleGoogleSubmit = () => {
    this.context.googleSignup();
  }

  componentDidMount() {


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

    $('.login-btn').on('click', function () {
      $('.title').css('display', 'block');
      $('.title').addClass('animated fadeIn');
      $('.title2').css('display', 'none');
      $('.login-btn').css('display', 'none');
      $('.register-btn').css('display', 'block');
      $('.register-btn').addClass('animated fadeIn');
      $('.box-color-up').css('left', '50%');
      $('.register').removeClass('animated fadeIn');
      $('.register').addClass('animated fadeOut');
      $('.login').removeClass('animated fadeOut');
      $('.login').addClass('animated fadeIn');
    });

    $('.register-btn').on('click', function () {
      $('.title').css('display', 'none');
      $('.title2').css('display', 'block');
      $('.title2').addClass('animated fadeIn');
      $('.login-btn').css('display', 'block');
      $('.login-btn').addClass('animated fadeIn');
      $('.register-btn').css('display', 'none');
      $('.box-color-up').css('left', '20%');
      $('.login').removeClass('animated fadeIn');
      $('.login').addClass('animated fadeOut');
      $('.register').removeClass('animated fadeOut');
      $('.register').addClass('animated fadeIn');
    });

    // let BASEURL = 'https://accounts.google.com/o/oauth2/v2/auth';

    // let queryObject = {
    //   response_type: 'code',
    //   client_id: '1082218993942-1ib34ft542p930gk7ilh8ngf8roopm64.apps.googleusercontent.com',
    //   scope: 'openid email',
    //   redirect_uri: 'http://localhost:3000/',
    //   state: 'http://localhost',
    //   access_type: 'offline',
    // };

    // let Query = Object.keys(queryObject).map((val) => {
    //   return `${val}=` + encodeURIComponent(queryObject[val]);
    // }).join('&');
    // let theAuthURL = `${BASEURL}?${Query}`;
    // let url = document.getElementById('google');
    // url.setAttribute('href', theAuthURL);
  }

  render() {
    return (
      <>
        <section className='zero-section-model'></section>

        <section className='first-section-signin animated fadeIn'>
          {/* <If condition={this.context.loggedIn}>
            <button onClick={this.context.logout}>Log Out!</button>
          </If> */}

          {/* <If condition={!this.context.loggedIn}> */}
          <section className="auth-box-up shadow">

            <section className="login">
              <section className="header">
                <h2>log in</h2>
              </section>

              <section className="item-list">
                <section className="item shadow">
                  <FaGoogle className='oauth' />
                  <FaGithub className='oauth' />
                  <FaFacebook className='oauth' />
                  <FaTwitter className='oauth' />
                  <FaLinkedin className='oauth' />
                  <FaInstagram className='oauth' />
                </section>
              </section>

              <section className="body">
                <form method="post" onClick={this.loginHandleSubmit}>

                  <FaUser className='icon' />
                  <label for="email">
                    <input type="text" name="email" required placeholder="Enter your email" />
                  </label>

                  <FaLock className='icon' />
                  <label for="password">
                    <input type="password" name="password" required placeholder="Enter your password" />
                  </label>

                  <label className="d-flex flex-column">
                    <button type="submit" className="blue text-center">log in</button>
                    <a href="" className="forget-password">forget password?</a>
                  </label>

                </form>
              </section>
            </section>

            <section className="register">

              <section className="header">
                <h2>Register</h2>
              </section>

              <section className="item-list">

                <section className="item shadow">
                  <FaGoogle className='oauth' />
                  <FaGithub className='oauth' />
                  <FaFacebook className='oauth' />
                  <FaTwitter className='oauth' />
                  <FaLinkedin className='oauth' />
                  <FaInstagram className='oauth' />
                </section>

              </section>

              <section className="body">

                <form method="post" onSubmit={this.signupHandleSubmit}>

                  <FaUser className='icon' />
                  <label for="name">
                    <input type="text" name='username' required placeholder="Enter your full name" onChange={this.handleChange} />
                  </label>

                  < FaEnvelope className='icon' />
                  <label for="email">
                    <input type="email" name="email" placeholder="Enter your email" onChange={this.handleChange} />
                  </label>

                  <FaLock className='icon' />
                  <label for="password">
                    <input type="password" name="password" required placeholder="Enter your password" onChange={this.handleChange} />
                  </label>

                  <label className="d-flex flex-column">
                    <button type="submit" className="pink text-center">Register</button>
                  </label>
                </form>
              </section>
            </section>
          </section>
          <section className="box-color-up">
            <h3 className="title2">Have you registered before?</h3>
            <button type="button" className="login-btn blue text-center">log in</button>
            <h3 className="title">Not registered yet?</h3>
            <button type="button" className="register-btn pink text-center">Register</button>
          </section>
          {/* </If> */}
        </section>
      </>
    );
  }
}

export default Signup;