import React from 'react';
import {
  FlatList,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ButtonComponent} from 'src/component/ButtonComponent';
import {TextInputComponent} from 'src/component/forms/TextInputComponent';
import {SelectComponent} from 'src/component/forms/SelectComponent';
import {ScrollView} from 'react-native-gesture-handler';
import {
  ModalSelectComponent,
  ModalOptionComponent,
} from 'src/component/forms/ModalSelectComponent';
import {request, requestPublic} from 'src/helper/request';
import Snackbar from 'react-native-snackbar';

//Redux
import {updateUser} from '../../actions/userActions';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screen = Dimensions.get('window');

export const RegisterScreen = ({navigation}) => {
  const [userName, onChangeUsername] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [phone, onChangePhone] = React.useState('');
  const [fullName, onChangeFullName] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [cPassword, onChangeCPassword] = React.useState('');

  const dispatch = useDispatch();

  const [countrySelectedData, setCountrySelectedData] = React.useState({
    modalOpen: false,
    selected: false,
    selectedId: null,
    selectedText: '',
    data: [],
  });

  const [provinceSelectedData, setProvinceSelectedData] = React.useState({
    modalOpen: false,
    selected: false,
    selectedId: null,
    selectedText: '',
    data: [],
  });

  const [citySelectedData, setCitySelectedData] = React.useState({
    modalOpen: false,
    selected: false,
    selectedId: null,
    selectedText: '',
    data: [],
  });

  const [branchSelectedData, setBranchSelectedData] = React.useState({
    modalOpen: false,
    selected: false,
    selectedId: null,
    selectedText: '',
    data: [],
  });

  const requestSignUp = async () => {
    request(
      '/auth/register',
      'POST',
      JSON.stringify({
        username: userName,
        password: password,
        email: email,
        phone: phone,
        full_name: fullName,
        c_password: cPassword,
        branch_id: branchSelectedData.selectedId,
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
        return Snackbar.show({
          text: err,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'red',
        });
      });
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

  const navigateLogin = () => {
    navigation.navigate('Login');
  };

  const openCountryModal = async () => {
    try {
      let data = await requestPublic('/data-lokasi/country/all');
      setCountrySelectedData({
        ...countrySelectedData,
        data: data.data,
        modalOpen: true,
      });
    } catch (err) {}
  };

  const openProvinceModal = async () => {
    try {
      if (!countrySelectedData.selected) {
        return Snackbar.show({
          text: 'Select Country First',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'red',
        });
      }
      let data = await requestPublic(
        '/data-lokasi/province/all/' + countrySelectedData.selectedId,
      );
      setProvinceSelectedData({
        ...provinceSelectedData,
        data: data.data,
        modalOpen: true,
      });
    } catch (err) {}
  };

  const openCityModal = async () => {
    try {
      if (!provinceSelectedData.selected) {
        return Snackbar.show({
          text: 'Select Province First',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'red',
        });
      }
      let data = await requestPublic(
        '/data-lokasi/city/all/' + provinceSelectedData.selectedId,
      );
      setCitySelectedData({
        ...citySelectedData,
        data: data.data,
        modalOpen: true,
      });
    } catch (err) {}
  };

  const openBranchModal = async () => {
    try {
      if (!citySelectedData.selected) {
        return Snackbar.show({
          text: 'Select City First',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'red',
        });
      }
      let data = await requestPublic(
        '/data-lokasi/branch/all/' + citySelectedData.selectedId,
      );
      setBranchSelectedData({
        ...branchSelectedData,
        data: data.data,
        modalOpen: true,
      });
    } catch (err) {}
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView>
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
              <SelectComponent
                placeholder="Country"
                onPress={openCountryModal}
                selected={countrySelectedData.selected}
                text={countrySelectedData.selectedText}
              />
              <SelectComponent
                placeholder="Province"
                onPress={openProvinceModal}
                selected={provinceSelectedData.selected}
                text={provinceSelectedData.selectedText}
              />
              <SelectComponent
                placeholder="City"
                onPress={openCityModal}
                selected={citySelectedData.selected}
                text={citySelectedData.selectedText}
              />
              <SelectComponent
                placeholder="Branch"
                onPress={openBranchModal}
                selected={branchSelectedData.selected}
                text={branchSelectedData.selectedText}
              />
              <TextInputComponent
                placeholder="Username"
                onChangeText={(value) => onChangeUsername(value)}
                value={userName}
              />
              <TextInputComponent
                placeholder="Email"
                onChangeText={(value) => onChangeEmail(value)}
                value={email}
                keyboardType="email-address"
              />
              <TextInputComponent
                placeholder="Phone"
                onChangeText={(value) => onChangePhone(value)}
                value={phone}
                keyboardType="phone-pad"
              />
              <TextInputComponent
                placeholder="Full Name"
                onChangeText={(value) => onChangeFullName(value)}
                value={fullName}
              />
              <TextInputComponent
                placeholder="Password"
                onChangeText={(value) => onChangePassword(value)}
                value={password}
                secureTextEntry={true}
              />
              <TextInputComponent
                placeholder="Password Confirmation"
                onChangeText={(value) => onChangeCPassword(value)}
                value={cPassword}
                secureTextEntry={true}
              />
            </View>

            <ButtonComponent onPress={requestSignUp} title="SignUp" />
            <Text style={styles.orText}>or</Text>
            <ButtonComponent onPress={navigateLogin} title="SignIn" />
          </View>
        </View>
      </ScrollView>

      <ModalSelectComponent
        isVisible={countrySelectedData.modalOpen}
        closeButton={() =>
          setCountrySelectedData({
            ...countrySelectedData,
            modalOpen: false,
          })
        }>
        <FlatList
          keyExtractor={(item) => item.id}
          data={countrySelectedData.data}
          renderItem={({item}) => (
            <ModalOptionComponent
              title={item.name}
              selected={
                item.id === countrySelectedData.selectedId ? true : false
              }
              onPress={() => {
                setCountrySelectedData({
                  ...countrySelectedData,
                  modalOpen: false,
                  selected: true,
                  selectedId: item.id,
                  selectedText: item.name,
                });

                setProvinceSelectedData({
                  ...provinceSelectedData,
                  selected: false,
                  selectedId: null,
                  selectedText: '',
                  data: [],
                });

                setCitySelectedData({
                  ...citySelectedData,
                  selected: false,
                  selectedId: null,
                  selectedText: '',
                  data: [],
                });

                setBranchSelectedData({
                  ...branchSelectedData,
                  selected: false,
                  selectedId: null,
                  selectedText: '',
                  data: [],
                });
              }}
            />
          )}
        />
      </ModalSelectComponent>

      <ModalSelectComponent
        isVisible={provinceSelectedData.modalOpen}
        closeButton={() =>
          setProvinceSelectedData({
            ...provinceSelectedData,
            modalOpen: false,
          })
        }>
        <FlatList
          keyExtractor={(item) => item.id}
          data={provinceSelectedData.data}
          renderItem={({item}) => (
            <ModalOptionComponent
              title={item.name}
              selected={
                item.id === provinceSelectedData.selectedId ? true : false
              }
              onPress={() => {
                setProvinceSelectedData({
                  ...provinceSelectedData,
                  modalOpen: false,
                  selected: true,
                  selectedId: item.id,
                  selectedText: item.name,
                });
                setCitySelectedData({
                  ...citySelectedData,
                  selected: false,
                  selectedId: null,
                  selectedText: '',
                  data: [],
                });

                setBranchSelectedData({
                  ...branchSelectedData,
                  selected: false,
                  selectedId: null,
                  selectedText: '',
                  data: [],
                });
              }}
            />
          )}
        />
      </ModalSelectComponent>

      <ModalSelectComponent
        isVisible={citySelectedData.modalOpen}
        closeButton={() =>
          setCitySelectedData({
            ...citySelectedData,
            modalOpen: false,
          })
        }>
        <FlatList
          keyExtractor={(item) => item.id}
          data={citySelectedData.data}
          renderItem={({item}) => (
            <ModalOptionComponent
              title={item.name}
              selected={item.id === citySelectedData.selectedId ? true : false}
              onPress={() => {
                setCitySelectedData({
                  ...citySelectedData,
                  modalOpen: false,
                  selected: true,
                  selectedId: item.id,
                  selectedText: item.name,
                });
                setBranchSelectedData({
                  ...branchSelectedData,
                  selected: false,
                  selectedId: null,
                  selectedText: '',
                  data: [],
                });
              }}
            />
          )}
        />
      </ModalSelectComponent>

      <ModalSelectComponent
        isVisible={branchSelectedData.modalOpen}
        closeButton={() =>
          setBranchSelectedData({
            ...branchSelectedData,
            modalOpen: false,
          })
        }>
        <FlatList
          keyExtractor={(item) => item.id}
          data={branchSelectedData.data}
          renderItem={({item}) => (
            <ModalOptionComponent
              title={item.name}
              selected={
                item.id === branchSelectedData.selectedId ? true : false
              }
              onPress={() =>
                setBranchSelectedData({
                  ...branchSelectedData,
                  modalOpen: false,
                  selected: true,
                  selectedId: item.id,
                  selectedText: item.name,
                })
              }
            />
          )}
        />
      </ModalSelectComponent>
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
