import React, { useState, useEffect } from 'react';
import {TouchableOpacity, View, Text, FlatList} from 'react-native';
import styles from './Styles';
import {Colors, whiteColorWithOpacity} from '../../Global/GlobalCSS';
import {CourseArray} from '../../Global/CourseArray';
import {useNavigation} from '@react-navigation/native';
import { getCourses } from '../../backenAPICalls/coursesAPICall';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';


const CourseCard = ({ selectedCoursesArray }) => {
  const {navigate} = useNavigation();
  const [courses, setCourses] = useState('')
  console.log(selectedCoursesArray)

  const {accessToken, _id} = useSelector(state => state?.login);

  const onCourseSelect = (course) => {
    if(selectedCoursesArray){
      navigate('SelectedCourse', course);
    }
    else{
      navigate('SelectCourse', {
        courseId: course._id,
        courseName: course.title,
        isAcademic: course.isAcademic,
      })
    }
  }

  const allCourses = async () => {
  // console.log('Bearer ' + accessToken)
    const headers = { token: 'Bearer ' + accessToken }
    const res = await getCourses(headers)
    if(res){
      setCourses(res.data)
    }
    console.log(res.data, 'all courses')
  }

  useEffect(() => {
    allCourses()
  }, [])
  

  return (
    <View style={[styles.mainContainer]}>
      <Text style={styles.mainHeading}>
       { selectedCoursesArray != null ? 'Your Courses' : 'Select Course' }
      </Text>
      
      <FlatList
        data={selectedCoursesArray ? selectedCoursesArray : courses}
        contentContainerStyle={{
          flexDirection: 'row',
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity 
          style={[styles.container, styles.boxShadow, {position: 'relative'}]} 
          onPress={() => onCourseSelect(item)}
          >
            {
              selectedCoursesArray ? 
              <>
                <Icon name="book" size={30} color={Colors.primary} />
                <Text style={styles.textStyles}>{item.course.title}</Text>
                {/* { item.hasUpdate &&
                  <View style={styles.notification}>
                      <Text style={{fontWeight:'bold', textAlign:'center'}}> 1 </Text>                    
                  </View> 
                } */}
              </>
            : 
              <>
                <Icon name="book" size={30} color={Colors.primary} />
                <Text style={styles.textStyles}>{item.title}</Text>
              </>
            }
            
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CourseCard;
