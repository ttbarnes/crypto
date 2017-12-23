import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Home from './routes/Home';
import MoveFunds from './routes/MoveFunds';
import SignUp from './routes/SignUp';
import './index.css';

const Router = () => (
  <BrowserRouter>
    <div>
      <header>
        <div className="col-left">
          <h1><Link to="/">iCryptoWallet64.js.io</Link></h1>
          <ul>
            <li><Link to="/">Balances</Link></li>
            <li><Link to="move-funds">Move funds</Link></li>
          </ul>
        </div>
        <div className="user-menu">
          <li><Link to="sign-up">Sign up</Link></li>
        </div>
      </header>
      <div className="main-container">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/move-funds' component={MoveFunds} />
          <Route exact path='/sign-up' component={SignUp} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

const Routes = ({ store }) => (
  <Provider store={store}>
    <Router />
  </Provider>
);

Routes.propTypes = {
  store: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Routes;
