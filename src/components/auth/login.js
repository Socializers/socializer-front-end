/* eslint-disable no-unused-vars */

import React from 'react';
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaGithub, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import $ from 'jquery';

import { LoginContext } from './context.js';
import './login.scss';

const If = props => {
  return props.condition ? props.children : null;
};

class Login extends React.Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.context.login(this.state.username, this.state.password);
    e.target.reset();
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

    $('.register-btn').on('click', function () {
      $('.title').css('display', 'none');
      $('.title2').css('display', 'block');
      $('.title2').addClass('animated fadeIn');
      $('.login-btn').css('display', 'block');
      $('.login-btn').addClass('animated fadeIn');
      $('.register-btn').css('display', 'none');
      $('.box-color').css('left', '20%');
      $('.login').removeClass('animated fadeInRight');
      $('.login').addClass('animated fadeOutRight');
      $('.register').removeClass('animated fadeOutLeft');
      $('.register').addClass('animated fadeInLeft');
    });
    $('.login-btn').on('click', function () {
      $('.title').css('display', 'block');
      $('.title').addClass('animated fadeIn');
      $('.title2').css('display', 'none');
      $('.login-btn').css('display', 'none');
      $('.register-btn').css('display', 'block');
      $('.register-btn').addClass('animated fadeIn');
      $('.box-color').css('left', '50%');
      $('.register').removeClass('animated fadeInLeft');
      $('.register').addClass('animated fadeOutLeft');
      $('.login').removeClass('animated fadeOutRight');
      $('.login').addClass('animated fadeInRight');
    });
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
          <section className="auth-box shadow">

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
                <form action="" method="post">

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

                <form method="post" onSubmit={this.handleSubmit}>

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
          <section className="box-color">
            <h3 className="title">Not registered yet?</h3>
            <button type="button" className="register-btn pink text-center">Register</button>
            <h3 className="title2">Have you registered before?</h3>
            <button type="button" className="login-btn blue text-center">log in</button>
          </section>
          {/* </If> */}
        </section>
      </>
    );
  }
}

export default Login;