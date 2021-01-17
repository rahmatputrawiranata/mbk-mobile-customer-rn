import React from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {HeaderBackComponent} from 'src/component/HeaderBackComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PageWrapperComponent} from 'src/component/PageWrapperComponent';
import {ButtonComponent} from 'src/component/ButtonComponent';
import Color from 'src/constants/Color';
import {request} from 'src/helper/request';
import {LoadingComponent} from 'src/component/LoadingComponent';
import {CardComponent} from 'src/component/CardComponent';

export const SetProblemScreen = ({route, navigation}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [deviceData, setDeviceData] = React.useState(null);

  const navigateBack = () => {
    navigation.goBack();
  };

  const {device_code} = route.params;

  const navigateBacks = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  React.useEffect(() => {
    async function initData() {
      setIsLoading(true);
      request(
        '/report/check-device',
        'POST',
        JSON.stringify({
          device_code: device_code,
        }),
      )
        .then((response) => {
          setDeviceData(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          Alert.alert(
            'Device Code Not Valid',
            'Please use registered device',
            [
              {
                text: 'Back To Scanner',
                onPress: navigateBacks,
              },
            ],
            {cancelable: false},
          );
        });
    }
    initData();
  }, [device_code, navigateBacks]);

  const checkDevice = async () => {
    setIsLoading(true);
    request(
      '/report/check-device',
      'POST',
      JSON.stringify({
        device_code: device_code,
      }),
    )
      .then((response) => {
        setDeviceData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert(
          'Device Code Not Valid',
          'Please use registered device',
          [
            {
              text: 'Back To Scanner',
              onPress: navigateBack,
            },
          ],
          {cancelable: false},
        );
      });
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderBackComponent
        title="Set Up Device Problem"
        navigateBack={navigateBack}
      />
      <PageWrapperComponent>
        <View style={styles.contentWrapper}>
          <View>
            <View style={styles.divider} />
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
          <ButtonComponent onPress={checkDevice} title="Check Data" />
          <View style={styles.divider} />
          {deviceData !== null ? (
            <ButtonComponent onPress={() => null} title="Next" />
          ) : (
            <></>
          )}
        </View>
      </PageWrapperComponent>
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
