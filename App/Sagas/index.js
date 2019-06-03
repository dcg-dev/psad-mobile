import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { SignupTypes } from '../Redux/RegisterRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { UserTypes } from '../Redux/UserRedux'
import { SearchParkingTypes } from '../Redux/SearchParking'
import { ParkingFilterTypes } from '../Redux/ParkingFilter'
import { MyParkingTypes } from '../Redux/MyParking'
/* ------------- Sagas ------------- */

import { signup, sendConfirm, resendConfirmCode, resetPassword } from './RegisterSaga'
import { login, logout } from './LoginSagas'
import { getUser } from './UserSagas'
import { searchParkingLots, fetchParkingLot } from './SearchParkingSagas'
import { updateFilters } from './ParkingFilterSaga'
import { fetchMyParking } from './MyParkingSaga'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API;

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(SignupTypes.SIGNUP_REQUEST, signup, api),
    takeLatest(SignupTypes.CONFIRM_REQUEST, sendConfirm, api),
    takeLatest(SignupTypes.RESEND_REQUEST, resendConfirmCode, api),
    takeLatest(SignupTypes.RESET_PASSWORD_REQUEST, resetPassword, api),

    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT, logout, api),

    takeLatest(UserTypes.USER_REQUEST, getUser, api),

    takeLatest(SearchParkingTypes.FETCH_PARKING_LOTS, searchParkingLots, api),
    takeLatest(SearchParkingTypes.FETCH_PARKING_LOT, fetchParkingLot, api),
    takeLatest(ParkingFilterTypes.UPDATE_FILTERS, updateFilters, api),
    takeLatest(MyParkingTypes.FETCH_MY_PARKING, fetchMyParking, api)
  ])
}
