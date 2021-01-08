import {Icon} from '@ui-kitten/components';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Color from '../../src/constants/Color';

const IconMenuComponent = (props) => (
  <TouchableOpacity onPress={props.onPress}>
    <View style={[styles.wrapper, props.wrapperStyle]}>
      <Icon
        name={props.iconName}
        style={{width: props.iconSize ?? 50, height: props.iconSize ?? 50}}
        fill={props.iconColor ?? Color.primary}
      />
    </View>
    <Text style={styles.title}>{props.title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Color.dark,
    borderRadius: 12,
  },
  title: {
    color: Color.light,
    textAlign: 'center',
    padding: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default IconMenuComponent;
