import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from 'mbk_app/screen/auth/LoginScreen';
import {RegisterScreen} from 'mbk_app/screen/auth/RegisterScreen';

const {Navigator, Screen} = createStackNavigator();

export const AuthNavigator = () => (
  <Navigator headerMode="none">
    <Screen name="Login" component={LoginScreen} />
    <Screen name="Register" component={RegisterScreen} />
  </Navigator>
);
