import { call, put } from 'redux-saga/effects'
import MyParkingAction from '../Redux/MyParking'

// attempts to login
export function* fetchMyParking(api, { filter }) {
  try {
    const response = yield call(api.fetchMyParking, { filter });
    if (response.status === 200 && response.data.result) {
      yield put(MyParkingAction.fetchMyParkingSuccess(response.data.result));
    } else {
      yield put(MyParkingAction.fetchMyParkingFailure(response.error));
    }
  } catch (error) {
    console.log('login saga error', error);
    const { response } = error;
    if (!response || response.status !== 401) {
      yield put(MyParkingAction.fetchFailure(response.error));
    } else if (response.status === 401) {
      yield put(MyParkingAction.fetchFailure(response.error));
    }
  }
}

export default {
  fetchMyParking,
};
