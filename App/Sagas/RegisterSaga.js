import { call, put } from 'redux-saga/effects'
import SignupActions from '../Redux/RegisterRedux'

// attempts to login
export function* signup(api, { user }) {
  try {
    const response = yield call(api.signup, { user });
    if (response.status === 201 && response.data) {
      yield put(SignupActions.signupSuccess(user.email));
    } else {
      yield put(SignupActions.signupFailure(response.error));
    }
  } catch (error) {
    console.log('signup saga error', error.response);
    const { response } = error;
    if (!response || response.status !== 401) {
      yield put(SignupActions.signupFailure(response.data.errors));
    } else if (response.status === 401) {
      yield put(SignupActions.signupFailure(response.data.errors));
    }
  }
}

export function* sendConfirm(api, { data }) {
  try {
    const response = yield call(api.sendConfirmCode, { data });
    if (response.status === 200) {
      yield put(SignupActions.confirmSuccess(data.email));
    } else {
      yield put(SignupActions.confirmFailure(response.error));
    }
  } catch (error) {
    console.log('confirm saga error', error.response);
    const { response } = error;
    if (!response || response.status !== 401) {
      yield put(SignupActions.confirmFailure(response.data.errors));
    } else if (response.status === 401) {
      yield put(SignupActions.confirmFailure(response.data.errors));
    }
  }
}

export function* resendConfirmCode(api, { email }) {
  try {
    const response = yield call(api.resendConfirmCode, { email });
    if (response.status === 200) {
      yield put(SignupActions.resendSuccess(email));
    } else {
      yield put(SignupActions.resendFailure(response.error));
    }
  } catch (error) {
    console.log('confirm saga error', error.response);
    const { response } = error;
    if (!response || response.status !== 401) {
      yield put(SignupActions.resendFailure(response.data.error));
    } else if (response.status === 401) {
      yield put(SignupActions.resendFailure(response.data.error));
    }
  }
}

export function* resetPassword(api, { email }) {
  try {
    const response = yield call(api.resetPassword, { email });
    if (response.status === 200) {
      yield put(SignupActions.resetPasswordSuccess(email));
    } else {
      yield put(SignupActions.resetPasswordFailure(response.error));
    }
  } catch (error) {
    console.log('confirm saga error', error.response);
    const { response } = error;
    if (!response || response.status !== 401) {
      yield put(SignupActions.resetPasswordFailure(response.data.errors));
    } else if (response.status === 401) {
      yield put(SignupActions.resetPasswordFailure(response.data.errors));
    }
  }
}

export default {
  signup,
  resetPassword,
  sendConfirm,
  resendConfirmCode
};
