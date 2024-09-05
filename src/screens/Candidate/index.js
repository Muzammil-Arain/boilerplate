import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Easing,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Colors, Fonts, Images, Metrics} from '../../theme';
import {DataHandler, NavigationService} from '../../utils';
import {AppButton, Background, ImageIcon, ScaleText} from '../../common';
import Animated, {FadeIn, FadeOut, Layout} from 'react-native-reanimated';
import {ButtonView} from '../../components';
import ImageView from 'react-native-image-viewing';
import {StackNav} from '../../naviagtor/stackkeys';

// Dummy candidate data
const candidateData = [
  {
    id: 1,
    name: 'Candidate 001',
    location: 'MIAMI, FL, USA',
    experience: '1-5 Years',
    background: 'ABC, DEF, GHI',
    education: 'Masters',
    salary: '$9999/m',
    image: Images.iconsource.pilotImage1,
  },
  {
    id: 2,
    name: 'Candidate 002',
    location: 'NEW YORK, NY, USA',
    experience: '5-10 Years',
    background: 'XYZ, LMN, OPQ',
    education: 'Bachelors',
    salary: '$12000/m',
    image: Images.iconsource.pilotImage2,
  },
  {
    id: 3,
    name: 'Candidate 003',
    location: 'SAN FRANCISCO, CA, USA',
    experience: '10+ Years',
    background: 'UVW, RST, YZA',
    education: 'PhD',
    salary: '$15000/m',
    image: Images.iconsource.pilotImage3,
  },
];

const Candidate = ({navigation}) => {
  const [statedata, setStateData] = useState({
    isLoading: true,
    showImageModal: false,
    candidateProfileImage: [],
    candidates: candidateData,
  });
  const isDarkMode = DataHandler.getAppTheme();
  const opacityRefs = useRef(new Map());

  useEffect(() => {
    const timer = setTimeout(
      () => setStateData(prv => ({...prv, isLoading: false})),
      3000,
    );
    return () => clearTimeout(timer);
  }, [navigation]);

  useEffect(() => {
    statedata.candidates.forEach(candidate => {
      if (!opacityRefs.current.has(candidate.id)) {
        opacityRefs.current.set(candidate.id, new Animated.Value(1));
      }
    });
  }, [statedata.candidates]);

  const handleRemoveCandidate = id => {
    const opacity = opacityRefs.current.get(id);
    if (opacity) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => {
        setStateData(prv => ({
          ...prv,
          candidates: prv.candidates.filter(candidate => candidate.id !== id),
        }));
        opacityRefs.current.delete(id);
      });
    }
  };

  const renderSkeleton = () => (
    <SkeletonPlaceholder
      backgroundColor={isDarkMode ? Colors.Black_42 : Colors.Black_59}
      highlightColor={
        isDarkMode
          ? Colors.SkeletonHighlightDark
          : Colors.SkeletonHighlightLight
      }>
      {[1, 2, 3].map((_, index) => (
        <View key={index} style={styles.skeletonCard}>
          <View style={styles.skeletonImage} />
          <View style={styles.skeletonInfo}>
            <View style={styles.skeletonTitle} />
            <View style={styles.skeletonDetailRow} />
            <View style={styles.skeletonDetailRow} />
            <View style={styles.skeletonDetailRow} />
            <View style={styles.skeletonDetailRow} />
          </View>
        </View>
      ))}
    </SkeletonPlaceholder>
  );

  const renderContent = () => (
    <Animated.ScrollView
      contentContainerStyle={styles.container}
      entering={FadeIn}
      exiting={FadeOut}
      layout={Layout.springify()}>
      {statedata.candidates.map(candidate => (
        <Animated.View
          key={candidate.id}
          style={[
            styles.candidateCard,
            {
              opacity: opacityRefs.current.get(candidate.id),
              backgroundColor: isDarkMode ? Colors.Black_42 : Colors.White,
            },
          ]}>
          <ButtonView
            onPress={() =>
              setStateData(prv => ({
                ...prv,
                candidateProfileImage: [{uri: candidate.image}],
                showImageModal: true,
              }))
            }>
            <ImageBackground
              resizeMode="contain"
              source={{uri: candidate.image}}
              style={styles.imageBackground}
              imageStyle={styles.imageStyle}>
              <View style={styles.imageOverlay}>
                <TouchableOpacity
                  onPress={() => handleRemoveCandidate(candidate.id)}
                  style={styles.iconButton}>
                  <ImageIcon
                    tintColor={Colors.White}
                    source={{
                      uri: Images.iconsource.closeicon,
                    }}
                    width={20}
                    height={20}
                  />
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity style={styles.iconButton}>
                  <ImageIcon
                    tintColor={Colors.White}
                    source={{
                      uri: Images.iconsource.addfriend,
                    }}
                    width={30}
                    height={30}
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </ButtonView>

          <View style={styles.candidateInfo}>
            {renderCandidateInfo(isDarkMode, candidate)}
          </View>
          <AppButton
            title={'View More'}
            onPress={() => {
              NavigationService.navigate(StackNav.CandidateDetails);
            }}
            buttonStyle={styles.viewMoreButton}
            textStyle={styles.viewMoreButtonText}
          />
        </Animated.View>
      ))}
    </Animated.ScrollView>
  );

  return (
    <Background
      scrollDisable={true}
      showHeader={true}
      showProfile={true}
      isDarkMode={isDarkMode}>
      <ScaleText
        isDarkMode={isDarkMode}
        fontFamily={Fonts.type.Bold}
        fontSize={Fonts.size.size_40}
        text={'Select'}
      />
      <View style={{marginTop: -30}}>
        <ScaleText
          isDarkMode={isDarkMode}
          fontFamily={Fonts.type.Bold}
          fontSize={Fonts.size.size_40}
          text={'Candidate'}
        />
      </View>
      <ScaleText
        isDarkMode={isDarkMode}
        fontSize={Fonts.size.size_15}
        fontFamily={Fonts.type.Regular}
        TextStyle={styles.descriptionText}
        text={
          'It is a long established fact that a reader will be distracted by the readable...'
        }
      />
      {statedata.isLoading ? renderSkeleton() : renderContent()}
      <ImageView
        imageIndex={0}
        visible={statedata.showImageModal}
        images={statedata.candidateProfileImage}
        onRequestClose={() =>
          setStateData(prv => ({...prv, showImageModal: false}))
        }
      />
    </Background>
  );
};

