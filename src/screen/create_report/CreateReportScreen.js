import React from 'react';
import {Text, View, StyleSheet, Modal, Alert} from 'react-native';
import {HeaderBackComponent} from 'src/component/HeaderBackComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PageWrapperComponent} from 'src/component/PageWrapperComponent';
import {ButtonComponent} from 'src/component/ButtonComponent';
import Color from 'src/constants/Color';
import {TextInputComponent} from 'src/component/forms/TextInputComponent';
import {RNCamera} from 'react-native-camera';
import {request} from 'src/helper/request';
import {LoadingComponent} from 'src/component/LoadingComponent';
import {CardComponent} from 'src/component/CardComponent';
import Snackbar from 'react-native-snackbar';

export const CreateReportScreen = ({navigation}) => {
  const [deviceId, setDeviceId] = React.useState('');
  const [isCameraActive, setIsCameraActive] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [deviceData, setDeviceData] = React.useState(null);

  const navigateBack = () => {
    navigation.goBack();
  };

  const navigateToSetUpReport = () => {
    navigation.navigate('SetProblem', {
      device_code: deviceData.device_code,
    });
  };

  const checkDevice = async () => {
    if (!deviceId) {
      return Snackbar.show({
        text: 'please fill device id',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
      });
    }
    setIsLoading(true);
    request(
      '/report/check-device',
      'POST',
      JSON.stringify({
        device_code: deviceId,
      }),
    )
      .then((response) => {
        console.log('success', response);
        setDeviceData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setDeviceData(null);
        setIsLoading(false);
        return Snackbar.show({
          text: err,
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'red',
        });
      });
  };

  const onBarcodeDetected = (e) => {
    console.log(e);
    if (!isFocused) {
      setIsFocused(true);
      Alert.alert(
        'Your Barcode',
        'Barcode Data ' + e.data,
        [
          {
            text: 'Cancel',
            onPress: () => setIsFocused(false),
          },
          {
            text: 'Process Data',
            onPress: () => {
              setIsFocused(false);
              setIsCameraActive(false);
              setDeviceId(e.data);
            },
          },
        ],
        {cancelable: false},
      );
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderBackComponent title="Check Device" navigateBack={navigateBack} />
      <PageWrapperComponent>
        <View style={styles.contentWrapper}>
          <View>
            <View style={styles.content}>
              <TextInputComponent
                placeholder="Input Your Device ID"
                onChangeText={(value) => setDeviceId(value)}
                value={deviceId}
              />
            </View>
            {deviceData !== null ? (
              <CardComponent>
                <View style={styles.listContentWrapper}>
                  <Text style={styles.titleStyleContent}>Device Code</Text>
                  <Text style={styles.textContentStyle}>
                    {deviceData.device_code}
                  </Text>
                </View>
                <View style={styles.listContentWrapper}>
                  <Text style={styles.titleStyleContent}>Device Model</Text>
                  <Text style={styles.textContentStyle}>
                    {deviceData.device_model}
                  </Text>
                </View>
              </CardComponent>
            ) : (
              <></>
            )}
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          {deviceData !== null ? (
            <ButtonComponent onPress={navigateToSetUpReport} title="Next" />
          ) : (
            <></>
          )}
          <View style={styles.divider} />
          <ButtonComponent
            onPress={() => {
              setIsCameraActive(true);
            }}
            title="Use Barcode Scanner "
          />
          <View style={styles.divider} />
          <ButtonComponent onPress={checkDevice} title="Check Device" />
        </View>
      </PageWrapperComponent>
      <Modal visible={isCameraActive} style={styles.cameraWrapper}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onBarCodeRead={onBarcodeDetected}
        />
      </Modal>
      <LoadingComponent isLoading={isLoading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    paddingTop: 20,
  },
  listContentWrapper: {
    paddingVertical: 5,
  },
  titleStyleContent: {
    fontSize: 16,
    fontWeight: 'normal',
    color: Color.dark,
  },
  textContentStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.dark,
  },
  buttonWrapper: {
    paddingVertical: 20,
  },
  divider: {
    height: 20,
  },
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
  cameraWrapper: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
