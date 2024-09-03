import {StyleSheet, useColorScheme, View} from 'react-native';
import React, {useState} from 'react';
import {AppButton, Background, PopupModal, ScaleText} from '../../common';
import {Colors, Fonts, Metrics} from '../../theme';
import {AppCheckBox, ButtonView, TextInputNative} from '../../components';
import {useHookForm, ValidationSchema} from '../../utils/ValidationUtil';
import strings from '../../i18n/index';
import {DataHandler, NavigationService} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LocalStoragekey} from '../../config/Constants';
import {LocalizationProvider} from '../../helper/lanaguagecontext';

const Login = () => {
  const [statedata, setStateData] = useState({
    isChecked: false,
    isLoading: false,
    themeModal: false,
  });
  const isDarkMode = DataHandler.getAppTheme() || false;

  const [formObj, emailProps, passwordProps] = useHookForm(
    ['email', 'password'],
    {},
    ValidationSchema.logIn,
  );

  // setTimeout(async () => {
  //   const getTheme = await AsyncStorage.getItem(LocalStoragekey.THEME_COLOUR);
  //   if (!getTheme) {
  //     setStateData(prv => ({...prv, themeModal: true}));
  //   } else {
  //     DataHandler.setAppTheme(true);
  //   }
  // }, 1000);

  const submit = formObj.handleSubmit(values => {
    setStateData(prv => ({...prv, isLoading: true}));
    const handlepayload = {
      email: values.email,
      password: values.password,
      // fcm_token: fcmtokenkey,
    };
    setTimeout(() => {
      setStateData(prv => ({...prv, isLoading: false}));
      NavigationService.navigate(StackNav.ProjectType);
    }, 1500);
    console.log('🚀 ~ submit ~ handlepayload:', handlepayload);
  });

  const handleSetTheme = async value => {
    setStateData(prv => ({...prv, themeModal: false}));
    if (value == 'dark') {
      DataHandler.setAppTheme(true);
    }
    await AsyncStorage.setItem(LocalStoragekey.THEME_COLOUR, value);
  };

  return (
    <Background isDarkMode={isDarkMode}>
      <ScaleText
        isDarkMode={isDarkMode}
        fontFamily={Fonts.type.Bold}
        fontSize={Fonts.size.size_50}
        text={strings.Login_your_account}
      />
      <ScaleText
        isDarkMode={isDarkMode}
        fontSize={Fonts.size.size_15}
        fontFamily={Fonts.type.Regular}
        TextStyle={styles.descriptionText}
        text={strings.Lorem}
      />
      <View style={styles.inputContainer}>
        <TextInputNative
          title={'Email*'}
          isDarkMode={isDarkMode}
          nextFocusRef={passwordProps.forwardRef}
          customPlaceholder={'Enter Your Email'}
          topSpaceLarge
          {...emailProps}
        />
        <TextInputNative
          title={'Password*'}
          isDarkMode={isDarkMode}
          nextFocusRef={passwordProps.forwardRef}
          customPlaceholder={'Enter Your Password'}
          topSpaceLarge
          secureTextEntry
          {...passwordProps}
        />
      </View>
      <View style={styles.rememberContainer}>
        <View style={styles.rememberInnerContainer}>
          <AppCheckBox
            isChecked={statedata.isChecked}
            onClick={() =>
              setStateData(prev => ({...prev, isChecked: !statedata.isChecked}))
            }
          />
          <ScaleText
            isDarkMode={isDarkMode}
            fontSize={Fonts.size.size_15}
            TextStyle={styles.rememberText}
            text={strings.Remember_me}
          />
        </View>
        <ButtonView
          onPress={() => NavigationService.navigate(StackNav.ForgetPassword)}>
          <ScaleText
            color={Colors.Black_42}
            isDarkMode={isDarkMode}
            text={strings.Forget_Password}
            TextStyle={styles.text}
            fontSize={Fonts.size.size_15}
            fontFamily={Fonts.type.Regular}
          />
        </ButtonView>
      </View>
      <AppButton
        isloading={statedata.isLoading}
        onPress={submit}
        title={strings.Sign_In}
      />
      <View style={styles.signUpContainer}>
        <ScaleText
          isDarkMode={isDarkMode}
          fontSize={Fonts.size.size_15}
          TextStyle={styles.signUpText}
          text={strings.Dont_have_an_account}
        />
        <ButtonView onPress={() => NavigationService.navigate(StackNav.SignUp)}>
          <ScaleText
            text={strings.Sign_Up}
            TextStyle={styles.text}
            fontSize={Fonts.size.size_15}
            color={Colors.LinearGradientTwo}
            fontFamily={Fonts.type.Regular}
          />
        </ButtonView>
      </View>
      <PopupModal
        GifEnable={true}
        showButtons={true}
        title="Select Your Preferred Theme"
        description={
          'Choose a theme to customize the look and feel of the app.'
        }
        ButtonTitleOne={'Dark Mode'}
        ButtonTitleTwo={'Light Mode'}
        GifStyle={{width: 100, height: 100, marginBottom: 20}}
        isModalVisible={statedata.themeModal}
        ButtonOnePress={() => {
          handleSetTheme('dark');
        }}
        ButonTwoPress={() => {
          handleSetTheme('light');
        }}
        GifSource={require('../../assets/lottie/theme.gif')}
      />
    </Background>
  );
};

export default Login;

const styles = StyleSheet.create({
  descriptionText: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  rememberInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: 10,
    fontFamily: Fonts.type.Regular,
  },
  text: {
    textDecorationLine: 'underline',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 10,
    width: Metrics.scaleHorizontal(200),
  },
  signUpText: {
    marginLeft: 10,
    fontFamily: Fonts.type.Regular,
  },
});
