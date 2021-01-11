import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {reducer, initialState} from './reducer';
import SplashScreen from './screen/splash/SplashScreen';
import AuthContext from 'mbk_app/utils/AuthContext';
import BaseUrl from 'mbk_app/constants/BaseUrl';
import Snackbar from 'react-native-snackbar';
import {AppNavigator} from 'mbk_app/routes/MainStackNavigator';
import {request} from './helper/request';
import {AuthNavigator} from 'mbk_app/routes/AuthStackNavigator';

const Stack = createStackNavigator();

export default ({navigation}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      let userProfile;

      try {
        userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          userProfile = await request('/profile');
          if (userProfile.status_code === 401) {
            userToken = null;
            userProfile = null;
          }
        }
      } catch (e) {}

      dispatch({type: 'RESTORE_TOKEN', token: userToken, user: userProfile});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        let userToken;
        let userProfile;
        try {
          await AsyncStorage.clear();
          let response = await fetch(BaseUrl.api_url + '/auth/login', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: data.username,
              password: data.password,
            }),
          });

          let jsonToken = await response.json();

          if (jsonToken.status !== 'success') {
            return Snackbar.show({
              text: jsonToken.message,
              duration: Snackbar.LENGTH_SHORT,
              backgroundColor: 'red',
            });
          }

          userToken = await jsonToken.data.access_token;

          await AsyncStorage.setItem('userToken', userToken);

          userProfile = await request('/profile');
          if (userProfile.status_code === 401) {
            userToken = null;
            userProfile = null;
          }

          userProfile = userProfile.data;
        } catch (error) {
          console.log('error', JSON.stringify(error));
        }

        dispatch({
          type: 'SIGN_IN',
          token: userToken,
          user: userProfile,
        });
      },
      signOut: async () => {
        await AsyncStorage.clear();
        dispatch({type: 'SIGN_OUT'});
      },
      signUp: async (data) => {
        let userToken;
        let userProfile;
        try {
          let response = await request(
            '/auth/register',
            'POST',
            JSON.stringify({
              username: data.username,
              full_name: data.full_name,
              phone: data.phone,
              email: data.email,
              password: data.password,
              c_password: data.c_password,
              branch_id: data.branch_id,
            }),
          );

          let jsonToken = await response;

          if (jsonToken.status !== 'success') {
            return Snackbar.show({
              text: jsonToken.message,
              duration: Snackbar.LENGTH_SHORT,
              backgroundColor: 'red',
            });
          }

          userToken = await jsonToken.data.access_token;
          console.log('userToken', userToken);
          await AsyncStorage.setItem('userToken', userToken);

          userProfile = await request('/profile');
          if (userProfile.status_code === 401) {
            userToken = null;
            userProfile = null;
            return Snackbar.show({
              text: userProfile.message,
              duration: Snackbar.LENGTH_SHORT,
              backgroundColor: 'red',
            });
          }

          console.log('userProfile', userProfile);

          userProfile = await userProfile.data;
          console.log(userProfile);
          dispatch({
            type: 'SIGN_IN',
            token: userToken,
            user: userProfile,
          });
        } catch (e) {
          console.log(JSON.stringify(e));
        }
      },
    }),
    [],
  );

  const stateConditionString = () => {
    let navigateTo = '';
    if (state.isLoading) {
      navigateTo = 'LOAD_APP';
    }
    if (state.userToken && !state.isLoading && state.userProfile) {
      navigateTo = 'LOAD_HOME';
    }
    if (
      !state.userToken &&
      !state.isSignedUp &&
      !state.isLoading &&
      !state.userProfile
    ) {
      navigateTo = 'LOAD_AUTH';
    }
    if (
      !state.userToken &&
      state.isSignedUp &&
      !state.isLoading &&
      !state.userProfile
    ) {
      navigateTo = 'LOAD_AUTH';
    }
    return navigateTo;
  };

  const chooseScreen = () => {
    console.log('state', state);
    let navigateTo = stateConditionString(state);
    let arr = [];

    switch (navigateTo) {
      case 'LOAD_APP':
        arr.push(
          <Stack.Screen
            name="Splash"
            options={{headerShown: false}}
            component={SplashScreen}
          />,
        );
        break;
      case 'LOAD_HOME':
        arr.push(
          <Stack.Screen
            name="Home"
            component={AppNavigator}
            options={{
              headerMode: 'screen',
              headerShown: false,
            }}
          />,
        );
        break;
      case 'LOAD_AUTH':
        arr.push(
          <Stack.Screen
            name="Login"
            component={AuthNavigator}
            options={{
              headerMode: 'screen',
              headerShown: false,
            }}
          />,
        );
        break;
      default:
        arr.push(
          <Stack.Screen
            name="Login"
            component={AuthNavigator}
            options={{
              headerMode: 'screen',
              headerShown: false,
            }}
          />,
        );
        break;
    }
    console.log(arr[0]);
    return arr[0];
  };

  return (
    <AuthContext.Provider value={authContext}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator>{chooseScreen(state)}</Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </AuthContext.Provider>
  );
};
