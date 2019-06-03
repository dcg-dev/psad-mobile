import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchParkingLots: ['search', 'per_page', 'page'],
  fetchParkingLotsSuccess: ['data', 'page', 'total'],
  fetchParkingLotsFailure: ['error'],
  fetchParkingLot: ['id'],
  fetchParkingLotSuccess: ['parking'],
  fetchParkingLotFailure: ['error']
})

export const SearchParkingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  parkingLots: [],
  next_page: 1,
  per_page: 10,
  total: null,
  reached: false,
  error: null,
  fetching: false,
  parking: null,
  previews: []
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state) => state.merge({ fetching: true })

// we've successfully logged in
export const success = (state, action) => {
  const { data, page, total } = action;
  
  let parkingLots = []

  if (page === 1) {
    parkingLots = data
  } else {
    parkingLots = [...state.parkingLots, ...data]
  }

  let reached = false
  if (parkingLots.length >= total) {
    reached = true
  }
  
  return state.merge({
    fetching: false, parkingLots, reached, total, next_page: page + 1, error: null,
  });
};

// we've had a problem logging in
export const failure = (state, { error }) => state.merge({ fetching: false, error, parkingLots: [] });

export const fetchParkingItem = (state) => state.merge({ fetching: true })

export const fetchSuccess = (state, action) => {
  const { parking } = action;
  return state.merge({
    fetching: false, parking, error: null,
  });
}

export const fetchFailure = (state, { error }) => state.merge({ fetching: false, error, parking: null });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_PARKING_LOTS]: request,
  [Types.FETCH_PARKING_LOTS_SUCCESS]: success,
  [Types.FETCH_PARKING_LOTS_FAILURE]: failure,

  [Types.FETCH_PARKING_LOT]: fetchParkingItem,
  [Types.FETCH_PARKING_LOT_SUCCESS]: fetchSuccess,
  [Types.FETCH_PARKING_LOT_FAILURE]: fetchFailure,
})
