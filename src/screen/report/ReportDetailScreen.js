import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HeaderBackComponent} from 'src/component/HeaderBackComponent';
import {PageWrapperComponent} from 'src/component/PageWrapperComponent';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {CardComponent} from 'src/component/CardComponent';
import {request} from 'src/helper/request';
import {TimeLineComponent} from 'src/component/TimeLineComponent';
import {ButtonComponent} from 'src/component/ButtonComponent';

const ListText = (props) => (
  <View style={styles.listStyleText}>
    <Text style={styles.listStyleTextTitle}>{props.title}</Text>
    <Text style={styles.listStyleTextValue}>: {props.value}</Text>
  </View>
);

export const ReportDetailScreen = ({route, navigation}) => {
  const {data} = route.params;

  const [dataReport, setDataReport] = React.useState(data);

  const navigateBack = () => {
    navigation.goBack();
  };

  React.useEffect(() => {
    async function getData() {
      request('/report/detail/' + data.id, 'GET')
        .then((res) => {
          setDataReport(res.data);
        })
        .catch((err) => {
          console.log('error', err);
        });
    }
    getData();
  }, [data]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderBackComponent title="Report " navigateBack={navigateBack} />
      <PageWrapperComponent wrapperStyle={styles.wrapperPageStyles}>
        <View style={styles.lineBreak} />
        <ScrollView>
          <CardComponent
            style={[styles.contentWrapper, styles.cardContentStyle]}>
            <ListText title="Ticket No" value={dataReport.ticket_no} />
            <ListText
              title="Device Code"
              value={dataReport.device.device_code}
            />
            <ListText
              title="Device Model"
              value={dataReport.device.device_model}
            />
            <ListText title="Branch" value={dataReport.branch.name} />
            <ListText title="Address" value={dataReport.branch.address} />
            <ListText
              title="status"
              value={dataReport.report_progress_active.value}
            />
          </CardComponent>
          <View style={styles.lineBreak} />
          <View style={styles.contentWrapper}>
            <TimeLineComponent />
            <TimeLineComponent />
            <TimeLineComponent />
            <TimeLineComponent />
          </View>
          <View style={styles.lineBreak} />
          <View style={styles.lineBreak} />
          <View style={styles.contentWrapper}>
            <ButtonComponent onPress={() => null} title="Action Button" />
          </View>
          <View style={styles.lineBreak} />
          <View style={styles.lineBreak} />
        </ScrollView>
      </PageWrapperComponent>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  lineBreak: {
    height: 10,
  },
  listStyleText: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  listStyleTextTitle: {
    flex: 1,
  },
  listStyleTextValue: {
    flex: 3,
  },
  wrapperPageStyles: {
    paddingHorizontal: 0,
  },
  contentWrapper: {
    marginHorizontal: 20,
  },
  cardContentStyle: {
    paddingHorizontal: 20,
  },
});
