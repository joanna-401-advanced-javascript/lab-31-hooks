import React from 'react';
import PropTypes from 'prop-types';

import { LoginContext } from './context';
// import login from './login';

const If = (props) => {
  return props.condition ? props.children : null;
};

export default function Auth(props) {
  return (
    <LoginContext.Consumer>
      {(context) => {
        const okToRender = context.loggedIn
          && (props.capability
            ? context.user.capabilities && context.user.capabilities.includes(props.capability)
            : true);

        return <If condition={okToRender}>{props.children}</If>;
      }}
    </LoginContext.Consumer>
  );
}

Auth.propTypes = {
  capability: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};
