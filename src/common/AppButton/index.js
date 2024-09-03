/** @format */

import React from 'react';
import {ActivityIndicator, Text} from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import {ButtonView} from '../../components';
import styles from './styles';
import {Colors} from '../../theme';

const AppButton = ({
  title,
  containerStyle,
  textStyle,
  isloading,
  onPress,
  disabled,
  ShowLinear = true,
}) => {
  return (
    <ButtonView onPress={onPress} disabled={disabled}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={
          ShowLinear
            ? [Colors.LinearGradientTwo, Colors.LinearGradientOne]
            : [Colors.White, Colors.White]
        }
        style={[
          styles.linearGradient,
          containerStyle,
          {
            borderRadius: 5,
            borderWidth: !ShowLinear ? 1 : 0,
            borderColor: !ShowLinear && Colors.LinearGradientOne,
          },
        ]}>
        {isloading ? (
          <ActivityIndicator size="large" color={Colors.White} />
        ) : (
          <Text
            style={[
              styles.buttonTextStyle,
              textStyle,
              {
                color: ShowLinear ? Colors.White : Colors.Black,
              },
            ]}>
            {title}
          </Text>
        )}
      </LinearGradient>
    </ButtonView>
  );
};

export default React.memo(AppButton);

AppButton.propTypes = {
  title: PropTypes.string,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
  isloading: PropTypes.bool,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

AppButton.defaultProps = {
  title: '',
  containerStyle: {},
  textStyle: {},
  isloading: false,
  onPress: () => {},
  disabled: false,
};
