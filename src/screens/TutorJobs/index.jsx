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
  Modal,
  ScrollView,
} from 'react-native';
import {SafeAreaStyles} from '../../Global/GlobalCSS';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './Styles';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {Colors} from '../../Global/GlobalCSS';
import imageStudentJob from '../../Assets/student_job.jpg';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {refresh} from '../../store/action';

export default function TutorJobs({route}) {
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
  const dispatch = useDispatch();

  const [jobData, setjobData] = useState(route.params ? route.params : null);
  const {_id, accessToken} = useSelector(state => state?.login);

  console.log(jobData, 'tutor job');
  // const [hasJobStarted, setHasJobStarted] = useState(true);
  // const [isJobCompleted, setIsJobCompleted] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  // const [cardHolderName, setCardHolderName] = useState(null);
  // const [cardNumber, setCardNumber] = useState(null);
  // const [cardExpiryDate, setCardExpiryDate] = useState(null);
  // const [cardCVV, setCardCVV] = useState(null);

  // const [interestedTutors, setInterestedTutors] = useState([
  //   {
  //     avatar: 'https://www.assyst.de/cms/upload/sub/digitalisierung/15-M.jpg',
  //     name: 'Aslam',
  //     gender: 'male',
  //     experience: '5',
  //     about: 'A young and passionate tutor',
  //     qualification: 'BCOM',
  //     rating: 2,
  //     location: 'Block 20, F.B Area, Karachi',
  //     distance: 5,
  //     fees: 700,
  //     chargedBy: 'hr',
  //     currency: 'Rs.',
  //     specialization: ['databases'],
  //   },
  //   {
  //     avatar:
  //       'https://i.pinimg.com/736x/19/30/37/193037f58ad6b9795782b5153af06ced.jpg',
  //     name: 'Makhdoom',
  //     gender: 'male',
  //     experience: '3',
  //     about: 'A young and passionate tutor',
  //     qualification: 'MCS',
  //     rating: 3,
  //     location: 'Shah Faisal 3, Karachi',
  //     distance: 20,
  //     fees: 12000,
  //     chargedBy: 'mo',
  //     currency: 'Rs.',
  //     specialization: ['physics', 'applied physics', 'chemistry'],
  //   },
  //   {
  //     avatar:
  //       'https://www.lawinsider.in/wp-content/uploads/2020/09/BmNAaxjCMAMnbqz.jpg',
  //     name: 'Wajiha',
  //     gender: 'female',
  //     experience: '4',
  //     about: 'A young and passionate tutor',
  //     qualification: 'BCOM',
  //     rating: 4,
  //     location: 'Block 13, Gulshan-e-Iqbal, Karachi',
  //     distance: 10,
  //     fees: 13000,
  //     chargedBy: 'mo',
  //     currency: 'Rs.',
  //     specialization: ['maths', 'applied maths', 'calculus'],
  //   },
  // ]);
  // const [bidStatus, setbidStatus] = useState('accepted');
  // const [tutorReview, setTutorReview] = useState('');
  const [tutorReviewsStudent, setTutorReviewsStudent] = useState();
  const [userRating, setUserRating] = useState(null);

  const [tutorReviewsStudentTouched, setTutorReviewsStudentTouched] =
    useState(false);
  const [isUserRatingTouched, setIsUserRatingTouched] = useState(false);

  const [complainModal, setComplainModal] = useState(false);
  const [studentComplainTouched, setStudentComplainTouched] = useState(false);
  const [studentComplain, setStudentComplain] = useState(null);

  const onTutorSelect = tutor => {
    console.log(tutor, 'selected tutor');
    navigation.navigate('SelectedTutor', tutor);
  };

  const postStudentReview = () => {
    let review = {
      studentId: jobData.student,
      teacherId: jobData.teacher,
      jobId: jobData._id,
      ratingValue: userRating,
      reviewText: tutorReviewsStudent,
    };
    console.log(review, 'review data');
    const res = true;
    // const res = await axios.post(`https://educonnectbackend-production.up.railway.app/api/ratings/`, review, headers)
    // if(res){
    //   console.log(res2, 'review sent')
    // }
    // else{
    //   console.log('error in user review')
    // }
    if (res) {
      //alert after response failure
      Alert.alert('Success', 'Review has been submitted', [
        {
          text: 'Cancel',
          onPress: () => resetStates(),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => resetStates()},
      ]);
    } else {
      //alert after response failure
      Alert.alert('Error', 'Please provide valid review', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  const submitStudentComplain = () => {
    const headers = {token: 'Bearer ' + accessToken};
    if (
      jobData &&
      jobData._id &&
      jobData.teacher &&
      jobData.student._id &&
      studentComplain
    ) {
      Alert.alert('Confirm', `Are you sure you want to post this complain?`, [
        {
          text: 'Yes',
          onPress: async () => {
            let res = null;
            const data = {
              student: jobData.student._id,
              teacher: jobData.teacher,
              job: jobData._id,
              complaintMessage: studentComplain,
            };
            console.log(data, 'complain');
            res = await axios.post(
              `https://educonnectbackend-production.up.railway.app/api/complaints`,
              data,
              headers,
            );

            if (res) {
              Alert.alert('Success', `Complaint posted successfully`, [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => {
                    resetStates();
                  },
                },
              ]);
            } else {
              Alert.alert('Error', `Somwthing went wrong`, [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => {
                    resetStates();
                  },
                },
              ]);
            }
          },
        },
        {
          text: 'No',
        },
      ]);
    }
  };

  const resetStates = () => {
    dispatch(refresh(true));
    setModalVisible(false);

    setComplainModal(false);
    setStudentComplainTouched(false);
    setStudentComplain(null);
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={SafeAreaStyles}>
      <ScrollView style={{height: '100%'}}>
        {jobData.status != 'completed' && (
          <View style={styles.bannerImg}>
            <Image
              style={{
                flex: 1,
                width: 450,
                height: 300,
                resizeMode: 'contain',
              }}
              source={imageStudentJob}
            />
          </View>
        )}
        <View style={styles.container}>
          {jobData.status == 'pending' ? (
            <View
              style={[
                {width: '100%', flex: 1},
                styles.tutors,
                styles.boxShadow,
              ]}>
              <View style={[styles.mb10]}>
                <View style={[styles.mb10, {flexDirection: 'row'}]}>
                  <Text style={[{fontSize: normalize(18), fontWeight: 'bold'}]}>
                    Job:{' '}
                  </Text>
                  <Text style={{fontSize: normalize(18)}}>
                    {jobData && jobData.description}
                  </Text>
                </View>
                <View style={[styles.mb10, {flexDirection: 'row'}]}>
                  <Text style={[{fontSize: normalize(18), fontWeight: 'bold'}]}>
                    Course:{' '}
                  </Text>
                  <Text style={{fontSize: normalize(18)}}>
                    {jobData && jobData.course.title}
                  </Text>
                </View>
                <View style={[styles.mb10, {flexDirection: 'row'}]}>
                  <Text style={[{fontSize: normalize(18), fontWeight: 'bold'}]}>
                    Student:{' '}
                  </Text>
                  <Text style={{fontSize: normalize(18)}}>
                    {jobData && jobData.student.name}
                  </Text>
                </View>
                <View style={[styles.mb10, {flexDirection: 'row'}]}>
                  <Text style={[{fontSize: normalize(18), fontWeight: 'bold'}]}>
                    Status:{' '}
                  </Text>
                  <Text style={{fontSize: normalize(18)}}>Bit sent</Text>
                </View>
                <View style={[styles.mb10, {flexDirection: 'row'}]}>
                  <Text style={[{fontSize: normalize(18), fontWeight: 'bold'}]}>
                    Budget:{' '}
                  </Text>
                  <Text style={{fontSize: normalize(18)}}>
                    {jobData &&
                      jobData.jobBudget + '/' + jobData.jobPayDuration}
                  </Text>
                </View>
              </View>

              <View style={[styles.mb10, {width: '100%'}]}>
                {/* {bidStatus == 'accepted' && (
                  <TouchableOpacity
                    style={[styles.button, styles.mb10]}
                    onPress={() => navigation.goBack()}>
                    <Text
                      style={[
                        styles.textStyles,
                        {textAlign: 'center', fontWeight: 'bold'},
                      ]}>
                      Start Meeting
                    </Text>
                  </TouchableOpacity>
                )} */}
                {/* <TouchableOpacity
                  style={[styles.button, styles.boxShadow, styles.mb10]}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                    Cancel Job
                  </Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={[styles.button, styles.boxShadow]}
                  onPress={() => navigation.goBack()}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                    Go Back
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : jobData.status == 'started' ? (
            <View style={[{width: '100%'}, styles.tutors, styles.boxShadow]}>
              <View style={[styles.mb10]}>
                <Text style={[styles.mb10, {fontSize: normalize(18)}]}>
                  <Text style={[{fontSize: normalize(18), fontWeight: 'bold'}]}>
                    Job:
                  </Text>
                  {'  '}
                  <Text style={{fontSize: normalize(18)}}>
                    {jobData && jobData.description}
                  </Text>
                </Text>
                <Text style={[styles.mb10, {fontSize: normalize(18)}]}>
                  <Text style={[{fontSize: normalize(18), fontWeight: 'bold'}]}>
                    Course:
                  </Text>
                  {'  '}
                  <Text style={{fontSize: normalize(18)}}>
                    {jobData && jobData.course.title}
                  </Text>
                </Text>
                <Text style={[styles.mb10, {fontSize: normalize(18)}]}>
                  <Text style={[{fontSize: normalize(18), fontWeight: 'bold'}]}>
                    Status:
                  </Text>
                  {'  '}
                  <Text style={{fontSize: normalize(18)}}>In Progress</Text>
                </Text>
                <Text style={[styles.mb10, {fontSize: normalize(18)}]}>
                  <Text style={[{fontSize: normalize(18), fontWeight: 'bold'}]}>
                    Student:
                  </Text>{' '}
                  {'  '}
                  <Text style={{fontSize: normalize(18)}}>
                    {jobData && jobData.student.name}
                  </Text>
                </Text>
                <Text style={[{fontSize: normalize(18)}]}>
                  <Text style={[{fontSize: normalize(18), fontWeight: 'bold'}]}>
                    Agreed Budget:
                  </Text>
                  {'  '}
                  <Text style={{fontSize: normalize(18)}}>
                    Rs.
                    {jobData &&
                      jobData.jobBudget + '/' + jobData.jobPayDuration}
                  </Text>
                </Text>
              </View>
              <View style={[styles.mb10, styles.mt20, {width: '100%'}]}>
                <TouchableOpacity
                  style={[styles.button, styles.boxShadow]}
                  onPress={() => setComplainModal(!complainModal)}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                    Post a Complain
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.mb10, {width: '100%'}]}>
                <TouchableOpacity
                  style={[styles.button, styles.boxShadow]}
                  onPress={() => navigation.goBack()}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                    Go Back
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : jobData.status == 'completed' ? (
            <View style={[{width: '100%'}, styles.tutors, styles.boxShadow]}>
              <View
                style={[styles.mb20, {alignItems: 'center', width: '100%'}]}>
                <Image
                  style={[styles.logo]}
                  source={{
                    uri: 'https://www.pngall.com/wp-content/uploads/9/Green-Tick-Vector-PNG-Images.png',
                  }}
                />
                <Text
                  style={[
                    styles.mb10,
                    {
                      fontSize: normalize(22),
                      fontWeight: 'bold',
                      textAlign: 'center',
                    },
                  ]}>
                  Job Completed
                </Text>
              </View>
              <View style={[styles.mb20]}>
                <Text style={[{fontSize: normalize(18)}, styles.mb10]}>
                  <Text style={[{fontSize: normalize(18), fontWeight: 'bold'}]}>
                    Job:
                  </Text>
                  {'  '}
                  <Text style={{fontSize: normalize(18)}}>
                    {jobData && jobData.description}
                  </Text>
                </Text>
                <Text style={[{fontSize: normalize(18)}, styles.mb10]}>
                  <Text style={[{fontSize: normalize(18), fontWeight: 'bold'}]}>
                    Course:
                  </Text>
                  {'  '}
                  <Text style={{fontSize: normalize(18)}}>
                    {jobData && jobData.course.title}
                  </Text>
                </Text>
                <Text style={[{fontSize: normalize(18)}, styles.mb10]}>
                  <Text style={[{fontSize: normalize(18), fontWeight: 'bold'}]}>
                    Student:
                  </Text>
                  {'  '}
                  <Text style={{fontSize: normalize(18)}}>
                    {jobData && jobData.student.name}
                  </Text>
                </Text>
                <Text style={[{fontSize: normalize(18)}, styles.mb10]}>
                  <Text style={[{fontSize: normalize(18), fontWeight: 'bold'}]}>
                    Agreed Budget:
                  </Text>
                  {'  '}
                  <Text style={{fontSize: normalize(18)}}>
                    Rs.
                    {jobData &&
                      jobData.jobBudget + '/' + jobData.jobPayDuration}
                  </Text>
                </Text>
              </View>

              <View style={[styles.mb10, {width: '100%'}]}>
                <TouchableOpacity
                  style={[styles.mb10, styles.button, styles.boxShadow]}
                  onPress={() => navigation.goBack()}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                    Go Back
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.mb10, styles.button, styles.boxShadow]}
                  onPress={() => setModalVisible(true)}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                    Review Student
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            ''
          )}

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={[{flex: 1, justifyContent: 'center'}]}>
              <View style={[styles.modalView]}>
                <View
                  style={{
                    width: '100%',
                    alignItems: 'flex-end',
                    position: 'relative',
                  }}>
                  <Icon
                    name="close"
                    size={18}
                    style={{
                      color: '#333',
                      position: 'absolute',
                      top: -5,
                      right: -10,
                    }}
                    onPress={() => setModalVisible(false)}
                  />
                </View>
                <Text
                  style={[
                    styles.mb10,
                    {
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 14,
                      marginTop: 40,
                    },
                  ]}>
                  How was your experience with {jobData.student.name} ?
                </Text>
                <View style={[styles.mb20, {width: '100%'}]}>
                  <Text style={[styles.mb10, {textAlign: 'center'}]}>
                    Provide Rating
                  </Text>
                  <View
                    style={[
                      styles.mb20,
                      {
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                      },
                    ]}>
                    {[...Array(5)].map((el, index) => (
                      <Icon
                        key={index}
                        name="star"
                        size={18}
                        style={[
                          {marginTop: 5, marginLeft: 10},
                          {
                            color:
                              userRating && userRating >= index + 1
                                ? Colors.secondary
                                : '#333',
                          },
                        ]}
                        color={Colors.primary}
                        onPress={() => {
                          setUserRating(index + 1);
                          setIsUserRatingTouched(true);
                        }}
                      />
                    ))}
                    <View
                      style={[{borderRadius: 5, marginLeft: 20, marginTop: 5}]}>
                      <Icon
                        name="reply"
                        size={10}
                        style={{
                          color: '#fff',
                          backgroundColor: '#333',
                          padding: 5,
                          borderRadius: 15,
                        }}
                        onPress={() => setUserRating(0)}
                      />
                    </View>
                  </View>
                  <View style={{width: '100%'}}>
                    {isUserRatingTouched &&
                      (!userRating || userRating == 0) && (
                        <Text style={[styles.error, {textAlign: 'center'}]}>
                          Please provide rating
                        </Text>
                      )}
                  </View>
                </View>

                <Text style={[styles.mb10, {color: '#333'}]}>
                  Provide Your Review
                </Text>
                <TouchableOpacity style={{width: '100%'}}>
                  <View>
                    <TextInput
                      onFocus={() => setTutorReviewsStudentTouched(true)}
                      style={{
                        height: 80,
                        borderColor: 'gray',
                        borderWidth: 1,
                        placeholderTextColor: 'gray',
                        backgroundColor: '#fff',
                        borderRadius: 7,
                        width: '100%',
                      }}
                      onChangeText={text => setTutorReviewsStudent(text)}
                      value={tutorReviewsStudent}
                      multiline={true}
                      numberOfLines={4}
                    />
                  </View>
                </TouchableOpacity>
                <View style={{width: '100%'}}>
                  {tutorReviewsStudentTouched &&
                    (!tutorReviewsStudent ||
                      tutorReviewsStudent.length == 0) && (
                      <Text style={[styles.error, {textAlign: 'center'}]}>
                        Please provide review to continue
                      </Text>
                    )}

                  {tutorReviewsStudentTouched &&
                    tutorReviewsStudent &&
                    tutorReviewsStudent.length < 15 && (
                      <Text style={[styles.error, {textAlign: 'center'}]}>
                        Review should be at least 15 characters long.
                      </Text>
                    )}
                </View>

                <TouchableOpacity
                  style={[
                    styles.mb10,
                    styles.button,
                    styles.boxShadow,
                    styles.mt10,
                    {width: '100%'},
                  ]}
                  onPress={() => postStudentReview()}
                  disabled={
                    !tutorReviewsStudent ||
                    !userRating ||
                    tutorReviewsStudent.length < 15 ||
                    userRating == 0
                  }>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={complainModal}
            onRequestClose={() => {
              setComplainModal(!complainModal);
            }}>
            <View style={[{flex: 1, justifyContent: 'center'}]}>
              <View style={[styles.modalView]}>
                <View
                  style={{
                    width: '100%',
                    alignItems: 'flex-end',
                    position: 'relative',
                  }}>
                  <Icon
                    name="close"
                    size={18}
                    style={{
                      color: '#333',
                      position: 'absolute',
                      top: -5,
                      right: -10,
                    }}
                    onPress={() => setComplainModal(false)}
                  />
                </View>

                <Text
                  style={[
                    styles.mb10,
                    styles.mt20,
                    {textAlign: 'center', fontWeight: 'bold', fontSize: 14},
                  ]}>
                  Write your complain
                </Text>
                <TouchableOpacity style={{width: '100%'}}>
                  <View>
                    <TextInput
                      onFocus={() => setStudentComplainTouched(true)}
                      style={{
                        height: 80,
                        borderColor: 'gray',
                        borderWidth: 1,
                        placeholderTextColor: 'gray',
                        backgroundColor: '#fff',
                        borderRadius: 7,
                        width: '100%',
                      }}
                      onChangeText={text => setStudentComplain(text)}
                      value={studentComplain}
                      multiline={true}
                      numberOfLines={4}
                    />
                  </View>
                </TouchableOpacity>
                <View style={{width: '100%'}}>
                  {studentComplainTouched &&
                    (!studentComplain || studentComplain.length == 0) && (
                      <Text style={[styles.error, {textAlign: 'center'}]}>
                        Please write complain to continue
                      </Text>
                    )}

                  {studentComplainTouched &&
                    studentComplain &&
                    studentComplain.length < 15 && (
                      <Text style={[styles.error, {textAlign: 'center'}]}>
                        Complain should be at least 15 characters long
                      </Text>
                    )}
                </View>

                <TouchableOpacity
                  style={[
                    styles.mb10,
                    styles.button,
                    styles.boxShadow,
                    styles.mt10,
                    {width: '100%'},
                  ]}
                  onPress={() => submitStudentComplain()}
                  disabled={!studentComplain || studentComplain.length < 15}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
