/** @format */

import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  linearGradient: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonTextStyle: {
    fontSize: Metrics.generatedFontSize(16, 16, true),
    textAlign: 'center',
    fontFamily: Fonts.type.Medium,
    textTransform: 'capitalize',
  },
});
