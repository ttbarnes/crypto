import axios from 'axios';
import {
  API_BASE,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_ERROR,
  DESTORY_USER_SIGNUP_SUCCESS
} from '../constants';

export function signupSuccess() {
  return {
    type: USER_SIGNUP_SUCCESS
  }
}

export function signupError(err) {
  return {
    type: USER_SIGNUP_ERROR,
    payload: err
  }
}

export function destroyUserSignupSuccess() {
  return {
    type: DESTORY_USER_SIGNUP_SUCCESS,
    payload: false
  }
}

export const userSignup = () => {
  return (dispatch, getState) => {
    const userObj = () => {
      if (getState().form &&
          getState().form.USER_SIGN_UP &&
          getState().form.USER_SIGN_UP.values) {
        return JSON.stringify(getState().form.USER_SIGN_UP.values)
      } else {
        return null;
      }
    }
    return axios.create({
      headers: {
        'Content-Type': 'application/json'
      }
    }).post(
      `${API_BASE}/user`,
      userObj()
    ).then((data) => {
      if (data && data.data.success === true) {
        dispatch(signupSuccess())
      } else {
        dispatch(signupError('Sorry, something is wrong.'));
      }
    }, () => {
      dispatch(signupError('Sorry, something is wrong.'));
    });
  }
}
