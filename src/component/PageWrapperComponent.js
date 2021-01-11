import React from 'react';
import {View, StyleSheet} from 'react-native';
import Color from '../constants/Color';
export const PageWrapperComponent = (props) => (
  <View style={styles.wrapper}>
    <View style={styles.content}>{props.children}</View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Color.light,
  },
  content: {
    flex: 1,
    backgroundColor: Color.light,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
