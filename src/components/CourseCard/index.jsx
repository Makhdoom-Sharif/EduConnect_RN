import React from 'react';
import {TouchableOpacity, View, Text, FlatList} from 'react-native';
import styles from './Styles';
import {Colors, whiteColorWithOpacity} from '../../Global/GlobalCSS';
import {CourseArray} from '../../Global/CourseArray';
import {useNavigation} from '@react-navigation/native';

const CourseCard = ({ selectedCoursesArray }) => {
  const {navigate} = useNavigation();

  const onCourseSelect = (course) => {
    if(selectedCoursesArray){
      navigate('SelectedCourse', {
        courseId: course.id,
        courseName: course.courseName,
        courseLogo: course.logo,
      });
    }
    else{
      navigate('SelectCourse', {
        courseId: course.id,
        courseName: course.courseName,
        courseLogo: course.logo,
      })
    }
  }

  return (
    <View style={[styles.mainContainer]}>
      <Text style={styles.mainHeading}>
       { selectedCoursesArray != null ? 'Your Courses' : 'Select Course' }
      </Text>
      <FlatList
        data={selectedCoursesArray !=undefined ? selectedCoursesArray : CourseArray}
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
            <item.icon name={item.iconName} size={40} color={Colors.primary} />
            <Text style={styles.textStyles}>{item.courseName}</Text>
            { item.hasUpdate &&
              <View style={styles.notification}>
                  <Text style={{fontWeight:'bold', textAlign:'center'}}> 1 </Text>                    
              </View> 
            }
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CourseCard;
