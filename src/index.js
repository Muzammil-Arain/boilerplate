//Lib import
import configureStore from './store';
import {Provider} from 'react-redux';
import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';
import {RequestUserPermission, NotificationListner} from './utils/Notification';

//Local import
import {} from './screens';
import {Colors} from './theme';
import AppNavigator from './naviagtor';
import {GalleryPicker} from './components';
import DataHandler from './utils/DataHandler';
import NetworkInfo from './utils/NetworkInfo';
import {StatusBar, View} from 'react-native';
import {LocalizationProvider} from './helper/lanaguagecontext';

const App = () => {
  // set store state
  const [storeState, setStore] = useState(null);

  // when store is configured
  const onStoreConfigure = store => {
    //init things

    DataHandler.setStore(store);
    NetworkInfo.addNetInfoListener();

    setTimeout(() => {
      setStore(store);
    }, 3000);
    // set store state

    // hide splash
    SplashScreen.hide();
  };

  useEffect(() => {
    // configure store
    configureStore(onStoreConfigure);
    // RequestUserPermission();
    // NotificationListner();
    // unscribe to all things on unmount
    return () => {
      NetworkInfo.removeNetInfoListener();
    };
  }, []);

  if (storeState === null) {
    return null;
  }

  return (
    <Provider store={storeState}>
      <LocalizationProvider>
        <AppNavigator />
        <GalleryPicker ref={ref => DataHandler.setGalleryModalRef(ref)} />
        <FlashMessage position="bottom" />
      </LocalizationProvider>
    </Provider>
  );
};

export default App;
