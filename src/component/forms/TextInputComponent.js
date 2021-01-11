import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

export const TextInputComponent = (props) => {
  return (
    <View style={styles.formWrapper}>
      <TextInput style={styles.inputStyle} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  formWrapper: {
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
    flexDirection: 'row',
  },
  inputStyle: {
    height: 40,
    flex: 1,
  },
});
