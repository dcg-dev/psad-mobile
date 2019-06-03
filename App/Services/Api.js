/* eslint-disable camelcase */
import ajax from './AxiosService';
import { clearStorage } from './AsyncStorage';
const ApiService = (function () {
  /** Authorization */

  const signup = ({ user }) => {
    return ajax.post('/api/v1/users/sign_up', { user });
  };

  const resetPassword = ({ email }) => {
    return ajax.post('/api/v1/users/send_reset_password_instructions', { user: { email} });
  }

  const sendConfirmCode = ({ data }) => {
    return ajax.put('/api/v1/users/confirm', { user: data });
  }
  const resendConfirmCode = ({ email }) => {
    return ajax.post('/api/v1/users/send_confirmation_instructions', { user: { email} });
  }
  
  const login = ({ email, password }) => {
    return ajax.post('/api/v1/users/sign_in', { user: { email, password } });
  };

  const logout = async () => {
    let response = {
      status: 200,
    };
    await clearStorage()
    return Promise.resolve(response);
  }

  const getUser = () => {
    return ajax.get('/api/v1/users/me')
  }

  const searchParkingLots = ({ search, per_page, page }) => {
    return ajax.get(`/api/v1/parking_lots?per_page=${per_page}&page=${page}${search ? `&query=${search}` : ''}`)
  };

  const fetchParkingLot = ({ id }) => {
    return ajax.get(`/api/v1/parking_lots/${id}`)
  }

  const fetchMyParking = ({ filter }) => {
    let response = {
      status: 200,
      error: null,
    };
    const historyParkings = require('../Fixtures/myParkingHistory.json')
    const history = historyParkings.filter(item =>
      (!filter.plateNumber.length || filter.plateNumber.includes(item.plateNumber)) &&
      (!filter.date.length || filter.date.includes(item.date)) &&
      (!filter.parkingLot.length || filter.parkingLot.includes(item.parkingLot))
    )
    response.data = {
      result: {
        current: [],
        history
      }
    }
    return Promise.resolve(response);
  }

  return {
    // a list of the API functions
    signup,
    resetPassword,
    sendConfirmCode,
    resendConfirmCode,
    login,
    logout,
    getUser,
    searchParkingLots,
    fetchParkingLot,
    fetchMyParking
  };
});

// let's return back our create method as the default.
export default ApiService();
