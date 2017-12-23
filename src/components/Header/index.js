import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import './header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropDown: false
    };
  }
  onToggle = () => {
    this.setState({
      showDropDown: !this.state.showDropDown
    })
  }
  render() {
    const {
      isAuth
    } = this.props;

    const {
      showDropDown
    } = this.state;

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
          {isAuth ?
            <div>user menu</div>
          :
            <div>
              <li><Link to="sign-up" className="button">Sign up</Link></li>
              <li>
                <button onClick={this.onToggle}>Login</button>
              </li>

              <div className={showDropDown ? 'login-dropdown-overlay show' : 'login-dropdown-overlay'}>
                <div className={showDropDown ? 'login-dropdown show' : 'login-dropdown'}>
                  <LoginForm />
                </div>
              </div>
            </div>
          }
          </div>
      </header>      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.user && state.user.isAuth
  }
}

export default connect(
  mapStateToProps,
  null
)(Header);
