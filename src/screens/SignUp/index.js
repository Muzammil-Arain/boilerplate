import {StyleSheet, View, Image} from 'react-native';
import React, {useState} from 'react';
import {AppButton, Background, ScaleText, VectorIcon} from '../../common';
import {Colors, Fonts, Images, Metrics} from '../../theme';
import {AppCheckBox, ButtonView, TextInputNative} from '../../components';
import {useHookForm, ValidationSchema} from '../../utils/ValidationUtil';
import strings from '../../i18n/index';
import {DataHandler, NavigationService, Util} from '../../utils';
import HandleImagePicker from '../../components/HandleImagePicker';
import {StackNav} from '../../naviagtor/stackkeys';

const SignUp = ({navigation}) => {
  const [statedata, setStateData] = useState({
    isChecked: false,
    GalleryPickerModal: false,
    picture: null,
    isLoading: false,
  });
  const isDarkMode = DataHandler.getAppTheme();

  const [
    formObj,
    firstNameProps,
    lastNameProps,
    emailProps,
    phoneNumberProps,
    passwordProps,
    confirmPasswordProps,
  ] = useHookForm(
    ['firstname', 'lastname', 'email', 'phone', 'password', 'confirmpassword'],
    {},
    ValidationSchema.SignUp,
  );

  const submit = formObj.handleSubmit(values => {
    if (!statedata.isChecked) {
      Util.showMessage('Please accept your terms and condition');
      return;
    }
    setStateData(prv => ({...prv, isLoading: true}));
    const handlepayload = {
      email: values.email,
      password: values.password,
    };
    setTimeout(() => {
      setStateData(prv => ({...prv, isLoading: false}));
      NavigationService.navigate(StackNav.VerifyOtp, {
        email: values.email,
        type: 'signup',
      });
    }, 1500);
    // Placeholder for API call
  });

  const onImagePicked = image => {
    setStateData(prv => ({
      ...prv,
      GalleryPickerModal: false,
      picture: image.uri,
    }));
    console.log('Selected Image:', image);
  };
  return (
    <Background showHeader={true} isDarkMode={isDarkMode}>
      <ButtonView
        onPress={() =>
          setStateData(prv => ({...prv, GalleryPickerModal: true}))
        }>
        <Image
          source={{uri: statedata.picture ?? Images.iconsource.dummyuserimage}}
          resizeMode="contain"
          style={styles.userImageStyle}
        />
        <View style={styles.cameraIconStyle}>
          <VectorIcon
            color={Colors.LinearGradientOne}
            size={Fonts.size.size_22}
            name={'camera'}
            type={'Entypo'}
          />
        </View>
      </ButtonView>

      <ScaleText
        isDarkMode={isDarkMode}
        fontFamily={Fonts.type.Bold}
        fontSize={Fonts.size.size_50}
        text={'Sign Up your account'}
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
          title={'First Name*'}
          isDarkMode={isDarkMode}
          nextFocusRef={lastNameProps.forwardRef}
          customPlaceholder={'Enter Your First Name'}
          topSpaceLarge
          {...firstNameProps}
        />
        <TextInputNative
          title={'Last Name*'}
          isDarkMode={isDarkMode}
          nextFocusRef={emailProps.forwardRef}
          customPlaceholder={'Enter Your Last Name'}
          topSpaceLarge
          {...lastNameProps}
        />
        <TextInputNative
          title={'Email*'}
          isDarkMode={isDarkMode}
          nextFocusRef={phoneNumberProps.forwardRef}
          customPlaceholder={'Enter Your Email'}
          topSpaceLarge
          {...emailProps}
        />
        <TextInputNative
          title={'Phone*'}
          isDarkMode={isDarkMode}
          nextFocusRef={passwordProps.forwardRef}
          customPlaceholder={'Enter Your Phone Number'}
          topSpaceLarge
          {...phoneNumberProps}
        />
        <TextInputNative
          title={'Password*'}
          isDarkMode={isDarkMode}
          nextFocusRef={confirmPasswordProps.forwardRef}
          customPlaceholder={'Enter Your Password'}
          topSpaceLarge
          secureTextEntry
          {...passwordProps}
        />
        <TextInputNative
          title={'Confirm Password*'}
          isDarkMode={isDarkMode}
          customPlaceholder={'Enter Your Confirm Password'}
          topSpaceLarge
          secureTextEntry
          {...confirmPasswordProps}
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
            text={'Accept Terms and Condition'}
          />
        </View>
      </View>
      <AppButton
        isloading={statedata.isLoading}
        onPress={submit}
        title={'Sign Up'}
      />
      <View style={styles.signUpContainer}>
        <ScaleText
          isDarkMode={isDarkMode}
          fontSize={Fonts.size.size_15}
          TextStyle={styles.signUpText}
          text={'Already have an account'}
        />
        <ButtonView onPress={() => NavigationService.navigate(StackNav.Login)}>
          <ScaleText
            text={'Sign In'}
            TextStyle={styles.text}
            fontSize={Fonts.size.size_15}
            color={Colors.LinearGradientTwo}
            fontFamily={Fonts.type.Regular}
          />
        </ButtonView>
      </View>
      <HandleImagePicker
        onClose={() =>
          setStateData(prv => ({...prv, GalleryPickerModal: false}))
        }
        modalVisible={statedata.GalleryPickerModal}
        onImagePicked={onImagePicked}
      />
    </Background>
  );
};

export default SignUp;

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
  userImageStyle: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: Colors.LinearGradientTwo,
  },
  cameraIconStyle: {
    position: 'absolute',
    bottom: 10,
    left: Metrics.scaleHorizontal(35),
  },
});
