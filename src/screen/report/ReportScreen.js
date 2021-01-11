import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Icon} from '@ui-kitten/components';
import {PageWrapperComponent} from 'mbk_app/component/PageWrapperComponent';
import {SafeAreaView} from 'react-native-safe-area-context';
import Color from '../../constants/Color';
import {HeaderBackComponent} from 'mbk_app/component/HeaderBackComponent';

const CardList = (props) => (
  <View style={styles.cardWrapper}>
    <View style={styles.contentCardWrapper}>
      <>
        <View style={styles.headerWrapper}>
          <Text style={styles.textHeader}>Device 0918239081230</Text>
          <Text style={styles.textDate}>01-01-2020</Text>
        </View>
        <Text style={styles.textStatus}>Pending</Text>
      </>
      <View style={styles.contenrLocationCard}>
        <Icon name="pin" style={styles.iconLocation} fill={Color.dark} />
        <Text style={styles.textLocation} numberOfLines={1}>
          Cabang Garuda, Surabaya , Jawa Timut, Jakarta asdsa dsad asd sad ad{' '}
        </Text>
      </View>
    </View>
  </View>
);

export const ReportScreen = ({navigation}) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <HeaderBackComponent title="Report" navigateBack={navigateBack} />
      <PageWrapperComponent>
        <View style={styles.contentWrapper}>
          <CardList />
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
    paddingTop: 20,
  },
  cardWrapper: {
    height: 112,
    paddingVertical: 15,
    backgroundColor: Color.light,
    borderRadius: 22,
    paddingHorizontal: 22,
    marginBottom: 10,
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
