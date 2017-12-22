import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import './index.css';
import Home from './Home';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
      <div>
        <header>
          <h1><Link to="/">iCryptoWallet64.js.io</Link></h1>
          <ul>
            <li><Link to="/">Balances</Link></li>
            <li><Link to="move-funds">Move funds</Link></li>
          </ul>
        </header>
        <div className="main-container">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/move-funds' component={() => <div>test :)</div>} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>, document.getElementById('root'));

registerServiceWorker();
