import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  AppButton,
  DropDownView,
  DateTimePicker,
  ImageIcon,
  VectorIcon,
} from './src/common';
import {View} from 'react-native';
import {DropDown, VideoPlayer} from './src/components';

const DummyData = [
  {name: 'name'},
  {name: 'name'},
  {name: 'name'},
  {name: 'name'},
  {name: 'name'},
  {name: 'name'},
  {name: 'name'},
  {name: 'name'},
];

const App = props => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const [showmodal, showModal] = useState(false);

  return (
    <View style={{margin: 20}}>
      <DropDown data={DummyData} isModalVisible={false} />
      <DateTimePicker
        maximumDate={new Date()}
        time={false}
        onConfirm={value => {
          console.log(value);
          showModal(false);
        }}
        onCancel={() => showModal(false)}
        isDatePickerVisible={showmodal}
      />
      <DropDownView title="title" value="Type" />
      <ImageIcon
        width={20}
        height={20}
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/128/8748/8748960.png',
        }}
      />
      <VectorIcon type="Ionicons" name="home" color="#000" size={24} />
      <AppButton onPress={() => showModal(true)} title={'Next'} />
      <AppButton ShowLinear={false} title={'Cancel'} />
    </View>
  );
};

export default App;
