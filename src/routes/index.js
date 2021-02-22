import React, {useEffect, useRef} from 'react';
import {AuthNavigator} from './AuthStackNavigator';
import {AppNavigator} from './MainStackNavigator';

//Redux
import {updateUser} from '../actions/userActions';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {request} from 'src/helper/request';

const Routes = (props) => {
  const ref = useRef();
  const loginStatus = useSelector((state) => state.user.loginStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getToken() {
      let data = await AsyncStorage.getItem('userToken');

      if (data) {
        requestProfile();
      }
    }

    getToken();
  });

  const requestProfile = async () => {
    request('/profile')
      .then((response) => {
        dispatch(updateUser(response.data));
      })
      .catch((err) => {});
  };

  if (loginStatus === -1) {
  }

  ref && ref.current && ref.current.animateNextTransition();

  return loginStatus === 1 ? <AppNavigator /> : <AuthNavigator />;
};

export default Routes;
