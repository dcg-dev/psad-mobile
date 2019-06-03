import { call, put } from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'

// attempts to login
export function* getUser(api, {}) {
	try {
		const response = yield call(api.getUser, {});
		if (response.status === 200 && response.data) {
			yield put(UserActions.userSuccess(response.data));
		} else {
			yield put(UserActions.userFailure(response.error));
		}
	} catch (error) {
		const { response } = error;
		if (!response || response.status !== 401) {
			yield put(UserActions.userFailure(response.data.errors));
		} else if (response.status === 401) {
			yield put(UserActions.userFailure(response.data.errors));
		}
	}
}

export default {
  getUser
};
