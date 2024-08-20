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
    height: 40,
    marginBottom: 10,
    padding: 0,
    paddingBottom: 10,
  },
  modalRenderItemtextStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.Whiite_ED,
    fontSize: 15,
    color: Colors.Black_21,
  },
});

export default styles;
