import React from 'react';
import {View, StyleSheet} from 'react-native';

export const CardComponent = (props) => {
  return <View style={styles.wrapper}>{props.children}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    paddingHorizontal: 8,
    paddingVertical: 20,
  },
});
