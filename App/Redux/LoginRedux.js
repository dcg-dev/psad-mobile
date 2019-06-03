import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['email', 'password'],
  loginSuccess: ['token'],
  loginFailure: ['error'],
  logout: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,
  loggedIn: false,
  token: null,
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state) => state.merge({ fetching: true })

// we've successfully logged in
export const success = (state, action) => {
  const { token } = action;
  const loggedIn = token !== null;
  return state.merge({
    fetching: false, token, loggedIn, error: null,
  });
};

// we've had a problem logging in
export const failure = (state, { error }) => state.merge({ fetching: false, error, loggedIn: false });

// we've logged out
export const logout = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout
})
