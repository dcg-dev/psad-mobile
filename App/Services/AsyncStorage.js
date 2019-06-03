import { AsyncStorage } from 'react-native';
import ajax from './AxiosService';

export async function storeToken(token) {
  ajax.setAuthorizationToken(token);
  await AsyncStorage.setItem('token', token);
}

export async function setStorage(name, value) {
  await AsyncStorage.setItem(name, value);
}
export async function getStorage(name) {
  return await AsyncStorage.getItem(name);
}

export async function retrieveToken() {
  const storedToken = await AsyncStorage.getItem('token');
  ajax.setAuthorizationToken(storedToken);
  return storedToken;
}

export async function storeUserInfo(userInfo) {
  const storageData = [];
  const { email } = userInfo;
  if (email) storageData.push(['email', email]);
  await AsyncStorage.multiSet(storageData);
}

export async function retrieveUserInfo() {
  const userInfo = await AsyncStorage.multiGet(['email']);
  const email = userInfo[0][1];
  return {
    email,
  };
}

export async function clearStorage() {
  ajax.setAuthorizationToken(null);
  const keys = await AsyncStorage.getAllKeys();
  return AsyncStorage.multiRemove(keys);
}
