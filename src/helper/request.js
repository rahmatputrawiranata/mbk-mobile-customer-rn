import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseUrl from 'src/constants/BaseUrl';
import Snackbar from 'react-native-snackbar';

// export const request = async (param, method = 'GET', data = null) => {
//   // const {signOut} = React.useContext(AuthContext);
//   let userToken = await AsyncStorage.getItem('userToken');
//   try {
//     let response = await fetch(BaseUrl.api_url + param, {
//       method: method,
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer ' + userToken,
//       },
//       body: data,
//     });

//     let json = await response.json();

//     if (json.status_code === 401) {
//       throw json;
//     }

//     if (json.status !== 'success') {
//       throw json;
//     }

//     return json;
//   } catch (error) {
//     console.log(JSON.stringify(error));
//     return error;
//   }
// };

export const request = (param, method = 'GET', data = null) => {
  return new Promise(async (resolve, reject) => {
    let token = await AsyncStorage.getItem('userToken');
    fetch(BaseUrl.api_url + param, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: data,
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.status !== 'success') {
          reject(json.message ?? 'Something when wrong');
        }
        resolve(json);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

export const requestPublic = async (param, method = 'GET', data = null) => {
  // const {signOut} = React.useContext(AuthContext);
  let userToken = await AsyncStorage.getItem('userToken');
  try {
    let response = await fetch(BaseUrl.api_url_public + param, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
      body: data,
    });

    let json = await response.json();

    if (json.status_code === 401) {
      // signOut();
    }

    if (json.status !== 'success') {
      return Snackbar.show({
        text: json.message,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
      });
    }

    return json;
  } catch (error) {}
};
