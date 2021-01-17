import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from 'src/screen/auth/LoginScreen';
import {RegisterScreen} from 'src/screen/auth/RegisterScreen';

const {Navigator, Screen} = createStackNavigator();

export const AuthNavigator = () => (
  <Navigator headerMode="none">
    <Screen name="Login" component={LoginScreen} />
    <Screen name="Register" component={RegisterScreen} />
  </Navigator>
);
