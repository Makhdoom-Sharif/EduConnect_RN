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
import { Button } from 'react-native'
import DatePicker from 'react-native-date-picker'
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

  const [cardNumber, setCardNumber] = useState(null)
  const [cardCVV, setCardCVV] = useState(null)
  const [cardHolderName, setCardHolderName] = useState(null)
  // const [cardExpirationDate, setCardExpirationDate] = useState(null)

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const [cardNumberTouched, setCardNumberTouched] = useState(null)
  const [cardCVVTouched, setCardCVVTouched] = useState(null)
  const [cardHolderNameTouched, setCardHolderNameTouched] = useState(null)

  const [isDescriptionTouched, setIsDescriptionTouched] = useState(null)
  const [isClassTouched, setIsClassTouched] = useState(null)
  const [isBoardTouched, setIsBoardTouched] = useState(null)
  const [isExperienceTouched, setIsExperienceTouched] = useState(null)
  const [isJobBudgetTouched, setIsJobBudgetTouched] = useState(null)
  const [isPayMethodTouched, setIsPayMethodTouched] = useState(null)
  const [cardDateTouched, setCardDateTouched] = useState(null)

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
      console.log(data)
      console.log(cardNumber)
      console.log(cardCVV)
      console.log(cardHolderName)

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
            'Job Budget has been escrowed. Interested Tutors will contact you shortly',
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
                Provide Job Budget:
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
                onPress={() => setModalVisible(true)}
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


        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
          style={{ backgroundColor: '#fff' }}
        >
          <View style={[{ flex: 1, justifyContent: 'center' }]}>
            <View style={[styles.modalView, { backgroundColor: '#fff', padding: 20, borderRadius: 10 }]}>
              <View style={{ width: '100%', alignItems: 'flex-end', position: 'relative' }}>
                <Icon
                  name="close"
                  size={18}
                  style={{ color: '#333', position: 'absolute', top: -5, right: -10 }}
                  onPress={() => setModalVisible(false)}
                />
              </View>
              <Text style={[styles.mb20, styles.mt20, { textAlign: 'center', fontWeight: 'bold', fontSize: 20 }]}>Payment Escrow</Text>

              <TouchableOpacity style={{ width: '100%' }}>
                <View style={[styles.mb10, { width: '100%' }]}>
                  <Text style={{ fontSize: normalize(15) }}>
                    Card Number
                  </Text>
                  <TextInput
                    onFocus={() => setCardNumberTouched(true)}
                    keyboardType='numeric'
                    style={{
                      height: 80,
                      borderColor: 'gray',
                      borderWidth: 1,
                      placeholderTextColor: 'gray',
                      backgroundColor: '#fff',
                      borderRadius: 7,
                    }}
                    onChangeText={text => setCardNumber(text)}
                    value={cardNumber}
                  />
                </View>
              </TouchableOpacity>
              <View style={{ width: '100%' }}>
                {cardNumberTouched && (!cardNumber || cardNumber.length != 16) &&
                  <Text style={[styles.error, { textAlign: 'center' }]}>Please provide 16 digits Card number</Text>}
              </View>

              <TouchableOpacity style={{ width: '100%' }}>
                <View style={[styles.mb10, { width: '100%' }]}>
                  <Text style={{ fontSize: normalize(15) }}>
                    CVV
                  </Text>
                  <TextInput
                    onFocus={() => setCardCVVTouched(true)}
                    keyboardType='numeric'
                    style={{
                      height: 80,
                      borderColor: 'gray',
                      borderWidth: 1,
                      placeholderTextColor: 'gray',
                      backgroundColor: '#fff',
                      borderRadius: 7,
                    }}
                    onChangeText={text => setCardCVV(text)}
                    value={cardCVV}
                  />
                </View>
              </TouchableOpacity>
              <View style={{ width: '100%' }}>
                {cardCVVTouched && (!cardCVV || cardCVV.length != 3) &&
                  <Text style={[styles.error, { textAlign: 'center' }]}>Please provide 3 digits CVV</Text>}
              </View>

              <TouchableOpacity style={[{ width: '100%' }, styles.mt20]}>
                <View style={[styles.mb10, { width: '100%' }]}>
                  <Text style={{ fontSize: normalize(15) }}>
                    Card Holder Name
                  </Text>
                  <TextInput
                    onFocus={() => setCardHolderNameTouched(true)}
                    style={{
                      height: 80,
                      borderColor: 'gray',
                      borderWidth: 1,
                      placeholderTextColor: 'gray',
                      backgroundColor: '#fff',
                      borderRadius: 7,
                    }}
                    onChangeText={text => setCardHolderName(text)}
                    value={cardHolderName}
                  />
                </View>
              </TouchableOpacity>
              <View style={{ width: '100%' }}>
                {cardHolderNameTouched && (!cardHolderName || cardHolderName.length == 0) &&
                  <Text style={[styles.error, { textAlign: 'center' }]}>Please provide review to continue</Text>}

                {cardHolderNameTouched && (cardHolderName && cardHolderName.length < 3) &&
                  <Text style={[styles.error, { textAlign: 'center' }]}>Review should be at least 3 characters long.</Text>}

                {cardHolderNameTouched && (cardHolderName && cardHolderName.length > 20) &&
                  <Text style={[styles.error, { textAlign: 'center' }]}>Review should not exceed 30 characters</Text>}
              </View>

              <TouchableOpacity style={{ width: '100%' }}>
                <View style={[styles.mb10, { width: '100%' }]}>
                  <Text style={{ fontSize: normalize(15) }}>
                    Card Expiration Date
                  </Text>
                  <Button style={{ backgroundCplor: Colors.primary }} title="Open" onPress={() => {setOpen(true); setCardDateTouched(true)}} />
                  <DatePicker
                    modal
                    open={open}
                    date={date}
                    onConfirm={(date) => {
                      setOpen(false)
                      setDate(date)
                    }}
                    onCancel={() => {
                      setOpen(false)
                    }}
                  />
                </View>
              </TouchableOpacity>
              <View style={{ width: '100%' }}>
                {cardDateTouched && ((new Date(date)) < Date.now()) &&
                  <Text style={[styles.error, { textAlign: 'center' }]}>Please provide an active card</Text>}
              </View>

              <TouchableOpacity
                style={[styles.mb10, styles.button, styles.boxShadow, styles.mt10, { width: '100%' }]}
                onPress={() => postStudentJob()}
                disabled={(
                  (cardHolderName && (cardHolderName.length == 0 || cardHolderName.length < 3 || cardHolderName.length > 20)) ||
                  (cardCVV && cardCVV.length != 3) || (cardNumber && cardNumber.length != 16) || ((new Date(date)) < Date.now())
                )}
              >
                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
