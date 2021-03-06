import React from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {HeaderBackComponent} from 'src/component/HeaderBackComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PageWrapperComponent} from 'src/component/PageWrapperComponent';
import {ButtonComponent} from 'src/component/ButtonComponent';
import Color from 'src/constants/Color';
import {request, requestPublic} from 'src/helper/request';
import {LoadingComponent} from 'src/component/LoadingComponent';
import {CardComponent} from 'src/component/CardComponent';
import {RespondComponent} from 'src/component/RespondComponent';
import {
  ModalOptionComponent,
  ModalSelectComponent,
} from 'src/component/forms/ModalSelectComponent';
import {FlatList} from 'react-native-gesture-handler';
import {SelectComponent} from 'src/component/forms/SelectComponent';
import Snackbar from 'react-native-snackbar';

export const SetProblemScreen = ({route, navigation}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [deviceData, setDeviceData] = React.useState(null);
  const [respondVisible, setRespondVisible] = React.useState(false);

  const [problemDevice, setProblemDevice] = React.useState({
    modalOpen: false,
    selected: false,
    selectedId: null,
    selectedText: '',
    data: [],
  });

  const navigateBack = () => {
    navigation.goBack();
  };

  const {device_code} = route.params;

  const navigateBacks = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const openProblemDevice = async () => {
    try {
      let data = await requestPublic('/problem-details/all/' + deviceData.id);
      console.log(deviceData.id, data);
      setProblemDevice({
        ...problemDevice,
        data: data.data,
        modalOpen: true,
      });
    } catch (err) {}
  };

  const createReport = () => {
    setIsLoading(true);
    request(
      '/report/create-report',
      'POST',
      JSON.stringify({
        device_id: deviceData.id,
        kind_of_damage_type_id: problemDevice.selectedId,
        report_notes: 'a',
      }),
    )
      .then((res) => {
        setIsLoading(false);
        navigation.navigate('ReportNavigator');
      })
      .catch((err) => {
        0.0;

        console.log(err);
        Promise.resolve()
          .then(() => {
            setIsLoading(false);
          })
          .then(() => {
            setTimeout(() => {
              Snackbar.show({
                text: err,
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red',
              });
            }, 1000);
          });
      });
  };

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
          Alert.alert(
            'Device Code Not Valid',
            err,
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
              <>
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
                <View style={styles.formData}>
                  <Text>Detail Problem or Indication</Text>
                  <SelectComponent
                    placeholder="Select Detail Problem or Indication"
                    onPress={openProblemDevice}
                    selected={problemDevice.selected}
                    text={problemDevice.selectedText}
                  />
                </View>
              </>
            ) : (
              <></>
            )}
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          {deviceData !== null ? (
            <ButtonComponent onPress={createReport} title="Create Ticket" />
          ) : (
            <></>
          )}
        </View>
      </PageWrapperComponent>
      <LoadingComponent isLoading={isLoading} />
      <RespondComponent
        isSuccess={true}
        visible={respondVisible}
        onPress={() => setRespondVisible(false)}
        title="Close Modal"
      />

      <ModalSelectComponent
        isVisible={problemDevice.modalOpen}
        closeButton={() =>
          setProblemDevice({
            ...problemDevice,
            modalOpen: false,
          })
        }>
        <FlatList
          keyExtractor={(item) => item.id}
          data={problemDevice.data}
          renderItem={({item}) => (
            <ModalOptionComponent
              title={item.name}
              selected={item.id === problemDevice.selectedId ? true : false}
              onPress={() => {
                setProblemDevice({
                  ...problemDevice,
                  modalOpen: false,
                  selected: true,
                  selectedId: item.id,
                  selectedText: item.name,
                });
              }}
            />
          )}
        />
      </ModalSelectComponent>
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
