import React from 'react';
import {View, StyleSheet} from 'react-native';
import Color from '../../src/constants/Color';
export const PageWrapper = (props) => (
  <View style={styles.wrapper}>
    <View style={styles.content}>{props.children}</View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Color.secondary,
  },
  content: {
    flex: 1,
    backgroundColor: Color.darkRed,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
  },
});
