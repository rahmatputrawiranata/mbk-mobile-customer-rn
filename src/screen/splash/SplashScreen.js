import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
export default () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={require('mbk_app/assets/images/logo.png')}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
  },
});
