import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {AppButton, Background, ScaleText} from '../../common';
import {Fonts} from '../../theme';
import {TextInputNative} from '../../components';
import {useHookForm, ValidationSchema} from '../../utils/ValidationUtil';
import strings from '../../i18n/index';
import {DataHandler, NavigationService} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
const ForgetPassword = () => {
  const [statedata, setStateData] = useState({
    isLoading: false,
  });
  const isDarkMode = DataHandler.getAppTheme();
  const [formObj, emailProps] = useHookForm(
    ['email'],
    {},
    ValidationSchema.resetPassword,
  );

  const submit = formObj.handleSubmit(values => {
    setStateData(prv => ({...prv, isLoading: true}));
    const handlepayload = {
      email: values.email,
      // fcm_token: fcmtokenkey,
    };
    setTimeout(() => {
      setStateData(prv => ({...prv, isLoading: false}));
      NavigationService.navigate(StackNav.VerifyOtp);
    }, 1500);
    console.log('🚀 ~ submit ~ handlepayload:', handlepayload);
    // dispatch(
    //   authLogin.request({
    //     payloadApi: handlepayload,
    //     cb: data => {
    //       console.log(data, 'data');
    //       if (!data?.isEmailVerified) {
    //         NavigationService.navigate('VerifyCode', {
    //           isVerifyFromLogin: true,
    //           email: values?.email,
    //         });
    //         return;
    //       }
    //       NavigationService.navigate('AppStack');
    //     },
    //   }),
    // );
  });

  return (
    <Background showHeader={true} isDarkMode={isDarkMode}>
      <ScaleText
        isDarkMode={isDarkMode}
        fontFamily={Fonts.type.Bold}
        fontSize={Fonts.size.size_50}
        text={'Reset'}
      />
      <View style={{marginTop: -40}}>
        <ScaleText
          isDarkMode={isDarkMode}
          fontFamily={Fonts.type.Bold}
          fontSize={Fonts.size.size_50}
          text={'Passowd'}
        />
      </View>
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
          customPlaceholder={'Please Enter Your Email'}
          topSpaceLarge
          {...emailProps}
        />
      </View>
      <AppButton
        isloading={statedata.isLoading}
        onPress={submit}
        title={'Reset Password'}
      />
    </Background>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  descriptionText: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
});
