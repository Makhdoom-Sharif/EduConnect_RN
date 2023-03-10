import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { SafeAreaStyles } from '../../../Global/GlobalCSS';
import CourseCard from '../../../components/CourseCard';
import JobCard from '../../../components/JobCard';
import BoardCard from '../../../components/BoardCard';
import SkillBaseCard from '../../../components/SkillBaseCard';
import TopRatedTutors from '../../../components/TopRatedTutors';
import SearchLocation from '../../../components/SearchLocation';
import RecommendTopRated from '../../../components/RecommendTopRated';
import RecommendNearest from '../../../components/RecommendNearest';
import styles from './Styles';
import { useNavigation } from '@react-navigation/native';
// import {selectedCoursesArray} from '../../../Global/CourseArray';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { refresh } from '../../../store/action';
import TutorsByLocation from '../../../components/TutorsByLocation';

const StudentHome = () => {
  const loginDetails = useSelector(state => state?.login)
  const refreshState = useSelector(state => state?.refresh);
  const userLocation = useSelector(state => state?.tutorsByLocation);
  console.log(userLocation,'location')

  const { navigate } = useNavigation();
  const dispatch = useDispatch()
  const [studentJobs, setStudentJobs] = useState(null)
  const [teacherJobs, setTeacherJobs] = useState(null)


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


    const studentPostedJobs = async () => {
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


    const teacherSelectedJobs = async () => {
        const headers = { token: 'Bearer ' + loginDetails.accessToken }
        console.log(loginDetails._id, 'teacher')
        const res = await axios.get(`https://educonnectbackend-production.up.railway.app/api/jobs/teacher/started/${loginDetails._id}`, {
            headers
          });
        if(res){
          console.log(res.data, 'all teacher jobs')
          setTeacherJobs(res.data)
        }
      }


    useEffect(() => {
      if(loginDetails.role == 'student'){
        studentPostedJobs()
      }
      else{
        teacherSelectedJobs()
      }
    }, [])
    
    useEffect(() => {
      if(loginDetails.role == 'student'){
        studentPostedJobs()
      }
      else{
        teacherSelectedJobs()
      }
    }, [refreshState])

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
            <View style={styles.cardSpace}>
              <CourseCard selectedCoursesArray={studentJobs ? studentJobs : null} />
            </View>
            {/* <View style={styles.cardSpace}>
              <BoardCard />
            </View> */}
            {/* <View style={styles.cardSpace}>
              <SkillBaseCard />
              <TopRatedTutors/>
            </View> */}
            <View>
              <TutorsByLocation />
            </View>
            <View style={styles.cardSpace}>
              <RecommendTopRated />
            </View>
            <View>
              <RecommendNearest />
            </View>
          </ScrollView>
        </>
      ) : (
        <>
          {/* <View
            style={styles.SearchLocationContainer}
            onStartShouldSetResponder={() => navigate('SearchByLocation')}>
            <SearchLocation />
          </View> */}
          <ScrollView style={styles.ScrollViewStyles}>
              <View style={styles.cardSpace}>
                <JobCard teacherJobsArray={teacherJobs ? teacherJobs : null} />
              </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default StudentHome;
