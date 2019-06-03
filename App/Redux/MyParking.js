import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchMyParking: ['filter'],
  fetchMyParkingSuccess: ['data'],
  fetchMyParkingFailure: ['error'],
})

export const MyParkingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  result: {
    current: [],
    history: []
  },
  fetching: false,
  erorr: null
})

/* ------------- Reducers ------------- */
export const request = (state) => state.merge({
  fetching: true,
  result: {
    current: [],
    history: []
} })

export const success = (state, action) => {
  const { data } = action;
  return state.merge({
    fetching: false, result: data
  });
}

export const failure = (state, { error }) => state.merge({ fetching: false, error });
// we've logged out
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_MY_PARKING]: request,
  [Types.FETCH_MY_PARKING_SUCCESS]: success,
  [Types.FETCH_MY_PARKING_FAILURE]: failure
})
