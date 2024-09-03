// lib import
import React from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// local import
import DrawerNavigator from './drawer';
import {screenOptions} from './config';
import {NavigationService} from '../utils';
import {getUserToken} from '../ducks/user';

//screens import
import {StackRoute} from '../screens';
import {StackNav} from './stackkeys';

const Stack = createStackNavigator();

function StackScreens() {
  const isUserExist = useSelector(getUserToken);
  return (
    <Stack.Navigator
      initialRouteName={
        isUserExist == undefined ? StackNav.Login : StackNav.AppStack
      }
      {...{screenOptions}}>
      <Stack.Screen
        name={StackNav.Login}
        component={StackRoute.Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={StackNav.SignUp}
        component={StackRoute.SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={StackNav.ForgetPassword}
        component={StackRoute.ForgetPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={StackNav.VerifyOtp}
        component={StackRoute.VerifyOtp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={StackNav.NewPassword}
        component={StackRoute.NewPassword}
        options={{headerShown: false}}
      />

      {/* AppStack Screens  */}

      <Stack.Screen
        name={StackNav.ProjectType}
        options={{headerShown: false}}
        component={StackRoute.ProjectType}
      />

      <Stack.Screen
        name={StackNav.ProjectName}
        options={{headerShown: false}}
        component={StackRoute.ProjectName}
      />

      <Stack.Screen
        name={StackNav.ProjectDetails}
        options={{headerShown: false}}
        component={StackRoute.ProjectDetails}
      />

      <Stack.Screen
        name={StackNav.AppStack}
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
