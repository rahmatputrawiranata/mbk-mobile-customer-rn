import React from 'react';
import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {Text} from 'react-native';
import Color from 'mbk_app/constants/Color';

const BackIcon = (props) => (
  <Icon {...props} fill={Color.primary} name="arrow-back" />
);

export const HeaderBackComponent = (props) => {
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={props.navigateBack} />
  );

  return (
    <TopNavigation
      title={(prop) => (
        <Text {...prop} style={[prop.style, {color: Color.primary}]}>
          {props.title}
        </Text>
      )}
      alignment="center"
      accessoryLeft={BackAction}
      style={{backgroundColor: Color.light}}
    />
  );
};
