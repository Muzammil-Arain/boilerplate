/** @format */
import React from 'react';
//import { HeaderBackImage } from "../common";
import {AppStyles, Colors, Fonts, Images, Metrics} from '../theme';
import {Image, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {ButtonView} from '../components';
import {NavigationService} from '../utils';
export const screenOptions = ({route, navigation}) => {
  return {
    headerBackTitleVisible: false,
    headerStyle: AppStyles.headerStyle,
    headerTitleAlign: 'center',
    headerLeftContainerStyle: AppStyles.headerLeftContainerStyle,
    headerRightContainerStyle: AppStyles.headerRightContainerStyles,
    headerTitleStyle: AppStyles.headerTitleStyle,
    headerLeft: () => (
      <ButtonView onPress={() => NavigationService.goBack()}>
        <Entypo name="chevron-left" color={Colors.subheading1} size={30} />
      </ButtonView>
    ),
  };
};
export const screenOptionForInnerScreensSearch = () => {
  return {
    headerShown: true,
    headerStyle: AppStyles.headerStyle,
    headerTitleAlign: 'center',
    headerTintColor: 'black',
    headerBackTitle: ' ',
    headerLeftContainerStyle: AppStyles.headerLeftContainerStyle,
    headerTitleStyle: AppStyles.headerTitleStyle,
  };
};
