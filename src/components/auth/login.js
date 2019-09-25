import superagent from 'superagent';
import React, { useState, useContext } from 'react';
import { LoginContext } from './context';

const API = process.env.REACT_APP_API;

const If = (props) => {
  return props.condition ? props.children : null;
};

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loginContext = useContext(LoginContext);

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
      .then((response) => {
        const token = response.text;
        loginMethodFromContext(token);
      })
      .catch('error');
  }

  return (
    <>
      <If condition={loginContext.loggedIn}>
        <button onClick={loginContext.logout}>
          Log Out
        </button>
      </If>
      <If condition={!loginContext.loggedIn}>
        <div>
          <form onSubmit={(e) => handleSubmit(e, loginContext.login)}>
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
}
