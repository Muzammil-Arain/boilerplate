import React from 'react';
import AppButton from '../AppButton';
import Modal from 'react-native-modal';
import Lottie from 'lottie-react-native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../../theme';

const PopupModal = ({
  onClose,
  title,
  content,
  children,
  GifEnable,
  GifStyle,
  GifSource,
  ButtonTitle,
  showButtons,
  description,
  LottieStyle,
  LottieSource,
  LottieEnable,
  ButtonTitleTwo,
  ButtonOnePress,
  ButonTwoPress,
  ButtonTitleOne,
  childrenstyle,
  isModalVisible,
  ShowActivityIndicator,
}) => {
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={600}
      animationOutTiming={600}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {LottieEnable && (
            <Lottie
              loop={true}
              autoPlay={true}
              source={LottieSource}
              style={[LottieStyle, {alignSelf: 'center'}]}
            />
          )}
          {GifEnable && (
            <Image
              source={GifSource}
              resizeMode="contain"
              style={[GifStyle, {alignSelf: 'center'}]}
            />
          )}
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>{content}</Text>
          <Text style={styles.modaldescription}>{description}</Text>
          <View style={childrenstyle}>{children}</View>
          <View style={{marginTop: 15}}>
            {ButtonTitle && (
              <AppButton
                onPressButton={onClose}
                btnTextStyle={{fontSize: 15}}
                title={ButtonTitle ?? 'Close'}
                btnViewStyle={styles.btnViewStyle}
              />
            )}
            {showButtons && (
              <View style={styles.flexViewStyle}>
                <AppButton
                  title={ButtonTitleOne}
                  btnTextStyle={{fontSize: 15}}
                  onPressButton={ButtonOnePress}
                  btnViewStyle={styles.FlexBtnViewStyle}
                />
                <AppButton
                  title={ButtonTitleTwo}
                  btnTextStyle={{fontSize: 15}}
                  onPressButton={ButonTwoPress}
                  btnViewStyle={styles.FlexBtnViewStyle}
                />
              </View>
            )}
            {ShowActivityIndicator && (
              <ActivityIndicator size={'large'} color={Colors.BLuecolor} />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(PopupModal);
const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: '100%',
    minHeight: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 19,
    textAlign: 'center',
    color: Colors.Black,
    // fontFamily: Fonts.bold,
  },
  modalText: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    color: Colors.bordercolor,
    textTransform: 'capitalize',
  },
  modaldescription: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    color: Colors.bordercolor,
    textTransform: 'capitalize',
  },
  btnViewStyle: {
    height: 45,
    borderRadius: 10,
    width: width * 0.6,
    alignSelf: 'center',
  },
  FlexBtnViewStyle: {
    height: 45,
    borderRadius: 10,
    width: width * 0.28,
    alignSelf: 'center',
  },
  flexViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -15,
    justifyContent: 'space-between',
  },
});
