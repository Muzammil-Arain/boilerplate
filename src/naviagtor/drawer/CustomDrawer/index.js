import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors, Fonts, Images, Metrics} from '../../../theme';
import {ButtonView} from '../../../components';
import {NavigationService} from '../../../utils';
import {authUserLogout, getUserData} from '../../../ducks/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import {useState} from 'react';

const CustomDrawer = props => {
  const dispatch = useDispatch();
  const [usertype, setUserType] = useState([]);
  const userData = useSelector(getUserData);
  useEffect(() => {
    if (userData?.role == 'Parent') {
      setUserType(ParentData);
    } else if (userData?.role == 'Nanny') {
      setUserType(NannyData);
    } else {
      setUserType(TutorData);
    }
  }, []);

  const ParentData = [
    {
      label: 'Kydos profile',
      image: Images.icon.drawerProfileIcon,
      navigation: 'kidsList',
    },
    {
      label: 'Subscription',
      image: Images.icon.drawerSubscriptionIcon,
      navigation: 'Subscription',
    },
    {
      label: 'Notification',
      image: Images.icon.drawerNotificationIcon,
      navigation: 'Notification',
    },
    {
      label: 'Matches',
      image: Images.icon.drawerMatchIcon,
      navigation: 'HelloScreen',
    },
    {
      label: 'Kydos Market',
      image: Images.icon.drawerMarketIcon,
      navigation: null,
    },
    {
      label: 'Logout',
      image: Images.icon.drawerLogoutIcon,
      navigation: 'SignIn',
    },
  ];

  const NannyData = [
    {
      label: 'Profile',
      image: Images.icon.drawerProfileIcon,
      navigation: 'NannyProfile',
    },
    {
      label: 'Subscription',
      image: Images.icon.drawerSubscriptionIcon,
      navigation: 'Subscription',
    },
    {
      label: 'Notification',
      image: Images.icon.drawerNotificationIcon,
      navigation: 'Notification',
    },
    {
      label: 'Matches',
      image: Images.icon.drawerMatchIcon,
      navigation: 'HelloScreen',
    },
    {
      label: 'Messages',
      image: Images.icon.drawerMessage,
      navigation: 'Message',
    },
    {
      label: 'Setting',
      image: Images.icon.settingsIcon,
      navigation: 'Settings',
    },
    {
      label: 'Logout',
      image: Images.icon.drawerLogoutIcon,
      navigation: 'SignIn',
    },
  ];

  const TutorData = [
    {
      label: 'Proile',
      image: Images.icon.drawerProfileIcon,
      navigation: 'PersonalInfo',
    },
    {
      label: 'Matches',
      image: Images.icon.drawerMatchIcon,
      navigation: 'HelloScreen',
    },
    {
      label: 'Messages',
      image: Images.icon.drawerMessage,
      navigation: 'Message',
    },
    {
      label: 'Live Teaching Classes',
      image: Images.icon.live,
      navigation: 'LiveClasses',
    },
    {
      label: 'Subscription Plan',
      image: Images.icon.dollor,
      navigation: 'Subscription',
    },
    {
      label: 'Setting',
      image: Images.icon.settingsIcon,
      navigation: 'Settings',
    },
    {
      label: 'Logout',
      image: Images.icon.drawerLogoutIcon,
      navigation: 'SignIn',
    },
  ];

  const handleLogut = async () => {
    Alert.alert('Logout', 'are you sure you want to logout of your account', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          Logout();
        },
      },
    ]);
  };

  const Logout = async () => {
    dispatch({
      type: authUserLogout.type,
    });
    await AsyncStorage.clear();
    props.navigation.closeDrawer();
    props.navigation.reset({
      index: 0,
      routes: [{name: 'SignIn'}],
    });
  };

  return (
    <View>
      <View style={styles.closeicon}>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <AntDesign name="close" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        // onPress={() => props.navigation.navigate('Profile')}
        style={{
          marginVertical: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <View style={styles.imageView}>
            <Image
              source={{uri: userData?.profile_picture}}
              resizeMode="cover"
              style={styles.userimage}
            />
          </View>
        </View>
        <Text style={styles.mainHeading}>
          {userData?.first_name + userData?.last_name}
        </Text>
        <Text style={styles.SubHeading}>@{userData?.first_name}</Text>
      </TouchableOpacity>

      {usertype.map((item, ind) => {
        return (
          <ButtonView
            onPress={() => {
              item.label == 'Logout'
                ? handleLogut()
                : item.label == 'Kydos Market'
                ? alert('Coming soon')
                : NavigationService.navigate(item.navigation);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: ind != 5 ? 0.5 : 0,
              paddingBottom: 10,
              paddingLeft: Metrics.ratio(10),
              marginHorizontal: 10,
              paddingVertical: Metrics.ratio(13),
              borderBottomColor: Colors.white,
            }}>
            <View style={{width: '15%'}}>
              <Image
                tintColor="#FFF"
                resizeMode="contain"
                source={item.image}
                style={{width: 22, height: 22, marginRight: 5}}
              />
            </View>

            <Text
              style={{
                marginLeft: 5,
                color: Colors.white,
                fontSize: Fonts.size.size_14,
                fontFamily: Fonts.type.Medium,
                width: 100,
              }}>
              {item.label}
            </Text>
          </ButtonView>
        );
      })}
      <View
        style={{
          marginTop: Metrics.screenHeight * 0.44,
        }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuView: {
    flex: 1,
  },
  imagestyles: {
    height: 20,
    width: 20,
    marginLeft: 15,
  },
  Child_1: {
    height: 50,
    borderBottomWidth: 1,
    marginHorizontal: 5,
    borderBottomColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    color: Colors.white,
    fontSize: 13,
    textTransform: 'capitalize',
    flex: 1,
    marginLeft: 10,
  },
  userimage: {
    height: Metrics.ratio(70),
    width: Metrics.ratio(70),
    borderRadius: 100,
  },
  imageView: {
    height: Metrics.ratio(85),
    width: Metrics.ratio(85),
    alignItems: 'center',
    borderRadius: 100,
    shadowColor: '#000',
    elevation: 10,
  },
  mainHeading: {
    textTransform: 'capitalize',
    textAlign: 'center',
    fontSize: Fonts.size.size_18,
    color: Colors.white,
    marginTop: 5,
    fontFamily: Fonts.type.Bold,
  },
  SubHeading: {
    textTransform: 'capitalize',
    textAlign: 'center',
    fontSize: Fonts.size.size_12,
    color: Colors.white,
    marginTop: -5,
    fontFamily: Fonts.type.Light,
  },
  closeicon: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 20,
  },
});

export default CustomDrawer;
