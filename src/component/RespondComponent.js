import React from 'react';
import {Modal, View, Image, StyleSheet} from 'react-native';
import {ButtonComponent} from './ButtonComponent';

export const RespondComponent = (props) => {
  const imageSource = props.isSuccess
    ? 'src/assets/images/success.png'
    : 'src/assets/images/fail.png';
  return (
    <Modal style={styles.wrapper} animationType="slide" visible={props.visible}>
      <Image style={styles.image} source={imageSource} />
      <View style={styles.buttonWrapper}>
        <ButtonComponent title={props.title} onPress={props.onPress} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    flex: 4,
  },
  buttonWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
