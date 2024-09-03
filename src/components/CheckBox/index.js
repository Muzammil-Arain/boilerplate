import React, {useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {VectorIcon} from '../../common';
import {Colors} from '../../theme';

const AppCheckBox = ({isChecked, onClick}) => {
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: isChecked ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isChecked, scaleValue]);

  const animatedScale = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onClick}>
      <Animated.View
        style={[styles.iconContainer, {transform: [{scale: animatedScale}]}]}>
        {isChecked && (
          <VectorIcon
            name="check"
            type="FontAwesome"
            size={17}
            color={Colors.LinearGradientOne}
          />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default React.memo(AppCheckBox);

const styles = StyleSheet.create({
  container: {
    width: 22,
    height: 22,
    borderWidth: 2,
    backgroundColor: Colors.White,
    borderColor: Colors.White,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
