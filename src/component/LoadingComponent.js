import {Spinner} from '@ui-kitten/components';
import React from 'react';
import {Modal, View, Text, StyleSheet} from 'react-native';
import Color from 'src/constants/Color';

export const LoadingComponent = (props) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={props.isLoading}
    onRequestClose={() => null}>
    <View style={styles.loadingWrapper}>
      <View style={styles.loadingContent}>
        <Text style={styles.loadingText}>Processing Data...</Text>
        <Spinner />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginBottom: 10,
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
});
