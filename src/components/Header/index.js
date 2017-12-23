import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

class Header extends Component {
  render() {
    return (
      <header>
        <div className="col-left">
          <h1><Link to="/">iCryptoWallet64.js.io</Link></h1>
          <ul>
            <li><Link to="/">Balances</Link></li>
            <li><Link to="move-funds">Move funds</Link></li>
          </ul>
        </div>
        <div className="user-menu">
          <li><Link to="sign-up" className="button">Sign up</Link></li>
          <li>
            <button onClick={this.onToggle}>Login</button>
          </li>
          
          
        </div>
      </header>      
    );
  }
}

export default Header;
