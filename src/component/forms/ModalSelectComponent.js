import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Color from 'mbk_app/constants/Color';
import {Icon} from '@ui-kitten/components';

export const ModalOptionComponent = (props) => {
  return (
    <TouchableOpacity onPress={() => props.onPress()}>
      <View style={styles.childWrapper}>
        <Text>{props.title}</Text>
        <Icon
          name={props.selected ? 'radio-button-on' : 'radio-button-off'}
          style={styles.iconStyle}
          fill={Color.primary}
        />
      </View>
    </TouchableOpacity>
  );
};

export const ModalSelectComponent = (props) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.isVisible}
      onRequestClose={() => null}>
      <View style={styles.wrapper}>
        <View style={styles.headerModal}>
          <TouchableWithoutFeedback onPress={props.closeButton}>
            <Icon
              name="close"
              fill={Color.primary}
              style={styles.iconStyleHeader}
            />
          </TouchableWithoutFeedback>
        </View>
        {props.children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  headerModal: {
    paddingHorizontal: 10,
  },
  childWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
  },
  loadingText: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  loadingContent: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.light,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  iconStyleHeader: {
    width: 40,
    height: 40,
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
});
