import configureStore from './store';
import React, {useEffect, useState} from 'react';
import {StatusBar, View} from 'react-native';
import DataHandler from './utils/DataHandler';
import NetworkInfo from './utils/NetworkInfo';
import AppNavigator from './naviagtor';
import {Provider} from 'react-redux';
import {} from './screens';
import SplashScreen from 'react-native-splash-screen';
import {Colors} from './theme';
import {RequestUserPermission, NotificationListner} from './utils/Notification';
import FlashMessage from 'react-native-flash-message';
import {GalleryPicker} from './components';

const App = () => {
  // set store state
  const [storeState, setStore] = useState(null);

  // when store is configured
  const onStoreConfigure = store => {
    //init things

    DataHandler.setStore(store);
    NetworkInfo.addNetInfoListener();

    // setTimeout(() => {
    //   setStore(store);
    // }, 3000);
    // set store state

    // hide splash
    SplashScreen.hide();
  };

  useEffect(() => {
    // configure store
    configureStore(onStoreConfigure);
    RequestUserPermission();
    NotificationListner();
    // unscribe to all things on unmount
    return () => {
      NetworkInfo.removeNetInfoListener();
    };
  }, []);

  // if (storeState === null) {
  //   return <CustomSplashScreen />;
  // }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Provider store={storeState}>
        <StatusBar backgroundColor={Colors.HeaderBG} />
        <AppNavigator />
        <GalleryPicker ref={ref => DataHandler.setGalleryModalRef(ref)} />
        <FlashMessage position="bottom" />
      </Provider>
    </View>
  );
};

export default App;
