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

    handleGoogleSubmit = () => {
      this.context.googleSignup();
    }

    componentDidMount() {
    
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
          <If condition={this.context.loggedIn}>
            <button onClick={this.context.logout}>Log Out!</button>
          </If>
          
          <If condition={!this.context.loggedIn}>
            <form onSubmit={this.handleSubmit}>
              <input name='username' onChange={this.handleChange} />
              <input name='password' onChange={this.handleChange} />
              <button>Signup!</button>
            </form>

            <a onLoad={this.handleGoogleInfo} onClick={this.handleGoogleSubmit} id='google'>Signup with Google</a>
          </If>
        </>
      );
    }
}

export default Signup;