import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {PageWrapper} from '../../../src/component/pageWrapper.component';
import Color from '../../../src/constants/Color';

const BackIcon = (props) => (
  <Icon {...props} fill={Color.light} name="arrow-back" />
);

export const ReportScreen = ({navigation}) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title={(props) => (
          <Text {...props} style={[props.style, {color: Color.light}]}>
            Report
          </Text>
        )}
        alignment="center"
        accessoryLeft={BackAction}
        style={{backgroundColor: Color.secondary}}
      />
      <PageWrapper></PageWrapper>
    </SafeAreaView>
  );
};
