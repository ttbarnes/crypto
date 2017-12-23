import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { userLogin } from '../../actions';

class LoginForm extends Component {
  render() {
    const {
      isAuth,
      authError
    } = this.props;

    if (isAuth) {
      return null;
    }
    return (
      <div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="username">Username</label>
            <Field
              name="username"
              component="input"
              type="text"
              className="input-on-dark"
              placeholder="Nathan Fielder"
            />
          </div>

          <div>
            <label htmlFor="username">Password</label>
            <Field
              name="password"
              component="input"
              type="password"
              className="input-on-dark"
              placeholder="**************"
            />
          </div>

          {authError && <p className="form-error">{authError}</p>}

          <button
            type="submit"
            onClick={this.props.onSubmitForm}
            className="block"
          >Login
          </button>

        </form>
      </div>
    );
  }
}

const LogInReduxForm = reduxForm({
  form: 'USER_LOGIN'
})(LoginForm);

const mapStateToProps = (state) => {
  return {
    isAuth: state.user && state.user.isAuth,
    authError: state.user && state.user.authError
  }
}

const mapDispatchToProps = {
  onSubmitForm: () => userLogin()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInReduxForm);

