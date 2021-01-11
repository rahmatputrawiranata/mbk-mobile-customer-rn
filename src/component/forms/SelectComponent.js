import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export const SelectComponent = (props) => {
  return (
    <TouchableWithoutFeedback
      style={styles.formWrapper}
      onPress={props.onPress}>
      <View style={styles.inputStyle}>
        <Text style={props.selected ? styles.selected : styles.placeHolder}>
          {props.selected ? props.text : props.placeholder}
        </Text>
      </View>
    </TouchableWithoutFeedback>
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
    justifyContent: 'center',
  },
  selected: {
    color: '#000',
  },
  placeHolder: {
    color: '#C7C7CD',
  },
});
