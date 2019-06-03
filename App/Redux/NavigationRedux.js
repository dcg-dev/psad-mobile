import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateNavRequest: ['name'],
})

export const SearchParkingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  currentNav: 'SearchParkingScreen'
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const updateNav = (state, action) => {
  const { name } = action
  return state.merge({ currentNav: name })
}

// we've logged out
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_NAV_REQUEST]: updateNav,
})
