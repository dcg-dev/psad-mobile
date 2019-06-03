import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateFilters: ['data'],
  updateSuccess: ['data']
})

export const ParkingFilterTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  filter: {
    plateNumber: [],
    date: [],
    parkingLot: []
  },
  updating: false
})

/* ------------- Reducers ------------- */
export const request = (state) => {
  console.log('request', state.merge({ updating: true }))
  return state.merge({ updating: true })
}

export const success = (state, action) => {
  const { data } = action;
  return state.merge({
    updating: false, filter: data
  });
}
// we've logged out
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_FILTERS]: request,
  [Types.UPDATE_SUCCESS]: success
})
