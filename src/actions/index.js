import axios from 'axios';
import {
  API_BASE,
  USER_SET_AUTH,
  USER_SIGNUP_SUCCESS,
  USER_LOGIN_SUCCESS,
  DESTORY_USER_SIGNUP_SUCCESS,
  USER_AUTH_ERROR,
  USER_DATA_SUCCESS,
  USER_DATA_ERROR,
  PROMISE_EXCHANGE_LOADING,
  PROMISE_EXCHANGE_SUCCESS,
  PROMISE_EXCHANGE_ERROR
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

export function userDataSuccess(payload) {
  return {
    type: USER_DATA_SUCCESS,
    payload
  }
}

export function userDataError() {
  return {
    type: USER_DATA_ERROR
  }
}

// uiState related promise actions
export function promiseExchangeLoading(payload) {
  return {
    type: PROMISE_EXCHANGE_LOADING,
    payload
  }
}

export function promiseExchangeSuccess(payload) {
  return {
    type: PROMISE_EXCHANGE_SUCCESS,
    payload
  }
}

export function promiseExchangeError(payload) {
  return {
    type: PROMISE_EXCHANGE_ERROR,
    payload
  }
}


export const authCheck = () => {
  return (dispatch, getState) => {
    const token = localStorage.getItem('token');
    if (token && token !== 'undefined') {
      // TODO: api check token
      getUserData(dispatch);
      dispatch(setUserAuth(true));
    } else {
      // not auth
      dispatch(setUserAuth(false));
    }
  };
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

export const getUserData = (dispatch) => {
  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    }
  }).post(
    `${API_BASE}/auth`
  ).then((res) => {
    if (res.data && res.data.success === true) {
      dispatch(userDataSuccess(res.data.resUserObj)); 
    } else {
      dispatch(userDataError());
    }
  }, () => {
    dispatch(userDataError());
  });
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
          dispatch(loginSuccess()); // TODO: observables login success
          getUserData(dispatch);
        } else {
          localStorage.removeItem('token');
          dispatch(authError('Something is wrong'));
        }
      }, () => {
        dispatch(authError('Something is wrong'));
      });
  }
}

export const postExchangeData = (postObj) => {
  return (dispatch, getState) => {
    // 
    dispatch(promiseExchangeLoading({
      isLoading: true,
      exchange: postObj.exchange
    }));
    postObj.userId = getState().user.profile._id;
    return axios.create({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }).put(
      `${API_BASE}/poc/keys`,
      postObj
      ).then((data) => {
        console.log('------------ postExchangeData data ', data);
      }, () => {
        console.log('------------ postExchangeData, something went wrong');
      });
  };
}
