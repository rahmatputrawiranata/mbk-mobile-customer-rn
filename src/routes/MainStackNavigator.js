import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from 'mbk_app/screen/home/HomeScreen';
import {ReportScreen} from 'mbk_app/screen/report/ReportScreen';
import {ProfileScreen} from 'mbk_app/screen/profile/ProfileScreen';
import {CreateReportScreen} from 'mbk_app/screen/create_report/CreateReportScreen';

const {Navigator, Screen} = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode="none">
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Report" component={ReportScreen} />
    <Screen name="Profile" component={ProfileScreen} />
    <Screen name="CreateReport" component={CreateReportScreen} />
  </Navigator>
);

export const AppNavigator = () => <HomeNavigator />;
