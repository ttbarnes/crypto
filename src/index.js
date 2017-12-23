import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import store from './store';

const DOM_ROOT_ID = 'root';
const GET_DOM_ROOT = document.getElementById(DOM_ROOT_ID);

ReactDOM.render(
  <Routes store={store} />,
  GET_DOM_ROOT
);
