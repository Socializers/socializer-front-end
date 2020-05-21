/* eslint-disable no-unused-vars */

import React from 'react';
import { FaGoogle, FaFacebook, FaGithub, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

import { LoginContext } from './context.js';
import './login.scss';

const If = props => {
  return props.condition ? props.children : null;
};

class Signup extends React.Component {
    static contextType = LoginContext;

    constructor(props){
      super(props);
      this.state = {
        username: '',
        password: '',
      };
    }

    handleChange = e => {
      console.log('dede',this.state);
      this.setState({[e.target.name] : e.target.value});
    }

    handleSubmit = e => {
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

      let BASEURL = 'https://accounts.google.com/o/oauth2/v2/auth';
      
      let queryObject = {
        response_type: 'code',
        client_id: '1082218993942-1ib34ft542p930gk7ilh8ngf8roopm64.apps.googleusercontent.com',
        scope: 'openid email',
        redirect_uri: 'http://localhost:3000/',
        state: 'http://localhost',
        access_type: 'offline',
      };

      let Query = Object.keys(queryObject).map((val) => {
        return `${val}=` + encodeURIComponent(queryObject[val]);
      }).join('&');
      let theAuthURL = `${BASEURL}?${Query}`;
      let url = document.getElementById('google');
      url.setAttribute('href', theAuthURL);
    }

    render() {
      return (
        <>
          <section className='zero-section-model'></section>

          <section className='first-section-signin'>
            <If condition={this.context.loggedIn}>
              <button className='out' onClick={this.context.logout}>Log Out!</button>
            </If>
          
            <If condition={!this.context.loggedIn}>
              <form onSubmit={this.handleSubmit}>
                <input name='username' onChange={this.handleChange} />
                <input name='password' onChange={this.handleChange} />
                <button>Signup!</button>
              </form>
              <div className='auth'>
                <a onLoad={this.handleGoogleInfo} onClick={this.handleGoogleSubmit} id='google'><FaGoogle/></a>
                <a href='https://www.facebook.com/' target='_blank'><FaFacebook/></a>
                <a href='http://www.github.com/' target='_blank'><FaGithub/></a>
                <a href='https://twitter.com/' target='_blank'><FaTwitter/></a>
                <a href='https://www.linkedin.com/' target='_blank'><FaLinkedin/></a>
                <a href='https://www.instagram.com' target='_blank'><FaInstagram/></a>
              </div>
            </If>
          </section>
        </>
      );
    }
}

export default Signup;