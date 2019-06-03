import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'

// attempts to login
export function* login(api, { email, password }) {
  if (!email || !password) {
    // dispatch failure
    yield put(LoginActions.loginFailure('Invalid request'));
  } else {
    // dispatch successful logins
    // yield put(LoginActions.loginSuccess(email))
    // make the call to the api
    try {
      const response = yield call(api.login, { email, password });
      if (response.status === 201 && response.data.token) {
        yield put(LoginActions.loginSuccess(response.data.token));
      } else {
        yield put(LoginActions.loginFailure(response.error));
      }
    } catch (error) {
      console.log('login saga error', error);
      const { response } = error;
      if (!response || response.status !== 401) {
        yield put(LoginActions.loginFailure(response.data.errors));
      } else if (response.status === 401) {
        yield put(LoginActions.loginFailure(response.data.errors));
      }
    }
  }
}

export function* logout(api) {
  try {
    const response = yield call(api.logout);
    if (response.status === 200) {
      yield put(LoginActions.loginSuccess(null));
    } else {
      yield put(LoginActions.loginFailure('Something went wrong, please try again'));
    }
  } catch (error) {
    console.log('logout saga error', error);
    const { response } = error;
    if (!response || response.status !== 401) {
      yield put(LoginActions.loginFailure('Something went wrong, please try again'));
    } else if (response.status === 401) {
      yield put(LoginActions.loginFailure('invalid token'));
    }
  }
}

export default {
  login,
  logout
};
