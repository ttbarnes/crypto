import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import LoginForm from './LoginForm';
import {
  authCheck,
  logout
} from '../../actions';
import './header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginForm: false,
      showUserDropDown: false
    };
  }

  componentWillMount() {
    this.props.doAuthCheck();
  }

  onToggleLoginForm = () => {
    this.setState({
      showLoginForm: !this.state.showLoginForm
    })
  }
 
  showUserDropDown = () => {
    this.setState({
      showUserDropDown: !this.state.showUserDropDown
    })
  }

  handleOnLogout = () => {
    this.props.onLogout();
    this.props.history.push('/');
  }
 
  render() {
    const {
      isAuth,
      profile,
      onLogout
    } = this.props;

    const {
      showLoginForm,
      showUserDropDown
    } = this.state;

    return (
      <header>
        <div className="col-left">
          <h1><Link to="/">iCryptoWallet64.js.io</Link></h1>
          <ul>
            <li><Link to="integrations">Integrations</Link></li>
            <li><Link to="/balances">Balances</Link></li>
            <li><Link to="move-funds">Move funds</Link></li>
          </ul>
        </div>
        <div className="header-col-user">
          {isAuth ?
            <div>
              <button
                onClick={this.showUserDropDown}
                className="button-plain">
                Welcome {profile.username}
              </button>
              <div className={showUserDropDown ? 'user-dropdown show' : 'user-dropdown'}>
                <ul>
                  <li>Dummy item 1</li>
                  <li>Dummy item 2</li>
                  <li onClick={this.handleOnLogout}>Log out</li>
                </ul>
              </div>
            </div>
          :
            <div>
              <li><Link to="sign-up" className="button">Sign up</Link></li>
              <li>
                <button onClick={this.onToggleLoginForm}>Login</button>
              </li>

              <div className={showLoginForm ? 'header-overlay show' : 'header-overlay'}>
                <div className={showLoginForm ? 'login-form-container show' : 'login-form-container'}>
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
    isAuth: state.user && state.user.isAuth,
    profile: state.user && state.user.profile
  }
}

const mapDispatchToProps = {
  doAuthCheck: () => authCheck(),
  onLogout: () => logout(),
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
