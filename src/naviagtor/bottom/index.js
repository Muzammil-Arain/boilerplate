/** @format */

import React, {useState} from 'react';
import {View, Image, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Images, Metrics} from '../../theme';
import {NavigationService, Util} from '../../utils';
import {styles} from './styles';
import {Filters, Role} from '../../screens';

const Tab = createBottomTabNavigator();

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Testing Screen</Text>
    </View>
  );
}
export default function BottomTab() {
  // const userRole = useSelector(getUserRole);
  const [screenaname, setScreenName] = useState();
  const [showmodal, setShowModal] = useState(false);
  const [showrolemodal, setShowRoleModal] = useState(false);

  const ParentData = [
    {
      label: 'Profile',
      icon: Images.icon.bottomProfileIcon,
      component: '',
      customIconStyles: {},
      onTabPress: e => NavigationService.navigate('ParentsProfile'),
    },
    {
      label: 'Search',
      icon: Images.icon.bottomSearchIcon,
      component: '',
      customIconStyles: {height: 30, width: 30},
      onTabPress: e => {
        e.preventDefault();
        setShowModal(true);
      },
    },
    {
      label: 'Match',
      icon: Images.icon.match,
      component: '',
      customIconStyles: {},
      onTabPress: e => {
        if (!screenaname == 'Match') {
          NavigationService.navigate('Dashboard');
          return;
        } else {
          // e.preventDefault();
          setShowRoleModal(true);
        }
      },
    },
    {
      label: 'Messages',
      icon: Images.icon.bottomMessageIcon,
      component: '',
      customIconStyles: {},
      onTabPress: e => NavigationService.navigate('Message'),
    },
    {
      label: 'Settings',
      icon: Images.icon.bottomSettingIcon,
      component: '',
      customIconStyles: {},
      onTabPress: e => NavigationService.navigate('settings'),
    },
  ];
  const navigationItemsParent = [
    {
      label: 'Profile',
      icon: Images.icon.bottomProfileIcon,
      component: '',
      customIconStyles: {},
      onTabPress: e => null,
    },
    {
      label: 'Search',
      icon: Images.icon.bottomSearchIcon,
      component: '',
      customIconStyles: {height: 30, width: 30},
      onTabPress: e => {
        e.preventDefault();
        setShowModal(true);
      },
    },
    {
      label: 'Match',
      icon: Images.icon.bottomHomeIcon,
      component: '',
      customIconStyles: {},
      onTabPress: e => {
        e.preventDefault();
        setShowRoleModal(true);
      },
    },
    {
      label: 'Messages',
      icon: Images.icon.bottomMessageIcon,
      component: '',
      customIconStyles: {},
      onTabPress: e => null,
    },
    {
      label: 'Settings',
      icon: Images.icon.bottomSettingIcon,
      component: '',
      customIconStyles: {},
      onTabPress: e => null,
    },
  ];
  return (
    <>
      <Tab.Navigator
        initialRouteName="Match"
        screenOptions={{
          tabBarActiveTintColor: '#BC2F27',
          tabBarStyle: {
            backgroundColor: '#F8F8F8',
            height: Util.isPlatformIOS()
              ? Metrics.screenHeight * 0.13
              : Metrics.ratio(80),
          },
        }}>
        {ParentData.map(
          ({label, icon, component, customIconStyles, onTabPress}) => {
            return (
              <Tab.Screen
                listeners={{
                  tabPress: e => {
                    onTabPress(e), setScreenName(label);
                  },
                }}
                name={label}
                component={component}
                options={{
                  headerShown: false,
                  tabBarIcon: ({focused}) =>
                    focused ? (
                      <Image
                        source={icon}
                        resizeMode="contain"
                        style={[
                          styles.icon,
                          {tintColor: '#BC2F27'},
                          customIconStyles,
                        ]}
                      />
                    ) : (
                      <Image
                        source={icon}
                        resizeMode="contain"
                        style={[styles.icon, customIconStyles]}
                      />
                    ),
                  tabBarLabelStyle: {...styles.labelFont},
                }}
              />
            );
          },
        )}
      </Tab.Navigator>
      <Filters
        isVisible={showmodal}
        continuepress={() => setShowModal(false)}
        onBackdropPress={() => setShowModal(false)}
      />
      <Role
        isVisible={showrolemodal}
        nannyOnPress={() => {
          setShowRoleModal(false), handleGetuserData('2');
        }}
        tutorOnPress={() => {
          setShowRoleModal(false), handleGetuserData('1');
        }}
        playdateOnPress={() => {
          setShowRoleModal(false), handleGetuserData('3');
        }}
        onBackdropPress={() => setShowRoleModal(false)}
      />
    </>
  );
}
