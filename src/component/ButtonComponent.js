import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import Color from 'src/constants/Color';

export const ButtonComponent = (props) => (
  <TouchableOpacity onPress={props.onPress}>
    <View style={styles.buttonWrapper}>
      <Text style={styles.titleStyle}>{props.title}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonWrapper: {
    paddingVertical: 8,
    backgroundColor: Color.primary,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  titleStyle: {
    color: Color.light,
    fontSize: 14,
    textAlign: 'center',
  },
});
