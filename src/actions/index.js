import axios from 'axios';
import {
  API_BASE,
  USER_SET_AUTH,
  USER_SIGNUP_SUCCESS,
  USER_LOGIN_SUCCESS,
  DESTORY_USER_SIGNUP_SUCCESS,
  USER_AUTH_ERROR
} from '../constants';

export function signupSuccess() {
  return {
    type: USER_SIGNUP_SUCCESS
  }
}

export function setUserAuth(payload) {
  return {
    type: USER_SET_AUTH,
    payload
  }
}

export function loginSuccess() {
  return {
    type: USER_LOGIN_SUCCESS
  }
}

export function authError(err) {
  return {
    type: USER_AUTH_ERROR,
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
        dispatch(authError('Something is wrong'));
      }
    }, () => {
      dispatch(authError('Something is wrong'));
    });
  }
}

export const userLogin = () => {
  return (dispatch, getState) => {
    dispatch(setUserAuth(false));
    dispatch(authError(''));
    const userObj = () => {
      if (getState().form &&
        getState().form.USER_LOGIN &&
        getState().form.USER_LOGIN.values) {
        return JSON.stringify(getState().form.USER_LOGIN.values)
      } else {
        return null;
      }
    }
    return axios.create({
      headers: {
        'Content-Type': 'application/json'
      }
    }).post(
      `${API_BASE}/auth/login`,
      userObj()
      ).then((data) => {
        if (data && data.data.success === true) {
          localStorage.setItem('token', data.data.token);
          dispatch(setUserAuth(true));
          dispatch(loginSuccess());
        } else {
          localStorage.removeItem('token');
          dispatch(authError('Something is wrong'));
        }
      }, () => {
        dispatch(authError('Something is wrong'));
      });
  }
}
