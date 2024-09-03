import React from 'react';
import {Text} from 'react-native';
import {Colors} from '../../theme';

const ScaleText = ({
  text,
  fontFamily,
  fontSize,
  color,
  width,
  numberOfLines,
  textAlign,
  TextStyle,
  isDarkMode,
}) => {
  return (
    <Text
      style={[
        {
          fontFamily: fontFamily,
          fontSize: fontSize,
          color: isDarkMode
            ? Colors.Whiite_CC
            : color
            ? color
            : Colors.Black_21,
          width: width,
          textAlign: textAlign,
        },
        TextStyle,
      ]}
      numberOfLines={numberOfLines}>
      {text}
    </Text>
  );
};

export default React.memo(ScaleText);
