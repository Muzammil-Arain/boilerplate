import React from 'react';
import {View} from 'react-native';
import strings from '../../i18n/index';
import {StyleSheet} from 'react-native';
import {Fonts, Metrics} from '../../theme';
import {DataHandler, NavigationService} from '../../utils';
import {TextInputNative} from '../../components';
import {AppButton, Background, ScaleText} from '../../common';
import {useHookForm, ValidationSchema} from '../../utils/ValidationUtil';
import {StackNav} from '../../naviagtor/stackkeys';

const ProjectName = ({navigation}) => {
  const isDarkMode = DataHandler.getAppTheme();
  const [formObj, projectNameProps] = useHookForm(
    ['projectname'],
    {},
    ValidationSchema.projectName,
  );

  const submit = formObj.handleSubmit(values => {
    const handlepayload = {
      project_name: values.projectname,
    };
    NavigationService.navigate(StackNav.ProjectDetails);
  });

  return (
    <Background showHeader={true} showProfile={true} isDarkMode={isDarkMode}>
      <ScaleText
        isDarkMode={isDarkMode}
        fontFamily={Fonts.type.Bold}
        fontSize={Fonts.size.size_50}
        text={'Enter your project name'}
      />
      <ScaleText
        isDarkMode={isDarkMode}
        fontSize={Fonts.size.size_15}
        fontFamily={Fonts.type.Regular}
        TextStyle={styles.descriptionText}
        text={strings.Lorem}
      />
      <View style={{marginBottom: Metrics.scaleHorizontal(40)}}>
        <TextInputNative
          title={'Project Name*'}
          isDarkMode={isDarkMode}
          customPlaceholder={'Enter Your Project Name'}
          topSpaceLarge
          {...projectNameProps}
        />
      </View>

      <AppButton onPress={submit} title={'Next'} />
      <AppButton
        ShowLinear={false}
        onPress={() => {
          NavigationService.goBack();
        }}
        title={'Cancel'}
      />
    </Background>
  );
};

export default ProjectName;

const styles = StyleSheet.create({
  descriptionText: {
    marginBottom: 20,
  },
});
