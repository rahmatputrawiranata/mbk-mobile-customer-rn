import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Color from 'src/constants/Color';

const heightSpace = 40;
export const TimeLineComponent = (props) => (
  <View style={styles.wrapper}>
    <View style={[styles.space, styles.timeWrapper]}>
      <Text>2019-09-31</Text>
      <Text>14:20</Text>
    </View>
    <View style={styles.lineWrapperStyle}>
      <View style={styles.lineTop} />
      <View style={styles.lineRounded} />
      <View style={styles.lineBottom} />
    </View>
    <View style={styles.contentWrapper}>
      <View style={styles.space}>
        <Text style={styles.title}>Title</Text>
        <Text style={styles.note} />
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
    fontSize: 11,
    textAlign: 'justify',
  },
});
