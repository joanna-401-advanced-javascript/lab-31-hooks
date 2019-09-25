import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Context from './components/auth/context';

import ToDo from './components/todo/todo';
import Header from './components/header/header';

import './site.scss';

function App() {
  return (
    <BrowserRouter>
      <Context>
        <Header />
        <ToDo />
      </Context>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
