import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Color from 'src/constants/Color';
import moment from 'moment';

const heightSpace = 40;
export const TimeLineComponent = (props) => (
  <View style={styles.wrapper}>
    <View style={[styles.space, styles.timeWrapper]}>
      <Text>
        {moment(new Date(props.dataItem.created_at)).format('YYYY-MM-DD')}
      </Text>
      <Text>{moment(new Date(props.dataItem.created_at)).format('HH:MM')}</Text>
    </View>
    <View style={styles.lineWrapperStyle}>
      <View style={styles.lineTop} />
      <View style={styles.lineRounded} />
      <View style={styles.lineBottom} />
    </View>
    <View style={styles.contentWrapper}>
      <View style={styles.space}>
        <Text style={styles.title}>{props.dataItem.master_data.value}</Text>
        <Text style={styles.note}>
          {props.dataItem.notes
            ? 'Notes By ' +
              JSON.parse(props.dataItem.notes).author +
              ' : ' +
              JSON.parse(props.dataItem.notes).data
            : ''}
        </Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  space: {
    marginTop: heightSpace,
  },
  timeWrapper: {
    alignItems: 'flex-end',
  },
  lineWrapperStyle: {
    alignItems: 'center',
    marginHorizontal: 8,
    flex: 1,
  },
  lineTop: {
    width: 4,
    backgroundColor: Color.primary,
    height: heightSpace,
  },
  lineRounded: {
    width: 16,
    height: 16,
    backgroundColor: Color.primary,
    borderRadius: 8,
    marginVertical: 2,
  },
  lineBottom: {
    width: 4,
    backgroundColor: Color.primary,
    flex: 1,
  },
  contentWrapper: {
    flex: 6,
  },
  title: {
    color: Color.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  note: {
    color: Color.note,
    fontSize: 13,
    textAlign: 'justify',
  },
});
