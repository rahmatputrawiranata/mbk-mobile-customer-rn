import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from 'src/screen/home/HomeScreen';
import {ReportScreen} from 'src/screen/report/ReportScreen';
import {ProfileScreen} from 'src/screen/profile/ProfileScreen';
import {CreateReportScreen} from 'src/screen/create_report/CreateReportScreen';
import {SetProblemScreen} from 'src/screen/create_report/SetProblemScreen';

const {Navigator, Screen} = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode="none">
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Report" component={ReportScreen} />
    <Screen name="Profile" component={ProfileScreen} />
    <Screen name="CreateReportNavigator" component={CreateReportNavigator} />
  </Navigator>
);

//create report stack navigator

const CreateReportNavigator = () => (
  <Navigator headerMode="none">
    <Screen name="CreateReport" component={CreateReportScreen} />
    <Screen name="SetProblem" component={SetProblemScreen} />
  </Navigator>
);

export const AppNavigator = () => <HomeNavigator />;
