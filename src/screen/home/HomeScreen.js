import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
} from 'react-native';
import Color from '../../constants/Color';
import IconMenuComponent from 'src/component/IconMenuComponent';

const screen = Dimensions.get('window');

const headerSpace = 50;

const menuBottomHeight = 150;

export const HomeScreen = ({navigation}) => {
  const navigateReport = () => {
    navigation.navigate('ReportNavigator');
  };

  const navigateProfile = () => {
    navigation.navigate('Profile');
  };

  const navigateCreateReport = () => {
    navigation.navigate('CreateReportNavigator');
  };

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <View style={styles.headerWrapper}>
          <View style={styles.header}>
            <Text style={styles.headerTextStyle}>Hi !</Text>
          </View>
        </View>
        <View style={styles.bannerWrapper}>
          <Image
            style={styles.imageBanner}
            resizeMode="contain"
            source={require('src/assets/images/home.png')}
          />
        </View>
        <View style={styles.banner} />
        <View style={styles.menuWrapper}>
          <View style={styles.menu}>
            <IconMenuComponent
              wrapperStyle={styles.iconMenuWrapper}
              title="Report"
              iconName="file-text"
              onPress={navigateReport}
            />
            <IconMenuComponent
              wrapperStyle={styles.iconMenuWrapper}
              title="Create Report"
              iconName="file-text"
              onPress={navigateCreateReport}
            />
            <IconMenuComponent
              wrapperStyle={styles.iconMenuWrapper}
              title="Profile"
              iconName="file-text"
              onPress={navigateProfile}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: screen.height,
    backgroundColor: Color.light,
  },
  header: {
    height: headerSpace,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerTextStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Color.primary,
  },
  bannerWrapper: {
    position: 'absolute',
    top: headerSpace,
    left: 0,
    right: 0,
  },
  imageBanner: {
    height: 400,
    width: screen.width - 40,
    alignSelf: 'center',
  },
  banner: {
    height: screen.height - 170,
  },
  menuWrapper: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2.0,
  },
  menu: {
    borderWidth: 0.1,
    backgroundColor: Color.light,
    height: menuBottomHeight,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 24,
  },
  iconMenuWrapper: {
    width: screen.width / 3 - 60,
    height: screen.width / 3 - 60,
  },
});
