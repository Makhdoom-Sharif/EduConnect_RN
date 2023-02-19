import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  PixelRatio,
  Dimensions,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView      
} from 'react-native';
import {SafeAreaStyles} from '../../Global/GlobalCSS';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './Styles';
import {useNavigation} from '@react-navigation/native';

export default function SelectCourse({ route }) {
  //responsive font size
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

  // based on iphone 5s's scale
  const scale = SCREEN_WIDTH / 320;

  const normalize = size => {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
  };
  
  const navigation = useNavigation();
  const { courseId, courseName, courseLogo } = route.params;

  const [courseData, setCourseData] = useState(route.params ? { 
      courseId: courseId,
      courseName: courseName,
      courseLogo: courseLogo
    } : 
    null
  )

  const [classOpen, setClassOpen] = useState(false);
  const [classValue, setclassValue] = useState(null);
  const [courseClass, setCourseClass] = useState([
    {
      label: 'Matriculation',
      value: 1,
    },
    {
      label: 'Intermediate',
      value: 2,
    },
    {
      label: 'O Levels',
      value: 3,
    },
    {
      label: 'A Levels',
      value: 4,
    },
    {
      label: 'Bachelors of Science',
      value: 5,
    },
  ]);

  const [boardOpen, setBoardOpen] = useState(false);
  const [boardValue, setBoardValue] = useState(null);
  const [board, setBoard] = useState([
    {
      label: 'Karachi Board',
      value: 1,
    },
    {
      label: 'Federal Board',
      value: 2,
    },
    {
      label: 'Cambridge',
      value: 3,
    },
    {
      label: 'HSC',
      value: 4,
    },
    {
      label: 'SBTE',
      value: 5,
    },
  ]);

  const [tutorExperienceOpen, setTutorExperienceOpen] = useState(false);
  const [tutorExperienceValue, setTutorExperienceValue] = useState(null);
  const [tutorExperience, setTutorExperience] = useState([
    {
      label: '1 Year',
      value: 1,
    },
    {
      label: '2 Years',
      value: 2,
    },
    {
      label: '3 Years',
      value: 3,
    },
    {
      label: '4 Years',
      value: 4,
    },
    {
      label: '5 Years',
      value: 5,
    },
    {
      label: '6 Years',
      value: 6,
    },
  ]);

  const [jobTitle, setJobTitle] = useState('')
  const [jobDescription, setJobDescription] = useState('')

  const [budget, setBudget] = useState(0);

  const searchTutor = () => {
    if(courseClass && tutorExperience && budget){
      //api call to post job

      //alert after response success
      Alert.alert('Request Posted', 'Interested Tutors will contact you shortly', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
    else{
       //alert after response failure
      Alert.alert('Error', 'Please provide data to continue', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  }

  return (
    <SafeAreaView style={SafeAreaStyles}>
      <ScrollView style={styles.scrollView} nestedScrollEnabled={true}>
      {
        courseData ?
        <View style={styles.container}>
          <Image
            style={[styles.logo, styles.mb20]}
            source={{
              uri: courseData.courseLogo
            }}
          />
          <Text
            style={[styles.mb30, styles.mainHeading, {fontSize: normalize(30)}]}>
            {courseData.courseName}
          </Text>

          <View style={[styles.mb10, {width: '100%'}]}>
            <Text
              style={[styles.textWhite, {fontSize: normalize(15)}]}>
              Provide Job Title:
            </Text>
            <TextInput
              style={{ 
              height: 40, 
              borderColor: 'gray', 
              borderWidth: 1,
              placeholderTextColor: 'gray',
              backgroundColor:"#fff",
              borderRadius: 7
            }}
              onChangeText={text => setJobTitle(text)}
              value={jobTitle}
            />
          </View>

          <View style={[styles.mb10, {width: '100%'}]}>
            <Text
              style={[styles.textWhite, {fontSize: normalize(15)}]}>
              Provide Job Description:
            </Text>
            <TextInput
              style={{ 
              height: 80, 
              borderColor: 'gray', 
              borderWidth: 1,
              placeholderTextColor: 'gray',
              backgroundColor:"#fff",
              borderRadius: 7
            }}
              onChangeText={text => setJobDescription(text)}
              value={jobDescription}
              multiline={true}
              numberOfLines={4}
            />
          </View>

          <View style={[styles.mb10, {width: '100%'}]}>
            <Text
              style={[styles.textWhite, {fontSize: normalize(15)}]}>
              Select Class:
            </Text>
            <DropDownPicker
              style={{zIndex: 1}}
              open={classOpen}
              value={classValue}  
              items={courseClass}
              setOpen={setClassOpen}
              setValue={setclassValue}
              setItems={setCourseClass}
            />
          </View>

          <View style={[styles.mb10, {width: '100%'}]}>
            <Text
              style={[styles.textWhite, {fontSize: normalize(15)}]}>
              Select Board:
            </Text>
            <DropDownPicker
              style={{zIndex: 1}}
              open={boardOpen}
              value={boardValue}
              items={board}
              setOpen={setBoardOpen}
              setValue={setBoardValue}
              setItems={setBoard}
            />
          </View>
          
          <View style={[styles.mb10, {width: '100%'}]}>
            <Text
              style={[styles.textWhite, {fontSize: normalize(15)}]}>
              Select Preferred Tutor Experience:
            </Text>
            <DropDownPicker
              style={{zIndex: 1}}
              open={tutorExperienceOpen}
              value={tutorExperienceValue}
              items={tutorExperience}
              setOpen={setTutorExperienceOpen}
              setValue={setTutorExperienceValue}
              setItems={setTutorExperience}
            />
          </View>

          <View style={[styles.mb10, {width: '100%'}]}>
            <Text
              style={[styles.textWhite, {fontSize: normalize(15)}]}>
              Provide Job Budget:
            </Text>
            <TextInput
              style={{ 
              height: 40, 
              borderColor: 'gray', 
              borderWidth: 1,
              placeholderTextColor: 'gray',
              backgroundColor:"#fff",
              borderRadius: 7
            }}
              onChangeText={text => setBudget(text)}
              value={budget}
              keyboardType='numeric'
            />
          </View>

          <View style={[styles.mb10, {width: '100%'}]}>
            <TouchableOpacity
              style={[styles.button, styles.mt20, {textAlign:'center'}]}
              onPress={() => searchTutor()}
              >
              <Text style={[styles.textStyles, styles.textWhite]}>Find Tutor</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.mt10, {textAlign:'center'}]}
              onPress={() => navigation.goBack()}>
              <Text style={[styles.textStyles, styles.textWhite]}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
        :
        <View style={styles.container}>
          <Text>No data available</Text>
        </View>
      }
      </ScrollView>
    </SafeAreaView>
  );
}