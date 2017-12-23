import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { userSignup } from '../../actions';

class SignUpForm extends Component {
  render() {
    return (
      <div className="flex-container-center signup-form-container">
        <div className="signup-form">
          <form onSubmit={(e) => e.preventDefault()}>

            <div>
              <label htmlFor="username">Username</label>
              <Field
                name="username"
                component="input"
                type="text"
                className="input-on-dark"
              />
            </div>

            <div>
              <label htmlFor="username">Password</label>
              <Field
                name="password"
                component="input"
                type="password"
                className="input-on-dark"
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
      </div>
    )
  }

}

const SignUpReduxForm = reduxForm({
  form: 'USER_SIGN_UP'
})(SignUpForm)

class SignUp extends PureComponent {
  render() {
    const { onSubmitForm } = this.props;
    return (
      <SignUpReduxForm onSubmit={onSubmitForm} />
    )
  }
}

const mapDispatchToProps = {
  onSubmitForm: () => userSignup()
}

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
