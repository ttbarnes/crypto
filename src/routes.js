import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './routes/Home';
import MoveFunds from './routes/MoveFunds';
import SignUp from './routes/SignUp';
import './index.css';

const Router = () => (
  <BrowserRouter>
    <div>
      <Header />
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
