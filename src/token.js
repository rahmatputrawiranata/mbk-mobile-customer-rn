import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAuthToken = async () => {
  try {
    let token = await AsyncStorage.getItem('userToken');
    if (token != null) {
      return token;
    }
    return null;
  } catch (err) {
    return null;
  }
};
