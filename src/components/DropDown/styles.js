import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

const styles = StyleSheet.create({
  modalDropDownStyle: {
    backgroundColor: Colors.White,
    height: 500,
    borderRadius: 8,
    padding: 20,
  },
  modalSearchBarViewStyle: {
    backgroundColor: Colors.Whiite_CC,
    height: 45,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalSearchBarStyle: {
    flex: 1,
    color: Colors.Black_21,
    fontSize: 15,
  },
  modalRenderItemView: {
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderBottomColor: Colors.Black_22,
  },
  modalRenderItemtextStyle: {
    fontSize: 15,
    textAlign: 'left',
    color: Colors.Black_21,
  },
});

export default styles;
