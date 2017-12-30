import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import { authCheck } from '../../actions';
import './header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropDown: false
    };
  }

  componentWillMount() {
    this.props.doAuthCheck();
  }

  onToggle = () => {
    this.setState({
      showDropDown: !this.state.showDropDown
    })
  }

  render() {
    const {
      isAuth,
      profile
    } = this.props;

    const {
      showDropDown
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
        <div className="user-menu">
          {isAuth ?
            <small>Welcome {profile.username}</small>
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
    isAuth: state.user && state.user.isAuth,
    profile: state.user && state.user.profile
  }
}

const mapDispatchToProps = {
  doAuthCheck: () => authCheck()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
