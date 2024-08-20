import React from 'react';
import DrawerNavigator from './drawer';
import {screenOptions} from './config';
import {useSelector} from 'react-redux';
import {getUserToken} from '../ducks/user';
import {NavigationService} from '../utils';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//screens import
import {OnBoarding} from '../screens';

const Stack = createStackNavigator();

function StackScreens() {
  const isUserExist = useSelector(getUserToken);
  return (
    <Stack.Navigator
      initialRouteName={isUserExist == undefined ? 'Onboarding' : 'AppStack'}
      {...{screenOptions}}>
      <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="AppStack"
        component={DrawerNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

const AppContainer = () => {
  return (
    <NavigationContainer ref={NavigationService.navigationRef}>
      <StackScreens />
    </NavigationContainer>
  );
};

export default AppContainer;
