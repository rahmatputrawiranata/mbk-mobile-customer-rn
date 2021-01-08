import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
} from 'react-native';
import Color from '../../../src/constants/Color';
import IconMenuComponent from '../../component/iconMenu.component';

const screen = Dimensions.get('window');

const headerSpace = 50;

export const HomeScreen = ({navigation}) => {
  const navigateReport = () => {
    navigation.navigate('Report');
  };

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <View style={styles.headerWrapper}>
          <View style={styles.header}>
            <Text style={styles.headerTextStyle}>Hi Yunip!!</Text>
          </View>
        </View>
        <View style={styles.bannerWrapper}>
          <Image
            style={styles.imageBanner}
            resizeMode="stretch"
            source={require('../../assets/images/home.png')}
          />
        </View>
        <View style={styles.banner} />
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
            onPress={() => null}
          />
          <IconMenuComponent
            wrapperStyle={styles.iconMenuWrapper}
            title="Profile"
            iconName="file-text"
            onPress={() => null}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: screen.height,
    backgroundColor: Color.secondary,
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
    fontSize: 28,
    fontWeight: 'bold',
    color: Color.light,
  },
  banner: {
    height: screen.height - 200,
  },
  bannerWrapper: {
    position: 'absolute',
    top: headerSpace,
    left: 0,
    right: 0,
    bottom: 0,
  },
  imageBanner: {
    height: screen.height - 170 + headerSpace,
    width: screen.width,
  },
  menu: {
    backgroundColor: Color.darkRed,
    height: 200,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconMenuWrapper: {
    width: screen.width / 3 - 45,
    height: screen.width / 3 - 45,
  },
});
