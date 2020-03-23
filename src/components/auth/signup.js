/* eslint-disable no-unused-vars */

import React from 'react';
import { LoginContext } from './context.js';

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

    render() {
      return (
        <>
          <If condition={this.context.loggedIn}>
            <button onClick={this.context.logout}>Log Out!</button>
          </If>
          
          <If condition={!this.context.loggedIn}>
            <form onSubmit={this.handleSubmit}>
              <input name='username' onChange={this.handleChange} />
              <input name='password' onChange={this.handleChange} />
              <button>Signup!</button>
            </form>
          </If>
        </>
      );
    }
}

export default Signup;