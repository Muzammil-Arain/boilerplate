//ib import
import {useColorScheme} from 'react-native';
import LocalizedStrings from 'react-native-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useContext, useEffect} from 'react';

//Language import
import {Util} from '../utils';
import i18nen from '../i18n/en';
import i18nur from '../i18n/ur';
import i18nar from '../i18n/ar';

// Keys import
import {LocalStoragekey} from '../config/Constants';

const LocalizationContext = createContext();

const strings = new LocalizedStrings({
  en: i18nen,
  ur: i18nur,
  ar: i18nar,
});

export const LocalizationProvider = ({children}) => {
  const systemTheme = useColorScheme();
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState(systemTheme);

  useEffect(() => {
    const initializeSettings = async () => {
      try {
        const [selectedLanguage, selectedTheme] = await Promise.all([
          AsyncStorage.getItem(LocalStoragekey.LANGUAGE),
          AsyncStorage.getItem(LocalStoragekey.THEME_COLOUR),
        ]);

        if (selectedLanguage) {
          const lang = JSON.parse(selectedLanguage);
          strings.setLanguage(lang);
          setLanguage(lang);
        }

        if (selectedTheme) {
          setTheme(selectedTheme);
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
        Util.showMessage('Failed to load settings:', error);
      }
    };

    initializeSettings();
  }, []);

  const switchLanguage = async lang => {
    try {
      strings.setLanguage(lang);
      setLanguage(lang);
      await AsyncStorage.setItem(
        LocalStoragekey.LANGUAGE,
        JSON.stringify(lang),
      );
    } catch (error) {
      Util.showMessage('Failed to switch language:', error);
      console.error('Failed to switch language:', error);
    }
  };

  const switchTheme = async newTheme => {
    try {
      setTheme(newTheme);
      await AsyncStorage.setItem(LocalStoragekey.THEME_COLOUR, newTheme);
    } catch (error) {
      console.error('Failed to switch theme:', error);
    }
  };

  return (
    <LocalizationContext.Provider
      value={{strings, switchLanguage, language, theme, switchTheme}}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => useContext(LocalizationContext);
