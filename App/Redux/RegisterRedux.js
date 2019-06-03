import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  signupRequest: ['user'],
  signupSuccess: ['email'],
  signupFailure: ['error'],
  confirmRequest: ['data'],
  confirmSuccess: ['email'],
  confirmFailure: ['error'],
  resendRequest: ['email'],
  resendSuccess: ['email'],
  resendFailure: ['error'],
  resetPasswordRequest: ['email'],
  resetPasswordSuccess: ['email'],
  resetPasswordFailure: ['error']
})

export const SignupTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,
  signedUp: false,
  verified: false,
  resent: false,
  email: null,
})

/* ------------- Reducers ------------- */

export const request = (state) => state.merge({ fetching: true })

export const success = (state, action) => {
  const { email } = action;
  return state.merge({
    fetching: false, signedUp: true, error: null, email
  });
};

export const failure = (state, { error }) => state.merge({ fetching: false, error, signedUp: false });

export const confirmRequest = (state) => state.merge({ fetching: true })

export const confirmSuccess = (state, action) => {
  const { email } = action;
  return state.merge({
    fetching: false, verified: true, email
  });
};

export const resendRequest = (state) => state.merge({ fetching: true, verified: false })

export const confirmFailure = (state, { error }) => state.merge({ fetching: false, error, verified: false });

export const resendSuccess = (state, action) => {
  const { email } = action;
  return state.merge({
    fetching: false, resent: true, email
  });
};

export const resetPasswordRequest = (state) => state.merge({ fetching: true, verified: false })

export const resetPasswordFailure = (state, { error }) => state.merge({ fetching: false, error, resent: false });

export const resetPasswordSuccess = (state, action) => {
  const { email } = action;
  return state.merge({
    fetching: false, resent: true, email
  });
};

export const resendFailure = (state, { error }) => state.merge({ fetching: false, error, resent: false });

export const logout = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGNUP_REQUEST]: request,
  [Types.SIGNUP_SUCCESS]: success,
  [Types.SIGNUP_FAILURE]: failure,
  [Types.CONFIRM_REQUEST]: confirmRequest,
  [Types.CONFIRM_SUCCESS]: confirmSuccess,
  [Types.CONFIRM_FAILURE]: confirmFailure,
  [Types.RESEND_REQUEST]: resendRequest,
  [Types.RESEND_SUCCESS]: resendSuccess,
  [Types.RESEND_FAILURE]: resendFailure,
  [Types.RESET_PASSWORD_REQUEST]: resetPasswordRequest,
  [Types.RESET_PASSWORD_SUCCESS]: resetPasswordSuccess,
  [Types.RESET_PASSWORD_FAILURE]: resetPasswordFailure,
})
