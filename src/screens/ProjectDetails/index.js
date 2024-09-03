import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import strings from '../../i18n/index';
import {Colors, Fonts, Metrics} from '../../theme';
import {DataHandler} from '../../utils';
import {TextInputNative} from '../../components';
import {AppButton, Background, DropDownView, ScaleText} from '../../common';
import {useHookForm, ValidationSchema} from '../../utils/ValidationUtil';

const ProjectDetails = ({navigation}) => {
  const isDarkMode = DataHandler.getAppTheme() || false;
  const [formObj, projectNameProps] = useHookForm(
    ['projectname'],
    {},
    ValidationSchema.projectName,
  );

  const submit = formObj.handleSubmit(values => {
    const handlePayload = {
      project_name: values.projectname,
    };
    // Handle the payload as needed
  });

  return (
    <Background showHeader={true} showProfile={true} isDarkMode={isDarkMode}>
      <View style={styles.headerContainer}>
        <ScaleText
          color={Colors.LinearGradientTwo}
          fontSize={Fonts.size.size_13}
          fontFamily={Fonts.type.Bold}
          text={'PROJECT NAME'}
        />
      </View>
      <ScaleText
        isDarkMode={isDarkMode}
        fontFamily={Fonts.type.Bold}
        fontSize={Fonts.size.size_50}
        text={'Recruter app'}
      />
      <ScaleText
        isDarkMode={isDarkMode}
        fontSize={Fonts.size.size_15}
        fontFamily={Fonts.type.Regular}
        TextStyle={styles.descriptionText}
        text={strings.Lorem}
      />
      <DropDownView
        isDarkMode={isDarkMode}
        title="Select Industry*"
        value="Industry"
      />
      <DropDownView isDarkMode={isDarkMode} title="Employ Type*" value="Type" />
      <DropDownView isDarkMode={isDarkMode} title="Job Title*" value="Title" />
      <DropDownView
        isDarkMode={isDarkMode}
        title="Level of Experience for this job"
        value="Experience"
      />
      <View style={styles.textInputContainer}>
        <TextInputNative
          title={'Job Location*'}
          isDarkMode={isDarkMode}
          customPlaceholder={'Enter Your Job Location'}
          topSpaceLarge
          {...projectNameProps}
        />
      </View>
      <DropDownView
        isDarkMode={isDarkMode}
        title="Education"
        value="Education"
      />
      <DropDownView
        isDarkMode={isDarkMode}
        title="Candidate"
        value="Candidate"
      />
      <DropDownView isDarkMode={isDarkMode} title="Language" value="Language" />
      <DropDownView isDarkMode={isDarkMode} title="Passport" value="Passport" />
      <ScaleText
        text={'Salary Range'}
        isDarkMode={isDarkMode}
        fontFamily={Fonts.type.Medium}
        fontSize={Fonts.size.size_15}
      />
      <View style={styles.salaryRangeContainer}>
        <TextInput
          placeholderTextColor={Colors.Black_42}
          style={styles.salaryInput}
          placeholder="Hourly"
        />
        <TextInput
          placeholderTextColor={Colors.Black_42}
          style={styles.salaryInput}
          placeholder="Daily"
        />
        <TextInput
          placeholderTextColor={Colors.Black_42}
          style={styles.salaryInput}
          placeholder="Monthly"
        />
      </View>
      <TextInput
        placeholderTextColor={Colors.Black_42}
        style={styles.salaryInput}
        placeholder="Annually"
      />
      <View style={{marginVertical: 20}}>
        <AppButton onPress={submit} title={'Sign In'} />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'rgba(255, 63, 146, 0.15)',
    maxWidth: 120,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  descriptionText: {
    marginBottom: 20,
  },
  textInputContainer: {
    marginBottom: 10,
    marginTop: -15,
  },
  salaryRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  salaryInput: {
    padding: 0,
    height: 55,
    fontSize: Fonts.size.size_14,
    fontFamily: Fonts.type.Medium,
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Whiite_B1,
    borderRadius: 3,
    paddingLeft: 10,
    color: Colors.Black_21,
    minWidth: Metrics.scaleVertical(120),
  },
});

export default ProjectDetails;
