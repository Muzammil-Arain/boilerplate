import {StyleSheet} from 'react-native';
import React from 'react';
import {AppButton, Background, ScaleText} from '../../common';
import {Fonts} from '../../theme';
import strings from '../../i18n/index';
import {DataHandler, NavigationService} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';

const ProjectType = ({navigation}) => {
  const isDarkMode = DataHandler.getAppTheme() || false;

  return (
    <Background showHeader={true} showProfile={true} isDarkMode={isDarkMode}>
      <ScaleText
        isDarkMode={isDarkMode}
        fontFamily={Fonts.type.Bold}
        fontSize={Fonts.size.size_50}
        text={'Choose what you want'}
      />
      <ScaleText
        text={strings.Lorem}
        isDarkMode={isDarkMode}
        fontSize={Fonts.size.size_15}
        fontFamily={Fonts.type.Regular}
        TextStyle={styles.descriptionText}
      />
      <AppButton
        onPress={() => {
          NavigationService.navigate(StackNav.ProjectName);
        }}
        title={'Manage Recruitment Projects'}
      />
      <AppButton
        ShowLinear={false}
        onPress={() => {}}
        title={'Find New Telent'}
      />
    </Background>
  );
};

export default ProjectType;

const styles = StyleSheet.create({
  descriptionText: {
    marginBottom: 20,
  },
});
