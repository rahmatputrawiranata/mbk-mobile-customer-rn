import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {HeaderBackComponent} from 'src/component/HeaderBackComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PageWrapperComponent} from 'src/component/PageWrapperComponent';
import {ButtonComponent} from 'src/component/ButtonComponent';
import Color from 'src/constants/Color';
import AuthContext from 'src/utils/AuthContext';
import {request} from 'src/helper/request';

export const ProfileScreen = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);
  const [user, setUser] = React.useState([]);
  React.useEffect(() => {
    request('/profile', 'GET').then((res) => {
      console.log(res.data);
      setUser(res.data);
    });
  }, []);

  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderBackComponent title="Profile" navigateBack={navigateBack} />
      <PageWrapperComponent>
        <View style={styles.contentWrapper}>
          <View style={styles.content}>
            <View style={styles.listContentWrapper}>
              <Text style={styles.titleStyleContent}>Username</Text>
              <Text style={styles.textContentStyle}>
                {user ? user.username : ''}
              </Text>
            </View>
            <View style={styles.listContentWrapper}>
              <Text style={styles.titleStyleContent}>Phone Number</Text>
              <Text style={styles.textContentStyle}>
                {user ? user.phone : ''}
              </Text>
            </View>
            <View style={styles.listContentWrapper}>
              <Text style={styles.titleStyleContent}>Full Name</Text>
              <Text style={styles.textContentStyle}>
                {user ? user.full_name : ''}
              </Text>
            </View>
            <View style={styles.listContentWrapper}>
              <Text>Email</Text>
              <Text>{user ? user.email : ''}</Text>
            </View>
            <View style={styles.listContentWrapper}>
              <Text style={styles.titleStyleContent}>Branch</Text>
              <Text style={styles.textContentStyle}>
                {user ? user.branch : ''}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <ButtonComponent onPress={() => null} title="Edit Profile" />
          <View style={styles.divider} />
          <ButtonComponent onPress={() => signOut()} title="Sign Out" />
        </View>
      </PageWrapperComponent>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    paddingTop: 20,
  },
  listContentWrapper: {
    paddingVertical: 5,
  },
  titleStyleContent: {
    fontSize: 16,
    fontWeight: 'normal',
    color: Color.dark,
  },
  textContentStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.dark,
  },
  buttonWrapper: {
    paddingVertical: 20,
  },
  divider: {
    height: 20,
  },
});
