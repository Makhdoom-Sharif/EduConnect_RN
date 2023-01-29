import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {SafeAreaStyles} from '../../../Global/GlobalCSS';
import CourseCard from '../../../components/CourseCard';
import BoardCard from '../../../components/BoardCard';
import SkillBaseCard from '../../../components/SkillBaseCard';
import SearchLocation from '../../../components/SearchLocation';
import RecommendCard from '../../../components/RecommendCard';
import styles from './Styles';
import {useNavigation} from '@react-navigation/native';

const StudentHome = () => {
  const {navigate} = useNavigation();
  return (
    <SafeAreaView style={SafeAreaStyles}>
      <View
        style={styles.SearchLocationContainer}
        onStartShouldSetResponder={() => navigate('SearchByLocation')}>
        <SearchLocation />
      </View>
      <ScrollView style={styles.ScrollViewStyles}>
        <CourseCard />
        <View style={styles.cardSpace}>
          <BoardCard />
        </View>
        <View>
          <SkillBaseCard />
        </View>
        <View style={styles.cardSpace}>
          <RecommendCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StudentHome;
