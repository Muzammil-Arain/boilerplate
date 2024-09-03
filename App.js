import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import ProjectType from './src/screens/ProjectType';

const App = props => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <ProjectType />;
};

export default App;
