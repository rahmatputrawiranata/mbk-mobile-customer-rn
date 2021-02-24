import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import {Icon} from '@ui-kitten/components';
import {PageWrapperComponent} from 'src/component/PageWrapperComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import Color from '../../constants/Color';
import {HeaderBackComponent} from 'src/component/HeaderBackComponent';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {request} from 'src/helper/request';
import moment from 'moment';

const LoadingContent = (props) => (
  <View style={styles.cardWrapperSkeleton}>
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item>
        <View style={styles.skeletonHeader}>
          <SkeletonPlaceholder.Item height={18} width={160} borderRadius={8} />
          <SkeletonPlaceholder.Item height={18} width={80} borderRadius={8} />
        </View>

        <SkeletonPlaceholder.Item
          height={18}
          width={80}
          borderRadius={8}
          marginBottom={5}
        />
        <SkeletonPlaceholder.Item height={18} width={250} borderRadius={8} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  </View>
);

export const ReportScreen = ({navigation}) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const navigateToReportDetail = (data) => {
    navigation.navigate('ReportDetail', {
      data: data,
    });
  };

  const [isLoading, setIsLoading] = React.useState(true);
  const [listData, setListData] = React.useState([]);

  const CardList = ({item}) => (
    <View style={styles.cardWrapper} key={item.id}>
      <TouchableWithoutFeedback onPress={() => navigateToReportDetail(item)}>
        <View style={styles.contentCardWrapper}>
          <>
            <View style={styles.headerWrapper}>
              <Text style={styles.textHeader}>{item.ticket_no}</Text>
              <Text style={styles.textDate}>
                {moment(new Date(item.created_at)).format('YYYY-MM-DD')}
              </Text>
            </View>
            <Text style={styles.textStatus}>
              {typeof item.report_progress_active.value !== 'undefined' &&
              item.report_progress_active.value !== null
                ? item.report_progress_active.value
                : ''}
            </Text>
          </>
          <View style={styles.contenrLocationCard}>
            <Icon name="pin" style={styles.iconLocation} fill={Color.dark} />
            <Text style={styles.textLocation} numberOfLines={1}>
              {item.branch.name ?? ''}, {item.branch.address ?? ''}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );

  React.useEffect(() => {
    async function getData() {
      setIsLoading(true);
      request(
        '/report/all?' +
          new URLSearchParams({
            limit: 10,
          }),
        'GET',
      )
        .then((reponse) => {
          setListData(reponse.data.data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderBackComponent title="Report" navigateBack={navigateBack} />
      <PageWrapperComponent wrapperStyle={styles.wrapperPageStyles}>
        <View style={styles.contentWrapper}>
          {isLoading ? (
            <LoadingContent />
          ) : (
            <FlatList
              contentContainerStyle={styles.scrollContainer}
              data={listData}
              renderItem={CardList}
              // keyExtractor={(item) => item.id}
            />
          )}
        </View>
      </PageWrapperComponent>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  wrapperPageStyles: {
    paddingHorizontal: 0,
  },
  contentWrapper: {
    paddingTop: 20,
  },
  cardWrapperSkeleton: {
    paddingVertical: 16,
    backgroundColor: Color.light,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
    shadowColor: '#000',
    marginHorizontal: 20,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  scrollContainer: {
    padding: 20,
  },
  skeletonHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 30,
  },
  cardWrapper: {
    height: 128,
    paddingVertical: 16,
    backgroundColor: Color.light,
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  contentCardWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.dark,
  },
  textStatus: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Color.dark,
  },
  textDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Color.dark,
  },
  contenrLocationCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLocation: {
    width: 14,
    height: 14,
  },
  textLocation: {
    fontSize: 12,
    color: Color.dark,
  },
});
