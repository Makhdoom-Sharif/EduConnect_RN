import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { SafeAreaStyles } from '../../../Global/GlobalCSS';
import CourseCard from '../../../components/CourseCard';
import JobCard from '../../../components/JobCard';
import BoardCard from '../../../components/BoardCard';
import SkillBaseCard from '../../../components/SkillBaseCard';
import SearchLocation from '../../../components/SearchLocation';
import RecommendCard from '../../../components/RecommendCard';
import styles from './Styles';
import { useNavigation } from '@react-navigation/native';
// import {selectedCoursesArray} from '../../../Global/CourseArray';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import axios from 'axios';

const StudentHome = () => {
  const loginDetails = useSelector(state => state?.login)
  const { navigate } = useNavigation();
  const [studentJobs, setStudentJobs] = useState(null)


  let selectedCoursesArray = [
    {
      icon: MaterialCommunityIcons,
      iconName: 'math-integral-box',
      logo: 'https://thumbs.dreamstime.com/b/physics-icon-vector-isolated-white-background-physics-transparent-sign-sign-symbols-thin-linear-outline-style-physics-134073851.jpg',
      id: 1,
      courseName: 'Maths',
      hasUpdate: true
    },
    {
      icon: MaterialIcons,
      iconName: 'science',
      logo: 'https://thumbs.dreamstime.com/b/physics-icon-vector-isolated-white-background-physics-transparent-sign-sign-symbols-thin-linear-outline-style-physics-134073851.jpg',
      id: 2,
      courseName: 'Chemistry',
      hasUpdate: false
    },
    {
      icon: MaterialCommunityIcons,
      iconName: 'math-compass',
      logo: 'https://thumbs.dreamstime.com/b/physics-icon-vector-isolated-white-background-physics-transparent-sign-sign-symbols-thin-linear-outline-style-physics-134073851.jpg',
      id: 3,
      courseName: 'Physics',
      hasUpdate: false
    },
  ];

  let userJobsArray = [
    {
      icon: MaterialCommunityIcons,
      iconName: 'math-integral-box',
      logo: 'https://thumbs.dreamstime.com/b/physics-icon-vector-isolated-white-background-physics-transparent-sign-sign-symbols-thin-linear-outline-style-physics-134073851.jpg',
      id: 1,
      jobName: 'Maths',
      hasUpdate: true
    },
  ];


    const allStudentJobs = async () => {
      const headers = { token: 'Bearer ' + loginDetails.accessToken }
      console.log(headers)
      console.log(loginDetails._id)
      const res = await axios.get(`https://educonnectbackend-production.up.railway.app/api/jobs/student/${loginDetails._id}`, {
        headers
      })
      if(res){
        console.log(res.data, 'all student jobs')
        setStudentJobs(res.data)
      }
      // console.log(res.data, 'all student jobs')
    }

    useEffect(() => {
      allStudentJobs()
    }, [])
    

  // const [userType, setUserType] = useState(1); //1 STUDENT //2 TUTOR

  return (
    <SafeAreaView style={SafeAreaStyles}>
      {loginDetails?.role == 'student' ? (
        <>
          <View
            style={styles.SearchLocationContainer}
            onStartShouldSetResponder={() => navigate('SearchByLocation')}>
            <SearchLocation />
          </View>
          <ScrollView style={styles.ScrollViewStyles}>
            {selectedCoursesArray != null && (
              <View style={styles.cardSpace}>
                <CourseCard selectedCoursesArray={studentJobs ? studentJobs : null} />
              </View>
            )}
            <View>
              <CourseCard />
            </View>
            {/* <View style={styles.cardSpace}>
              <BoardCard />
            </View> */}
            <View style={styles.cardSpace}>
              <SkillBaseCard />
            </View>
            <View>
              <RecommendCard />
            </View>
          </ScrollView>
        </>
      ) : (
        <>
          <View
            style={styles.SearchLocationContainer}
            onStartShouldSetResponder={() => navigate('SearchByLocation')}>
            <SearchLocation />
          </View>
          <ScrollView style={styles.ScrollViewStyles}>
            {userJobsArray != null && (
              <View style={styles.cardSpace}>
                <JobCard userJobsArray={userJobsArray} />
              </View>
            )}
            <View>
              <JobCard />
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default StudentHome;
