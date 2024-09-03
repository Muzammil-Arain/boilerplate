import styles from './styles';
import {Colors} from '../../theme';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {View, TextInput, FlatList, TouchableOpacity, Text} from 'react-native';

const DropDown = ({data, isModalVisible, handleHideModal, handlePress}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = text => {
    setSearchText(text);
    const filteredItems = data.filter(el => {
      const elText = el?.name ? el.name.toLowerCase() : el.toLowerCase();
      return elText.includes(text.toLowerCase());
    });

    setFilteredData(filteredItems);
  };

  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.modalDropDownStyle}>
        <TouchableOpacity
          onPress={handleHideModal}
          style={{
            alignSelf: 'flex-end',
            marginBottom: 10,
          }}>
          <AntDesign name="closecircleo" color={Colors.Black_21} size={22} />
        </TouchableOpacity>
        <View style={styles.modalSearchBarViewStyle}>
          <TextInput
            placeholder="Search"
            placeholderTextColor={Colors.Whiite_B8}
            onChangeText={handleSearch}
            value={searchText}
            style={styles.modalSearchBarStyle}
          />
          <AntDesign name="search1" color={Colors.Black} size={22} />
        </View>
        <FlatList
          data={filteredData.length == 0 ? data : filteredData}
          keyExtractor={item => item.name}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                handlePress(item);
              }}
              style={styles.modalRenderItemView}>
              <Text style={styles.modalRenderItemtextStyle}>
                {item.name ?? item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
};

export default React.memo(DropDown);
