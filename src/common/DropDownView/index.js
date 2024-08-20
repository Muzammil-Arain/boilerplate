import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';
import {ButtonView} from '../../components';
import {Colors, Fonts} from '../../theme';

const DropDownView = ({onPress, title, value}) => {
  return (
    <View>
      <Text style={styles.dropDownTitle}>{title}</Text>
      <ButtonView onPress={onPress} style={styles.mainView}>
        <Text style={styles.valueStyle}>{value}</Text>
        <AntDesign name="caretdown" size={13} color={Colors.Black} />
      </ButtonView>
    </View>
  );
};

DropDownView.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

DropDownView.defaultProps = {
  title: '',
  value: '',
};

export default React.memo(DropDownView);

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Whiite_CC,
    borderRadius: 5,
    marginBottom: 10,
  },
  dropDownTitle: {
    color: Colors.Black,
    fontSize: Fonts.size.size_14,
    marginTop: 10,
    marginBottom: 5,
  },
  valueStyle: {
    fontSize: Fonts.size.size_15,
  },
});
