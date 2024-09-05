import {StyleSheet} from 'react-native';
import React from 'react';
import {Background} from '../../common';
import {DataHandler} from '../../utils';

const CandidateDetails = () => {
  const isDarkMode = DataHandler.getAppTheme();
  return (
    <Background
      scrollDisable={true}
      showHeader={true}
      showProfile={true}
      isDarkMode={isDarkMode}></Background>
  );
};

export default CandidateDetails;

const styles = StyleSheet.create({});
