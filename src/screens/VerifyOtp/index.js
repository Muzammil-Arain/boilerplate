import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {AppButton, Background, ScaleText} from '../../common';
import {Colors, Fonts, Metrics} from '../../theme';
import {ButtonView} from '../../components';
import strings from '../../i18n/index';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {DataHandler, NavigationService} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';

const VerifyOtp = ({route}) => {
  const usertype = route?.params || {};
  const [statedata, setStateData] = useState({
    otpcode: '',
    isLoading: false,
  });
  const isDarkMode = DataHandler.getAppTheme();

  const handleVerifyCode = async () => {
    setStateData(prv => ({...prv, isLoading: true}));
    setTimeout(() => {
      setStateData(prv => ({...prv, isLoading: false}));
      if (usertype.type == 'signup') {
        NavigationService.navigate(StackNav.Login);
      } else {
        NavigationService.navigate(StackNav.NewPassword);
      }
    }, 1500);
  };

  return (
    <Background showHeader={true} isDarkMode={isDarkMode}>
      <ScaleText
        isDarkMode={isDarkMode}
        fontFamily={Fonts.type.Bold}
        fontSize={Fonts.size.size_50}
        text={'Verify Your'}
      />
      <View style={styles.otpCodeContainer}>
        <ScaleText
          isDarkMode={isDarkMode}
          fontFamily={Fonts.type.Bold}
          fontSize={Fonts.size.size_50}
          text={'OTP Code'}
        />
      </View>
      <ScaleText
        isDarkMode={isDarkMode}
        fontSize={Fonts.size.size_15}
        fontFamily={Fonts.type.Regular}
        TextStyle={styles.descriptionText}
        text={strings.Lorem}
      />

      <OTPInputView
        style={styles.otpInputView}
        pinCount={4}
        code={statedata.otpcode}
        onCodeChanged={code =>
          setStateData(prev => ({...prev, otpcode: code || ''}))
        }
        autoFocusOnLoad
        codeInputFieldStyle={[
          styles.underlineStyleBase,
          {
            borderColor: isDarkMode ? Colors.White : Colors.Black,
            color: isDarkMode ? Colors.White : Colors.Black,
          },
        ]}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={code => {
          console.log(`Code is ${code}, you are good to go!`);
        }}
      />

      <AppButton
        isloading={statedata.isLoading}
        disabled={statedata.otpcode.length >= 4 ? false : true}
        onPress={() => {
          handleVerifyCode();
        }}
        title={'Verify'}
      />
      <View style={styles.resendContainer}>
        <View style={styles.signUpContainer}>
          <ScaleText
            isDarkMode={isDarkMode}
            fontSize={Fonts.size.size_15}
            TextStyle={styles.signUpText}
            text={'Didn’t receive?'}
          />
          <ButtonView>
            <ScaleText
              text={'Resend'}
              TextStyle={styles.resendText}
              fontSize={Fonts.size.size_15}
              color={Colors.LinearGradientTwo}
              fontFamily={Fonts.type.Regular}
            />
          </ButtonView>
        </View>
      </View>
    </Background>
  );
};

export default VerifyOtp;

const styles = StyleSheet.create({
  otpCodeContainer: {
    marginTop: -30,
  },
  descriptionText: {
    marginBottom: 20,
  },
  otpInputView: {
    alignSelf: 'center',
    height: 200,
    paddingLeft: 20,
  },
  underlineStyleBase: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderRadius: 5,
    fontSize: Fonts.size.size_25,
  },
  underlineStyleHighLighted: {
    borderColor: Colors.LinearGradientOne,
  },
  resendContainer: {
    alignSelf: 'flex-end',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 10,
    width: Metrics.scaleHorizontal(150),
  },
  signUpText: {
    marginLeft: 10,
    fontFamily: Fonts.type.Regular,
  },
  resendText: {
    textDecorationLine: 'underline',
  },
});
1;
