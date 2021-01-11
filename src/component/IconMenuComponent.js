import {Icon} from '@ui-kitten/components';
import React from 'react';
import {View, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import Color from '../constants/Color';

const IconMenuComponent = (props) => {
  const iconSize = props.iconSize ?? 28;

  const styles = StyleSheet.create({
    wrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: Color.primary,
      borderRadius: 12,
    },
    iconStyle: {
      width: iconSize,
      height: iconSize,
    },
    title: {
      color: Color.dark,
      textAlign: 'center',
      padding: 8,
      fontSize: 14,
    },
    buttonWrapper: {
      flexDirection: 'column',
    },
  });

  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.buttonWrapper}>
        <View style={[styles.wrapper, props.wrapperStyle]}>
          <Icon
            name={props.iconName}
            style={styles.iconStyle}
            fill={props.iconColor ?? Color.light}
          />
        </View>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default IconMenuComponent;
