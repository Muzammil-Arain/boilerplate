/** @format */

import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  errorText: {
    // fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.size_12,
    color: 'red',
    marginTop: Metrics.ratio(8),
    marginLeft: Metrics.ratio(10),
  },
});
