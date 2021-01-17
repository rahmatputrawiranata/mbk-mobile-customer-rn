import React from 'react';
import {View, Text, Dimensions, StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ButtonComponent} from 'src/component/ButtonComponent';
import {TextInputComponent} from 'src/component/forms/TextInputComponent';
const screen = Dimensions.get('window');
import AuthContext from 'src/utils/AuthContext';

export const LoginScreen = ({navigation}) => {
  const [userName, onChangeUsernmae] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const {signIn} = React.useContext(AuthContext);

  const requestLogin = async () => {
    signIn({username: userName, password: password});
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
