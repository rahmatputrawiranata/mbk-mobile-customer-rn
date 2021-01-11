import React from 'react';
import {Text, View, StyleSheet, Modal} from 'react-native';
import {HeaderBackComponent} from 'mbk_app/component/HeaderBackComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PageWrapperComponent} from 'mbk_app/component/PageWrapperComponent';
import {ButtonComponent} from 'mbk_app/component/ButtonComponent';
import Color from 'mbk_app/constants/Color';
import {TextInputComponent} from 'mbk_app/component/forms/TextInputComponent';
import {Spinner} from '@ui-kitten/components';

export const CreateReportScreen = ({navigation}) => {
  const [deviceId, setDeviceId] = React.useState('');
  const [ifDeviceExist, setIfDeviceExist] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const navigateBack = () => {
    navigation.goBack();
  };

  const checkDevice = () => {};

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderBackComponent title="Profile" navigateBack={navigateBack} />
      <PageWrapperComponent>
        <View style={styles.contentWrapper}>
          <View style={styles.content}>
            <TextInputComponent
              placeholder="Input Your Device ID"
              onChangeText={(value) => setDeviceId(value)}
              value={deviceId}
            />
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <ButtonComponent onPress={() => null} title="Use Camera " />
          <View style={styles.divider} />
          <ButtonComponent onPress={() => null} title="Cek Data" />
        </View>
      </PageWrapperComponent>
      
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
});
