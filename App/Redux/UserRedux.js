import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userRequest: [],
  userSuccess: ['me'],
  userFailure: ['error'],
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,
  me: null
})

/* ------------- Reducers ------------- */

export const request = (state) => state.merge({ fetching: true })

export const success = (state, action) => {
  const { me } = action;
  return state.merge({
    fetching: false, me, error: null,
  });
};

export const failure = (state, { error }) => state.merge({ fetching: false, error });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_REQUEST]: request,
  [Types.USER_SUCCESS]: success,
  [Types.USER_FAILURE]: failure
})
