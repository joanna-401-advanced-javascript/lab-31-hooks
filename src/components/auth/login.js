import superagent from 'superagent';
import React, { useState } from 'react';
import { LoginContext } from './context.js';

const API = process.env.REACT_APP_API;

const If = props => {
  return !!props.condition ? props.children : null;
};

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e, loginMethodFromContext) {
    e.preventDefault();
    superagent
    .post(`${API}/signin`)
    .auth(username, password)
    .then(response => {
      let token = response.text;
      loginMethodFromContext(token);
    })
    .catch(console.error);
  }

  return (
    <LoginContext.Consumer>
      {context => {
        return (
          <>
            <If condition={context.loggedIn}>
              <button onClick={context.logout}>
                Log Out
              </button>
            </If>
            <If condition={!context.loggedIn}>
              <div>
                <form onSubmit={e => handleSubmit(e, context.login)}>
                  <input
                    placeholder="username"
                    name="username"
                    onChange={handleUsernameChange}
                  />
                  <input
                    placeholder="password"
                    name="password"
                    type="password"
                    onChange={handlePasswordChange}
                  />
                  <input type="submit" value="login" />
                </form>
              </div>
            </If>
          </>
        );
      }}
    </LoginContext.Consumer>
    );
}
