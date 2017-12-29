import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  userSignup,
  destroyUserSignupSuccess
} from '../../actions';
import IMAGE_AWESOME from '../../images/awesome.png';

class SignUpForm extends Component {
  render() {
    return (
      <div className="signup-form">
        <form onSubmit={(e) => e.preventDefault()}>

          <div>
            <label htmlFor="username">Username</label>
            <Field
              name="username"
              component="input"
              type="text"
              className="input-on-dark"
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="username">Password</label>
            <Field
              name="password"
              component="input"
              type="password"
              className="input-on-dark"
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            onClick={this.props.onSubmit}
            className="block"
          >Sign up
          </button>

        </form>
      </div>
    )
  }
}

const SignUpReduxForm = reduxForm({
  form: 'USER_SIGN_UP'
})(SignUpForm)

class SignUp extends PureComponent {

  componentWillUnmount(){
    this.props.destroySignupSuccess()
  }
  render() {
    const {
      onSubmitForm,
      signupSuccess
    } = this.props;

    return (
      <div className="flex-container-center signup-form-container">
        {signupSuccess &&
          <div className="signup-success-message">
            <p>Signup Success!</p>
            <img src={IMAGE_AWESOME} alt="Success" />
          </div>
        }
        {!signupSuccess &&
          <SignUpReduxForm onSubmit={onSubmitForm} />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    signupSuccess: state.user && state.user.signupSuccess
  }
}

const mapDispatchToProps = {
  onSubmitForm: () => userSignup(),
  destroySignupSuccess: () => destroyUserSignupSuccess()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