const renderCandidateInfo = (isDarkMode, candidate) => {
  const details = [
    {label: 'Candidate Location', value: candidate.location},
    {label: 'Level of Experience', value: candidate.experience},
    {label: 'Other Preferred Background', value: candidate.background},
    {label: 'Highest Education', value: candidate.education},
    {label: 'Min Salary Request', value: candidate.salary},
  ];

  return (
    <>
      <View
        style={[
          styles.candidateHeader,
          {borderBottomColor: isDarkMode ? Colors.White : Colors.Black},
        ]}>
        <ScaleText
          TextStyle={styles.candidateNameStyle}
          isDarkMode={isDarkMode}
          text={candidate.name}
          numberOfLines={1}
          fontSize={Fonts.size.size_18}
          fontFamily={Fonts.type.Bold}
        />
        <View style={styles.iconColumn}>
          {renderIcon(isDarkMode, Images.iconsource.videoicon, 'Video')}
          <View
            style={[
              styles.verticalDivider,
              {backgroundColor: !isDarkMode ? Colors.Black : Colors.Whiite_B1},
            ]}
          />
          {renderIcon(isDarkMode, Images.iconsource.resumeicon, 'Resume')}
        </View>
      </View>
      {details.map((detail, index) => (
        <View key={index} style={styles.detailRow}>
          <ScaleText
            isDarkMode={isDarkMode}
            text={detail.label}
            fontFamily={Fonts.type.Regular}
            fontSize={Fonts.size.size_13}
          />
          <ScaleText
            numberOfLines={1}
            TextStyle={styles.candiateInfoTextStyle}
            isDarkMode={isDarkMode}
            text={detail.value}
            fontSize={Fonts.size.size_14}
            fontFamily={Fonts.type.Medium}
          />
        </View>
      ))}
    </>
  );
};

const renderIcon = (isDarkMode, uri, text) => (
  <ButtonView style={styles.iconItem}>
    <ImageIcon isDarkMode={isDarkMode} source={{uri}} width={18} height={18} />
    <ScaleText
      isDarkMode={isDarkMode}
      text={text}
      TextStyle={{marginTop: -2}}
      fontSize={Fonts.size.size_10}
      fontFamily={Fonts.type.Medium}
    />
  </ButtonView>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  descriptionText: {
    marginBottom: 20,
  },
  candidateCard: {
    borderRadius: 15,
    marginBottom: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  imageBackground: {
    height: Metrics.scaleVertical(200),
    width: '100%',
    borderRadius: 15,
  },
  imageStyle: {
    borderRadius: 15,
  },
  verticalDivider: {
    width: 0.5,
    height: 30,
    alignSelf: 'center',
  },
  candidateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    paddingBottom: 5,
    marginBottom: 5,
  },
  imageOverlay: {
    position: 'absolute',
    width: Metrics.scaleHorizontal(120),
    borderRadius: 8,
    bottom: 10,
    backgroundColor: Colors.Black_21,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  candiateInfoTextStyle: {
    textAlign: 'right',
    width: Metrics.scaleHorizontal(120),
  },
  candidateNameStyle: {
    width: Metrics.scaleHorizontal(170),
  },
  iconColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Metrics.scaleHorizontal(110),
  },
  iconItem: {
    alignItems: 'center',
    width: Metrics.scaleHorizontal(50),
  },
  iconButton: {
    width: 60,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    width: 0.5,
    height: 30,
    alignSelf: 'center',
    backgroundColor: Colors.Black_58,
  },
  candidateInfo: {
    paddingTop: 10,
  },
  skeletonCard: {
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
    paddingHorizontal: 20,
  },
  skeletonImage: {
    height: Metrics.scaleVertical(200),
    width: '100%',
    borderRadius: 15,
  },
  skeletonInfo: {
    paddingTop: 10,
  },
  skeletonTitle: {
    height: 50,
    width: '100%',
    marginBottom: 10,
    borderRadius: 4,
  },
  skeletonDetailRow: {
    height: 30,
    width: '100%',
    marginBottom: 10,
    borderRadius: 4,
  },
  viewMoreButton: {
    marginTop: 10,
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },
  viewMoreButtonText: {
    color: Colors.White,
  },
});

export default Candidate;
