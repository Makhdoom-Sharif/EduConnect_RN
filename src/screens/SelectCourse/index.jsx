import React, { useState } from 'react';
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
  ScrollView,
  Modal
} from 'react-native';
import { SafeAreaStyles } from '../../Global/GlobalCSS';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './Styles';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { refresh } from '../../store/action';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function SelectCourse({ route }) {
  //responsive font size
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

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
  const dispatch = useDispatch()
  const { courseId, courseName, isAcademic } = route.params;
  const { _id, accessToken } = useSelector(state => state?.login);
  console.log(route.params, 'selected course')

  const [courseData, setCourseData] = useState(
    route.params
      ? {
        courseId: courseId,
        courseName: courseName,
        isAcademic: isAcademic,
      }
      : null,
  );
  console.log(courseData, 'course data')

  const [classOpen, setClassOpen] = useState(false);
  const [classValue, setclassValue] = useState(null);
  const [courseClass, setCourseClass] = useState([
    {
      label: 'Matriculation',
      value: 'Matriculation',
    },
    {
      label: 'Intermediate - I',
      value: 'Intermediate - I',
    },
    {
      label: 'Intermediate - II',
      value: 'Intermediate - II',
    },
    {
      label: 'O Levels',
      value: 'O Levels',
    },
    {
      label: 'A Levels',
      value: 'A Levels',
    },
    {
      label: 'Bachelors',
      value: 'Bachelors',
    },
  ]);

  const [boardOpen, setBoardOpen] = useState(false);
  const [boardValue, setBoardValue] = useState(null);
  const [board, setBoard] = useState([
    {
      label: 'Karachi Board',
      value: 'Karachi Board',
    },
    {
      label: 'Federal Board',
      value: 'Federal Board',
    },
    {
      label: 'Cambridge',
      value: 'Cambridge'
    },
    {
      label: 'HSC',
      value: 'HSC',
    },
    {
      label: 'SBTE',
      value: 'SBTE',
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

  const [payByOpen, setPayByOpen] = useState(false);
  const [payByValue, setPayByValue] = useState(null);
  const [payBy, setPayBy] = useState([
    {
      label: 'Per Hour',
      value: 'hourly',
    },
    {
      label: 'Per Month',
      value: 'monthly',
    },
    {
      label: 'Per Year',
      value: 'annually',
    },
    {
      label: 'One Time',
      value: 'oneTime',
    },
  ]);

  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [budget, setBudget] = useState(0);
  // const [cardExpirationDate, setCardExpirationDate] = useState(null)

  const [isDescriptionTouched, setIsDescriptionTouched] = useState(null)
  const [isClassTouched, setIsClassTouched] = useState(null)
  const [isBoardTouched, setIsBoardTouched] = useState(null)
  const [isExperienceTouched, setIsExperienceTouched] = useState(null)
  const [isJobBudgetTouched, setIsJobBudgetTouched] = useState(null)
  const [isPayMethodTouched, setIsPayMethodTouched] = useState(null)


  const postStudentJob = async () => {
    if (jobDescription && courseClass && board && tutorExperience && budget && payByValue) {
      //api call to post job
      let data = {
        student: _id,
        description: jobDescription,
        course: courseId,
        class: classValue,
        board: boardValue,
        experienceRequired: tutorExperienceValue.toString(),
        jobBudget: budget,
        // status: 'pending',
        jobPayDuration: payByValue
      }

      dispatch(refresh(false))
      try {
        const res = await axios.post('https://educonnectbackend-production.up.railway.app/api/jobs', data, {
          headers: {
            token: 'Bearer ' + accessToken
          }
        })
        if (res) {
          //alert after response success
          Alert.alert(
            'Job Posted',
            'Interested Tutors will contact you shortly',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              { text: 'OK', onPress: () => { dispatch(refresh(true)); navigation.goBack() } },
            ],
          );
        }
      } catch (error) {
        Alert.alert(error);
      }
    } else {
      //alert after response failure
      Alert.alert('Error', 'Please provide data to continue', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };

  return (
    <SafeAreaView style={SafeAreaStyles}>
      <ScrollView style={styles.scrollView} nestedScrollEnabled={true}>
        {courseData ? (
          <View style={styles.container}>
            <Image
              style={[styles.logo, styles.mb20]}
              source={{
                uri: 'https://static.vecteezy.com/system/resources/previews/003/808/019/original/open-book-icon-book-symbol-handbook-in-outline-style-free-vector.jpg',
              }}
            />
            <Text
              style={[
                styles.mb30,
                styles.mainHeading,
                { fontSize: normalize(30) },
              ]}>
              {courseData.courseName}
            </Text>

            {/* <View style={[styles.mb10, {width: '100%'}]}>
              <Text style={[styles.textWhite, {fontSize: normalize(15)}]}>
                Provide Job Title:
              </Text>
              <TextInput
                style={{
                  height: 40,
                  borderColor: 'gray',
                  borderWidth: 1,
                  placeholderTextColor: 'gray',
                  backgroundColor: '#fff',
                  borderRadius: 7,
                }}
                onChangeText={text => setJobTitle(text)}
                value={jobTitle}
              />
            </View> */}

            <View style={[styles.mb10, { width: '100%' }]}>
              <Text style={[styles.textWhite, { fontSize: normalize(15) }]}>
                Provide Job Description:
              </Text>
              <TextInput
                onFocus={() => setIsDescriptionTouched(true)}
                style={{
                  height: 80,
                  borderColor: 'gray',
                  borderWidth: 1,
                  placeholderTextColor: 'gray',
                  backgroundColor: '#fff',
                  borderRadius: 7,
                }}
                onChangeText={text => setJobDescription(text)}
                value={jobDescription}
                multiline={true}
                numberOfLines={4}
              />
            </View>
            <View style={{ width: '100%' }}>
              {isDescriptionTouched && (!jobDescription || jobDescription.length == 0) &&
                <Text style={[styles.error, { textAlign: 'center' }]}>Please provide job description</Text>}

              {isDescriptionTouched && (jobDescription && jobDescription.length < 20) &&
                <Text style={[styles.error, { textAlign: 'center' }]}>job description should be at least 20 characters long.</Text>}

              {isDescriptionTouched && (jobDescription && jobDescription.length > 50) &&
                <Text style={[styles.error, { textAlign: 'center' }]}>job description should be at least 20 characters long.</Text>}
            </View>

            <View style={[styles.mb10, { width: '100%' }]}>
              <Text style={[styles.textWhite, { fontSize: normalize(15) }]}>
                Select Class:
              </Text>
              <DropDownPicker
                style={{ zIndex: 1 }}
                open={classOpen}
                value={classValue}
                items={courseClass}
                setOpen={setClassOpen}
                setValue={setclassValue}
                setItems={setCourseClass}
                onPress={() => setIsClassTouched(true)}
              />
            </View>
            <View style={{ width: '100%' }}>
              {isClassTouched && !classValue &&
                <Text style={[styles.error, { textAlign: 'center' }]}>Please select class</Text>}
            </View>

            <View style={[styles.mb10, { width: '100%' }]}>
              <Text style={[styles.textWhite, { fontSize: normalize(15) }]}>
                Select Board:
              </Text>
              <DropDownPicker
                style={{ zIndex: 1 }}
                open={boardOpen}
                value={boardValue}
                items={board}
                setOpen={setBoardOpen}
                setValue={setBoardValue}
                setItems={setBoard}
                onPress={() => setIsBoardTouched(true)}
              />
            </View>
            <View style={{ width: '100%' }}>
              {(isBoardTouched && !boardValue) &&
                <Text style={[styles.error, { textAlign: 'center' }]}>Please select board</Text>}
            </View>

            <View style={[styles.mb10, { width: '100%' }]}>
              <Text style={[styles.textWhite, { fontSize: normalize(15) }]}>
                Select Preferred Tutor Experience:
              </Text>
              <DropDownPicker
                style={{ zIndex: 1 }}
                open={tutorExperienceOpen}
                value={tutorExperienceValue}
                items={tutorExperience}
                setOpen={setTutorExperienceOpen}
                setValue={setTutorExperienceValue}
                setItems={setTutorExperience}
                onPress={() => setIsExperienceTouched(true)}
              />
            </View>
            <View style={{ width: '100%' }}>
              {(isExperienceTouched && !tutorExperienceValue) &&
                <Text style={[styles.error, { textAlign: 'center' }]}>Please select experience</Text>}
            </View>

            <View style={[styles.mb10, { width: '100%' }]}>
              <Text style={[styles.textWhite, { fontSize: normalize(15) }]}>
                Provide Job Budget(Rs.):
              </Text>
              <TextInput
                onFocus={() => setIsJobBudgetTouched(true)}
                style={{
                  height: 40,
                  borderColor: 'gray',
                  borderWidth: 1,
                  placeholderTextColor: 'gray',
                  backgroundColor: '#fff',
                  borderRadius: 7,
                }}
                onChangeText={text => setBudget(text)}
                value={budget}
                keyboardType="numeric"
              />
            </View>
            <View style={{ width: '100%' }}>
              {isJobBudgetTouched && budget < 0 &&
                <Text style={[styles.error, { textAlign: 'center' }]}>Negative values not allowed</Text>}

              {isJobBudgetTouched && !budget &&
                <Text style={[styles.error, { textAlign: 'center' }]}>Please provide budget</Text>}
            </View>

            <View style={[styles.mb10, { width: '100%' }]}>
              <Text style={[styles.textWhite, { fontSize: normalize(15) }]}>
                Select Payment Method:
              </Text>
              <DropDownPicker
                style={{ zIndex: 1 }}
                open={payByOpen}
                value={payByValue}
                items={payBy}
                setOpen={setPayByOpen}
                setValue={setPayByValue}
                setItems={setPayBy}
                onPress={() => setIsPayMethodTouched(true)}
              />
            </View>
            <View style={{ width: '100%' }}>
              {(isPayMethodTouched && !payByValue) &&
                <Text style={[styles.error, { textAlign: 'center' }]}>Please select payment method</Text>}
            </View>

            <View style={[styles.mb10, { width: '100%' }]}>
              <TouchableOpacity
                style={[styles.button, styles.mt20]}
                onPress={() => postStudentJob()}
                disabled={
                  (!jobDescription || jobDescription.length == 0) ||
                  (jobDescription && jobDescription.length < 20) ||
                  (jobDescription && jobDescription.length > 50) ||
                  !boardValue ||
                  !tutorExperienceValue ||
                  (Number(budget) < 0) ||
                  !budget ||
                  !payByValue
                }
              >
                <Text style={[styles.textStyles, styles.textWhite, { textAlign: 'center' }]}>
                  Find Tutor
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.mt10]}
                onPress={() => navigation.goBack()}>
                <Text style={[styles.textStyles, styles.textWhite, { textAlign: 'center' }]}>
                  Go Back
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.container}>
            <Text>No data available</Text>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}
