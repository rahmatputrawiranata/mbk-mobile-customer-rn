import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Text, Dimensions, StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ButtonComponent} from 'src/component/ButtonComponent';
import {TextInputComponent} from 'src/component/forms/TextInputComponent';
import {request} from 'src/helper/request';
const screen = Dimensions.get('window');
//Redux
import {updateUser} from '../../actions/userActions';
import {useDispatch} from 'react-redux';
import Snackbar from 'react-native-snackbar';

export const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [userName, onChangeUsernmae] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  // const {signIn} = React.useContext(AuthContext);
  const requestLogin = async () => {
    if (!userName) {
      return Snackbar.show({
        text: 'Username required',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
      });
    }

    if (!password) {
      return Snackbar.show({
        text: 'Password required',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
      });
    }
    request(
      '/auth/login',
      'POST',
      JSON.stringify({
        username: userName,
        password: password,
      }),
    )
      .then((response) => {
        let token = AsyncStorage.setItem(
          'userToken',
          response.data.access_token,
        );
        if (token) {
          requestProfile();
        }
      })
      .catch((err) => {
        console.log('error', err);
        return Snackbar.show({
          text: err,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'red',
        });
      });
    // signIn({username: userName, password: password});
  };

  const requestProfile = async () => {
    request('/profile')
      .then((response) => {
        dispatch(updateUser(response.data));
      })
      .catch((err) => {
        return Snackbar.show({
          text: err,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'red',
        });
      });
  };

  const navigateRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.logoWrapper}>
          <Image
            source={require('src/assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.formWrapper}>
          <View style={styles.formContainer}>
            <TextInputComponent
              placeholder="Username, Email or Phone Number"
              onChangeText={(value) => onChangeUsernmae(value)}
              value={userName}
            />
            <TextInputComponent
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(value) => onChangePassword(value)}
              value={password}
            />
          </View>

          <ButtonComponent onPress={requestLogin} title="SignIn" />
          <Text style={styles.orText}>or</Text>
          <ButtonComponent onPress={navigateRegister} title="SignUp" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    marginHorizontal: 20,
    flex: 1,
  },
  logoWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: screen.width / 2,
    height: screen.height / 4,
    alignSelf: 'center',
  },
  formContainer: {
    marginBottom: 30,
  },
  formWrapper: {
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    marginVertical: 20,
    padding: 20,
    shadowColor: '#000',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  orText: {
    textAlign: 'center',
    paddingVertical: 5,
    fontSize: 16,
  },
});
