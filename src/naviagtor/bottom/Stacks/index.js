/** @format */
import React from 'react';
import {Dashboard, Message, ParentsProfile, Settings} from '../../../screens';
import {createStackNavigator} from '@react-navigation/stack';
import {screenOptions} from '../../config';

const Stack = createStackNavigator();
function ProfileStack() {
  return (
    <Stack.Navigator {...{screenOptions}}>
      <Stack.Screen
        name="ParentsProfile"
        component={ParentsProfile}
      />
    </Stack.Navigator>
  );
}
function SearchStack() {
  return (
    <Stack.Navigator {...{screenOptions}}>
      <Stack.Screen name="Favourites" component={Dashboard} />
    </Stack.Navigator>
  );
}
function MatchStack() {
  return (
    <Stack.Navigator {...{screenOptions}}>
      <Stack.Screen name="Message" component={Message} />
    </Stack.Navigator>
  );
}
function MessageStack() {
  return (
    <Stack.Navigator {...{screenOptions}}>
      <Stack.Screen name="Messages" component={Message} />
    </Stack.Navigator>
  );
}

function SettingStack() {
  return (
    <Stack.Navigator {...{screenOptions}}>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

export {ProfileStack, SettingStack, MatchStack, MessageStack, SearchStack};
