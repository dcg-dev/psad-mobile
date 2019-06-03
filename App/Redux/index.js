import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    nav: require('./NavigationRedux').reducer,
    signup: require('./RegisterRedux').reducer,
    login: require('./LoginRedux').reducer,
    user: require('./UserRedux').reducer,
    search: require('./SearchRedux').reducer,
    parkings: require('./SearchParking').reducer,
    parkingFilters: require('./ParkingFilter').reducer,
    myParkings: require('./MyParking').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
