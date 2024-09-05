import {
  SafeAreaView,
  StatusBar,
  Animated,
  StyleSheet,
  ImageBackground,
  View,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Colors, Images} from '../../theme';
import React, {useEffect, useRef, useMemo} from 'react';
import {NavigationService} from '../../utils';
import {ButtonView} from '../../components';
import VectorIcon from '../VectorIcon';

const Background = ({
  isDarkMode,
  showHeader,
  scrollDisable,
  showProfile,
  children,
}) => {
  const backgroundColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(backgroundColor, {
      toValue: isDarkMode ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [isDarkMode]);

  const interpolatedBackgroundColor = useMemo(
    () =>
      backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.Whiite_CC, Colors.Black_21],
      }),
    [backgroundColor],
  );

  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content', true);
    StatusBar.setBackgroundColor(
      isDarkMode ? Colors.Black_21 : Colors.Whiite_CC,
      true,
    );
  }, [isDarkMode]);

  return (
    <Animated.View
      style={[
        styles.container,
        {backgroundColor: interpolatedBackgroundColor},
      ]}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {showHeader && (
          <View style={styles.header}>
            <ButtonView
              onPress={() => NavigationService.goBack()}
              style={[
                styles.iconButton,
                {
                  backgroundColor: isDarkMode ? Colors.Black_42 : Colors.White,
                  shadowColor: isDarkMode ? Colors.White : Colors.Black,
                },
              ]}>
              <VectorIcon
                type={'Entypo'}
                color={!isDarkMode ? Colors.Black_42 : Colors.White}
                name="chevron-left"
                size={25}
              />
            </ButtonView>
            {showProfile && (
              <ButtonView>
                <Image
                  resizeMode="contain"
                  style={styles.profileImage}
                  source={{
                    uri: Images.iconsource.dummyuserimage,
                  }}
                />
              </ButtonView>
            )}
          </View>
        )}
        <ImageBackground
          tintColor={isDarkMode ? Colors.Black_57 : null}
          style={styles.imageBackground}
          resizeMode="cover"
          source={require('../../assets/images/background.png')}>
          <SafeAreaView style={styles.safeArea}>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              scrollEnabled={scrollDisable}
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}>
              <View style={styles.contentContainer}>{children}</View>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

export default Background;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avoidingView: {
    flex: 1,
  },
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  iconButton: {
    width: 35,
    height: 35,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  imageBackground: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
});
