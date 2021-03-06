import config from '../../../utils/Config'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import { Alert } from 'react-native'

export const setLogin = (data, callback) => async dispatch => {
  try {
    const res = await axios.post(config.APP_BACKEND.concat('user/login'), data)
    console.log(res.data)
    if (res.data.success === true) {
      await AsyncStorage.setItem('id', `${res.data.data.id}`);
      await AsyncStorage.setItem('token', res.data.token);
      console.log(await AsyncStorage.getItem('token'))
      dispatch({
        type: 'IS_LOGIN',
        payload: res.data,
      })
    } else {
      Alert.alert('wrong username / password')
    }
  } catch (error) {
    console.log(error)
  }
};

export const setLogout = () => async dispatch => {
  const removeToken = await AsyncStorage.removeItem('token');
  try {
    removeToken;
    dispatch({
      type: 'SET_LOGOUT',
    });
  } catch (error) {
    console.log(error);
  }
};

export const setVerification = (data) => async dispatch => {
  const res = await axios.post(config.APP_BACKEND.concat(`auth/forgot-password`), data)
  dispatch({
    type: 'SET_PASSWORD',
    payload: res.data
  })
}