import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import Routes from './routes';
import {store} from './store';

export default () => {
  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  );
};
