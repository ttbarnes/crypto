import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import './index.css';
import Home from './Home';
import MoveFunds from './MoveFunds';
import SignUp from './routes/SignUp/SignUp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
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
    </BrowserRouter>, document.getElementById('root'));

registerServiceWorker();
