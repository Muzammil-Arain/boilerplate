/** @format */
import React from 'react';
import {AppStyles, Colors, Images} from '../theme';
import Entypo from 'react-native-vector-icons/Entypo';
import {ButtonView} from '../components';
import {NavigationService} from '../utils';
import {Image} from 'react-native';

export const screenOptions = ({route, navigation}, isDarkMode, headerRight) => {
  const headerBackgroundColor = isDarkMode ? Colors.Black_21 : Colors.Whiite_CC;
  const headerTintColor = isDarkMode ? Colors.Whiite_CC : Colors.Black_21;

  return {
    headerBackTitleVisible: false,
    headerStyle: {
      ...AppStyles.headerStyle,
      backgroundColor: headerBackgroundColor,
    },
    headerTitle: () => null,
    headerTitleAlign: 'center',
    headerLeftContainerStyle: AppStyles.headerLeftContainerStyle,
    headerRightContainerStyle: AppStyles.headerRightContainerStyles,
    headerLeft: () => (
      <ButtonView
        onPress={() => NavigationService.goBack()}
        style={{
          backgroundColor: isDarkMode ? Colors.Black_42 : Colors.White,
          width: 35,
          height: 35,
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Entypo name="chevron-left" color={headerTintColor} size={28} />
      </ButtonView>
    ),
    headerRight: () =>
      headerRight ? (
        <ButtonView style={{paddingRight: 10}}>
          <Image
            source={{uri: Images.iconsource.dummyuserimage}}
            style={{width: 45, height: 45, borderRadius: 100}}
          />
        </ButtonView>
      ) : null,
  };
};
