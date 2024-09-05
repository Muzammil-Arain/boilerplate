import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Candidate from './src/screens/Candidate';

const App = props => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <Candidate />;
};

export default App;
