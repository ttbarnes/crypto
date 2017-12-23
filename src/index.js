import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import Routes from './routes';
import appReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

const store = createStore(
  appReducer,
  composeEnhancers(applyMiddleware(
    thunk
  ))
);

const DOM_ROOT_ID = 'root';
const GET_DOM_ROOT = document.getElementById(DOM_ROOT_ID);

ReactDOM.render(
  <Routes store={store} />,
  GET_DOM_ROOT
);
