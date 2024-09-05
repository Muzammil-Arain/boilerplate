import configureStore from './store';
import {Provider} from 'react-redux';
import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';
import {RequestUserPermission, NotificationListner} from './utils/Notification';

// Local import
import {} from './screens';
import AppNavigator from './naviagtor';
import {GalleryPicker} from './components';
import DataHandler from './utils/DataHandler';
import NetworkInfo from './utils/NetworkInfo';
import {LocalizationProvider} from './helper/lanaguagecontext';
import {Appearance} from 'react-native';

const App = () => {
  const [storeState, setStore] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(
    Appearance.getColorScheme() === 'dark',
  );

  const onStoreConfigure = store => {
    DataHandler.setStore(store);
    NetworkInfo.addNetInfoListener();

    setTimeout(() => {
      setStore(store);
    }, 3000);

    SplashScreen.hide();
  };

  useEffect(() => {
    // Configure store
    configureStore(onStoreConfigure);
    DataHandler.setAppTheme(isDarkMode);
    // RequestUserPermission();
    // NotificationListner();

    // Listen for theme changes
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      const darkMode = colorScheme === 'dark';
      setIsDarkMode(darkMode);
      DataHandler.setAppTheme(darkMode);
    });

    // Clean up listener on unmount
    return () => {
      subscription.remove();
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
