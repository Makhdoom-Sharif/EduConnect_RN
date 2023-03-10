import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, FlatList } from 'react-native';
import styles from './Styles';
import { Colors, whiteColorWithOpacity } from '../../Global/GlobalCSS';
import { CourseArray } from '../../Global/CourseArray';
import { useNavigation } from '@react-navigation/native';
import { getCourses } from '../../backenAPICalls/coursesAPICall';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';



const CourseCard = ({ selectedCoursesArray }) => {
  const { navigate } = useNavigation();
  const [courses, setCourses] = useState('')
  console.log(selectedCoursesArray, 'student selected courses')

  const { accessToken, _id } = useSelector(state => state?.login);

  const onCourseSelect = (course, id) => {
    if (id == 1) {
      navigate('SelectedCourse', course);
    }
    else {
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
    if (res) {
      setCourses(res.data)
    }
    console.log(res.data, 'all courses')
  }


  useEffect(() => {
    allCourses()
  }, [])

  // useEffect(() => {
  //   allCourses()
  // }, [refreshState])


  return (
    <View>
      <View style={[styles.mainContainer, {marginBottom:20}]}>
        {
          selectedCoursesArray ?
            <>
              <Text style={styles.mainHeading}>
                Your Courses
              </Text>
              <FlatList
                data={selectedCoursesArray}
                contentContainerStyle={{
                  flexDirection: 'row',
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[styles.container, styles.boxShadow, { position: 'relative' }]}
                    onPress={() => onCourseSelect(item, 1)}
                  >
                    {/* {
                selectedCoursesArray ? 
                <> */}
                    <Icon name="book" size={30} color={Colors.primary} />
                    {/* <Text style={styles.textStyles}>{item.description.substring(0, 5).concat('...')}</Text> */}
                    <Text style={[styles.textStyles, { fontSize: 20 }]}>{item.description.substring(0,10).concat('...')}</Text>
                    <Text style={[styles.textStyles, { fontSize: 14 }]}>{item.course.title}</Text>
                    <Text style={[styles.textStyles, {
                      backgroundColor: Colors.secondary, marginTop: 5,
                      paddingVertical: 2, paddingHorizontal: 10, borderRadius: 5, fontSize: 14, fontWeight: 'bold'
                    }]}>
                      Rs.{item.jobBudget}</Text>
                    <Text style={[styles.textStyles, {color:'#fff',
                      backgroundColor: Colors.primary, marginTop: 5,
                      paddingVertical: 1, paddingHorizontal: 10, borderRadius: 5, fontSize: 10, fontWeight: 'bold'
                    }]}>
                      {item.status}</Text>
                    {/* </>
              : 
                <>
                  <Icon name="book" size={30} color={Colors.primary} />
                  <Text style={styles.textStyles}>{item.title}</Text>
                </>
              } */}

                  </TouchableOpacity>
                )}
              />
            </>
            :
            <View style={{ paddingBottom: 10 }}>
              <Text style={styles.mainHeading}>
                Your Jobs
              </Text>
              <Text style={[styles.mainHeading, { fontSize: 13 }]}>
                No jobs selected
              </Text>
            </View>
        }
      </View>

      <View style={[styles.mainContainer]}>
        {
          courses ?
            <>
              <Text style={styles.mainHeading}>
                Select Course
              </Text>
              <FlatList
                data={courses}
                contentContainerStyle={{
                  flexDirection: 'row',
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[styles.container, styles.boxShadow, { position: 'relative' }]}
                    onPress={() => onCourseSelect(item, 2)}
                  >
                   <Icon name="book" size={30} color={Colors.primary} />
                    <Text style={styles.textStyles}>{item.title}</Text>
                  </TouchableOpacity>
                )}
              />
            </>
            :
            <View style={{ paddingBottom: 10 }}>
              <Text style={styles.mainHeading}>
                Your Jobs
              </Text>
              <Text style={[styles.mainHeading, { fontSize: 13 }]}>
                No jobs selected
              </Text>
            </View>
        }
      </View>

    </View>
  );
};

export default CourseCard;
