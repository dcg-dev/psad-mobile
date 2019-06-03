import { call, put } from 'redux-saga/effects'
import ParkingFiltersActions from '../Redux/ParkingFilter'

// attempts to login
export function* updateFilters(api, { data }) {
  yield put(ParkingFiltersActions.updateSuccess(data))
}

export default {
  updateFilters,
};
