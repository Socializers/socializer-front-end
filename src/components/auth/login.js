/* eslint-disable no-unused-vars */

import React from 'react';

import { LoginContext } from './context.js';
import './login.scss';

const If = props => {
  return props.condition ? props.children : null;
};

class Login extends React.Component {
    static contextType = LoginContext;

    constructor(props){
      super(props);
      this.state = {
        username: '',
        password: '',
      };
    }

    handleChange = e => {
      this.setState({[e.target.name] : e.target.value});
    }

    handleSubmit = e => {
      e.preventDefault();
      this.context.login(this.state.username, this.state.password);
      e.target.reset();
    }

    componentDidMount () {
      
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
    }

    render() {
      return (
        <>
          <section className='zero-section-model'></section>

          <section className='first-section-signin'>
            <If condition={this.context.loggedIn}>
              <button onClick={this.context.logout}>Log Out!</button>
            </If>

            <If condition={!this.context.loggedIn}>
              <form onSubmit={this.handleSubmit}>
                <input name='username' onChange={this.handleChange} />
                <input name='password' onChange={this.handleChange} />
                <button>Log In!</button>
              </form>
            </If>
            <div className='auth'>
              
            </div>
          </section>
        </>
      );
    }
}

export default Login;