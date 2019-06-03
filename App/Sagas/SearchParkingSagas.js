import { call, put } from 'redux-saga/effects'
import SearchParkingActions from '../Redux/SearchParking'

// attempts to login
export function* searchParkingLots(api, { search, per_page, page }) {
  try {
    const response = yield call(api.searchParkingLots, { search, per_page, page });
    if (response.status === 200 && response.data) {
      yield put(SearchParkingActions.fetchParkingLotsSuccess(response.data, page, parseInt(response.headers['x-total'], 10)));
    } else {
      yield put(SearchParkingActions.fetchParkingLotsFailure(response.error));
    }
  } catch (error) {
    console.log('login saga error', error);
    const { response } = error;
    if (!response || response.status !== 401) {
      yield put(SearchParkingActions.fetchParkingLotsFailure(response.error));
    } else if (response.status === 401) {
      yield put(SearchParkingActions.fetchParkingLotsFailure(response.error));
    }
  }
}

export function* fetchParkingLot(api, { id }) {
  if (!id) {
    yield put(SearchParkingActions.fetchFailure('Invalid request'));
  } else {
    try {
      const response = yield call(api.fetchParkingLot, { id });
      if (response.status === 200 && response.data) {
        yield put(SearchParkingActions.fetchParkingLotSuccess(response.data));
      } else {
        yield put(SearchParkingActions.fetchParkingLotFailure(response.error));
      }
    } catch (error) {
      console.log('login saga error', error);
      const { response } = error;
      if (!response || response.status !== 401) {
        yield put(SearchParkingActions.fetchParkingLotFailure(response.error));
      } else if (response.status === 401) {
        yield put(SearchParkingActions.fetchParkingLotFailure(response.error));
      }
    }
  }
}

export default {
  searchParkingLots,
  fetchParkingLot
};
