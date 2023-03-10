import React, { useState, useEffect } from 'react';
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
import { SafeAreaStyles } from '../../Global/GlobalCSS';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './Styles';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Colors } from '../../Global/GlobalCSS';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { refresh } from '../../store/action';

export default function SelectedCourse({ route }) {
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
  const { _id, accessToken } = useSelector(state => state?.login);

  // const {courseId, courseName, courseLogo} = route.params;

  const [jobData, setJobData] = useState(route.params);
  // const [refresh, setRefresh] = useState(false)
  console.log(jobData, 'selected course')

  // const [hasJobStarted, setHasJobStarted] = useState(false);
  // const [isJobCompleted, setIsJobCompleted] = useState(false);
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
  //     reviews: [],
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
  //     reviews: [
  //       'A very helpful and kind person - Ali (Student)',
  //       'His way of teaching is amazing - Aalia Khan (Student)',
  //     ],
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
  //     reviews: [
  //       'A very helpful and kind person - Ali (Student)',
  //       'His way of teaching is amazing - Aalia Khan (Student)',
  //     ],
  //   },
  // ]);

  const [jobBids, setJobBids] = useState(null)
  const [isPaymentDate, setIsPaymentDate] = useState(false)

  const [studentReviewsTeacher, setStudentReviewsTeacher] = useState()
  const [userRating, setUserRating] = useState(null)

  const [studentReviewsTeacherTouched, setStudentReviewsTeacherTouched] = useState(false)
  const [isUserRatingTouched, setIsUserRatingTouched] = useState(false)

  const onTutorSelect = tutor => {
    console.log(tutor, 'selected tutor');
    navigation.navigate('SelectedTutor', tutor);
  };

  const getStudentJobBids = async () => {
    const headers = { token: 'Bearer ' + accessToken }
    if (jobData && jobData._id) {
      console.log(jobData._id)
      const res = await axios.get(`https://educonnectbackend-production.up.railway.app/api/bids/${jobData._id}`, headers)
      if (res) {
        console.log(res.data, 'has bids')
        if (res.data[0].teacher) {
          console.log(res.data, 'teacher bids')
          setJobBids(res.data)
        }
      }
    }
  }

  const markJobCompleted = async () => {
    const headers = { token: 'Bearer ' + accessToken }
    if (jobData && jobData._id) {
      console.log(jobData._id, 'job id')
      // dispatch(refresh(false))
      Alert.alert(
        "Confirm",
         jobData.jobPayDuration == 'oneTime' ? `Are you sure you want to mark this job as completed and pay fees?` : `Do you want to pay the ${jobData.jobPayDuration} Fees?`,
        [
          {
            text: "Yes",
            onPress: async () => {
              let res = null
              if(jobData.jobPayDuration == 'oneTime')
              {
                const data = {
                  status: 'completed'
                }
                res = await axios.patch(`https://educonnectbackend-production.up.railway.app/api/jobs/${jobData._id}`, data, headers)
              }
              else{
                res = await axios.patch(`https://educonnectbackend-production.up.railway.app/api/jobs/${jobData._id}`, headers)
              }
              if (res) {
                let review = {
                  studentId: jobData.student,
                  teacherId: jobData.teacher,
                  jobId: jobData._id,
                  ratingValue: userRating,
                  reviewText: studentReviewsTeacher
                }
                console.log(review, 'review data')
                const res2 = await axios.post(`https://educonnectbackend-production.up.railway.app/api/ratings/`, review, headers)
                if(res2){
                  console.log(res2, 'review sent')
                }
                else{
                  console.log('error in user review')
                }
                
                if(jobData.jobPayDuration == 'oneTime'){
                  Alert.alert('Success', `Job marked completed and fees paid successfully`, [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    { text: 'OK', onPress: () => { resetStates() } },
                  ]);
                }
                else{
                  Alert.alert('Success', `${jobData.jobPayDuration} fees paid successfully`, [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    { text: 'OK', onPress: () => { resetStates() } },
                  ]);
                }
              }
              else {
                Alert.alert('Error', 'Something went wrong', [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
              }
            },
          },
          {
            text: "No",
          },
        ]
      );
    }
  }

  const isJobPayDate = () => {
      const jobStartDate = new Date(jobData.startedAt)
      const monthEndPayDate = new Date(jobStartDate.getFullYear(), jobStartDate.getMonth()+1, 0);
      const today = new Date()
      if(today > monthEndPayDate){
        setIsPaymentDate(true)
      }
  }

  const resetStates = () => {
    dispatch(refresh(true))
    setIsPaymentDate(false)
    setModalVisible(false)
    navigation.navigate('Home')
  }


  useEffect(() => {
    getStudentJobBids()
    isJobPayDate()
    setModalVisible(false)
  }, [])


  return (
    <SafeAreaView style={SafeAreaStyles}>
      <ScrollView style={{ height: '100%' }}>
        {jobData.status && jobData.status != 'completed' && (
          <View style={[styles.bannerImg, {width:'100%' ,justifyContent:'center'}]}>
            <Image
              style={[
                {
                  width: 450,
                  height: 400,
                  resizeMode: 'contain',
                },
                styles.mb20,
              ]}
              source={require('../../assets/tutor_job.jpg')}
            />
          </View>
        )}

        <View style={styles.container}>
          {jobData.status && jobData.status == 'pending' ? (
            <View style={[{ width: '100%' }]}>
              <View style={[styles.mb20, styles.mainHeading, styles.boxShadow, styles.textHighlight]}>
                <View style={{paddingRight:10}}>
                  <Text style={[styles.mt10, styles.mb10, { fontSize: normalize(20), textAlign: 'center', backgroundColor: '#f2f2f2', borderRadius: 5, paddingVertical: 10 }]}>
                    Job Details
                  </Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <Text style={[styles.mt10, styles.mb10, { fontSize: normalize(16), fontWeight: 'bold' }]}>
                      Title:
                    </Text>
                    <Text style={[styles.mt10, styles.mb10, { fontSize: normalize(16) }]}>
                      {jobData.description ? jobData.description : 'not available'}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <Text style={[styles.mt10, styles.mb10, { fontSize: normalize(16), fontWeight: 'bold' }]}>
                      Course:
                    </Text>
                    <Text style={[styles.mt10, styles.mb10, { fontSize: normalize(16) }]}>
                      {jobData.course ? jobData.course.title : 'not available'}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <Text style={[styles.mt10, styles.mb10, { fontSize: normalize(16), fontWeight: 'bold' }]}>
                      Budget:
                    </Text>
                    <Text style={[styles.mt10, styles.mb10, { fontSize: normalize(16) }]}>
                      {jobData.jobBudget ? jobData.jobBudget : 'not available'}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <Text style={[styles.mt10, styles.mb10, { fontSize: normalize(16), fontWeight: 'bold' }]}>
                      Status:
                    </Text>
                    <Text style={[styles.mt10, styles.mb10, { fontSize: normalize(16) }]}>
                      {jobData.status ? jobData.status : 'not available'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.mb20, styles.mainHeading, { width: '100%' }]}>
                {
                  jobBids ?
                  <>
                    <View style={[styles.mB20, styles.mainHeading, styles.boxShadow, styles.textHighlight]}>
                      <Text style={[styles.mb10, { fontSize: normalize(20), marginTop: 5 }]}>
                        Interested Tutors:
                      </Text>
                    </View>
                    <FlatList
                      data={jobBids}
                      contentContainerStyle={{
                        flexDirection: 'row',
                      }}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={[styles.tutors, styles.boxShadow, styles.mb20, styles.mt10 ]}
                          onPress={() => onTutorSelect(item)}>
                          <Image
                            style={[styles.avatar]}
                            source={item.profilePicture ? { uri: item.profilePicture } : {
                              uri: 'https://cdn.dribbble.com/users/304574/screenshots/6222816/male-user-placeholder.png'
                            }}
                          />

                          <View style={[styles.tutorInfo,{width:'100%', justifyContent:'center'}]}>
                            <Text
                              style={[
                                styles.textStyles,
                                {
                                  marginLeft: 5,
                                  fontSize: normalize(16),
                                  fontWeight: '600', 
                                  textAlign:'center',
                                },
                              ]}>
                              {item.teacher.name}
                            </Text>
                          </View>

                          <View style={[styles.tutorInfo,{width:'100%', justifyContent:'center'}]}>
                            <Text
                              style={[
                                styles.textStyles, styles.mb10,
                                { marginLeft: 5, fontSize: normalize(12), textAlign:'center'},
                              ]}>
                              {item.teacher.bio}
                            </Text>
                          </View>
{/* 
                        <View style={[styles.tutorInfo, {width:'100%', justifyContent:'center'}]}>
                          <Icon
                            name="clock-o"
                            size={15}
                            style={{marginTop: 5}}
                            color={Colors.primary}
                          />
                          <Text
                            style={[
                              styles.textStyles,
                              {marginLeft: 5, fontSize: normalize(12)},
                            ]}>
                            {item.course.experienceRequired} {' yrs'}
                          </Text>
                      </View> */}

                          <View style={[styles.tutorInfo, {width:'100%', justifyContent:'center'}]}>
                            <Icon
                              name="graduation-cap"
                              size={15}
                              style={{ marginTop: 5 }}
                              color={Colors.primary}
                            />
                            <Text
                              style={[
                                styles.textStyles,
                                { marginLeft: 5, fontSize: normalize(12) },
                              ]}>
                              {item.teacher.highestQualification}
                            </Text>
                          </View>

                          <View style={[styles.tutorInfo, {width:'100%', justifyContent:'center'}]}>
                            <Icon
                              name="dollar"
                              size={15}
                              style={{ marginTop: 5 }}
                              color={Colors.primary}
                            />
                            <Text
                              style={[
                                styles.textStyles,
                                { marginLeft: 5, fontSize: normalize(12)
                                },
                              ]}>
                              {item.teacher.hourlyRate}
                            </Text>
                          </View>


                          {/* <View style={styles.tutorInfo}>
                        <Icon
                          name="map-marker"
                          size={15}
                          style={{marginTop: 5}}
                          color={Colors.primary}
                        />
                        <Text
                          style={[
                            styles.textStyles,
                            {marginLeft: 5, fontSize: normalize(12)},
                          ]}>
                          {item.location}
                        </Text>
                      </View> */}

                          {/* <View style={styles.tutorInfo}>
                        <Icon
                          name="motorcycle"
                          size={15}
                          style={{marginTop: 5}}
                          color={Colors.primary}
                        />
                        <Text
                          style={[
                            styles.textStyles,
                            {marginLeft: 5, fontSize: normalize(12)},
                          ]}>
                          {item.distance} km away
                        </Text>
                      </View> */}

                          {/* <View style={styles.tutorInfo}>
                        {[...Array(item.rating)].map((el, index) => (
                          <Icon
                            key={index}
                            name="star"
                            size={15}
                            style={{marginTop: 5}}
                            color={Colors.primary}
                          />
                        ))}
                      </View> */}
                        </TouchableOpacity>
                      )}
                    />
                  </>
                  :
                  <>
                  <View style={[styles.mb10, styles.mainHeading, styles.boxShadow, styles.textHighlight]}>
                    <Text style={[styles.mb10, { fontSize: normalize(20), marginTop: 5 }]}>
                      Interested Tutors: 
                    </Text>
                    <Text style={[styles.mb10, { fontSize: normalize(14), marginTop: 5 }]}>
                      No bids available.
                    </Text>
                  </View>
                  </>
                }

              </View>
            </View>
          )
            : jobData.status == 'started' ? (
              <View style={[{ width: '100%' }, styles.boxShadow, styles.tutors]}>
                {/* <View style={[styles.mb30]}>
                <Text style={[{fontSize: normalize(18)}, styles.mb10]}>
                  <Text style={[{fontSize: normalize(18), fontWeight: 'bold'}]}>
                    Title:
                  </Text>
                  {'  '}
                  <Text style={{fontSize: normalize(18)}}>
                    Physics Tutor Required
                  </Text>
                </Text>
                <Text style={[{fontSize: normalize(18)}, styles.mb10]}>
                  <Text style={[{fontSize: normalize(18), fontWeight: 'bold'}]}>
                    Tutor:
                  </Text>
                  {'  '}
                  <Text style={{fontSize: normalize(18)}}>Aslam Khan</Text>
                </Text>
                <Text style={[{fontSize: normalize(18)}, styles.mb10]}>
                  <Text style={[{fontSize: normalize(18), fontWeight: 'bold'}]}>
                    Job Status:
                  </Text>
                  {'  '}
                  <Text style={{fontSize: normalize(18)}}>In Progress</Text>
                </Text>
                <Text style={[{fontSize: normalize(18)}, styles.mb10]}>
                  <Text style={[{fontSize: normalize(18), fontWeight: 'bold'}]}>
                    Agreed Budget:
                  </Text>
                  {'  '}
                  <Text style={{fontSize: normalize(18)}}>Rs. 5000/mo</Text>
                </Text>
              </View> */}

                <View style={[styles.mb20, styles.mainHeading, { width: '100%' }]}>
                  <Text style={[styles.mt10, styles.mb10, { fontWeight:'bold', fontSize: normalize(20), textAlign: 'center', backgroundColor: '#f2f2f2', borderRadius: 5, paddingVertical: 10 }]}>
                    Job Details
                  </Text>
                  <Text style={[styles.mt10, styles.mb10, { fontSize: normalize(16) }]}>
                    Title: {jobData.description}
                  </Text>
                  <Text style={[styles.mb10, { fontSize: normalize(16) }]}>
                    Course: {jobData.course.title}
                  </Text>
                  <Text style={[styles.mb10, { fontSize: normalize(16) }]}>
                    Budget: {jobData.jobBudget}
                  </Text>
                  <Text style={[styles.mb10, { fontSize: normalize(16) }]}>
                    Status: {jobData.status}
                  </Text>
                </View>

                <View style={[styles.mb10, { width: '100%' }]}>
                  {
                    (isPaymentDate && jobData.jobPayDuration != 'oneTime') &&
                    <TouchableOpacity
                    style={[styles.button, styles.boxShadow]}
                    onPress={() => setModalVisible(!modalVisible)}
                    >
                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    { jobData && `Pay ${jobData.jobPayDuration} Fees`}
                    </Text>
                  </TouchableOpacity>
                }
                {
                  jobData.jobPayDuration == 'oneTime' && 
                  <TouchableOpacity
                  style={[styles.button, styles.boxShadow]}
                  onPress={() => setModalVisible(!modalVisible)}
                  >
                  <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Mark Job As Complete & Pay
                  </Text>
                  </TouchableOpacity>
                }
                  
                </View>
                <View style={[styles.mb10, { width: '100%' }]}>
                  <TouchableOpacity
                    style={[styles.button, styles.boxShadow]}
                    onPress={() => navigation.goBack()}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                      Go Back
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

            ) : jobData.status == 'completed' ?
              <View style={[{ width: '100%' }, styles.tutors, styles.boxShadow]}>
                <View
                  style={[styles.mb10, { width: '100%', alignItems: 'center' }]}>
                  <Image
                    style={[
                      {
                        width: 250,
                        height: 250,
                      },
                      styles.mb10,
                    ]}
                    source={{
                      uri: 'https://www.pngall.com/wp-content/uploads/9/Green-Tick-Vector-PNG-Images.png',
                    }}
                  />
                  <Text
                    style={[
                      { fontSize: normalize(24), fontWeight: 'bold' },
                      styles.mb20,
                    ]}>
                    Job Completed
                  </Text>
                </View>
                <View style={[styles.mb10]}>
                  <Text style={[{ fontSize: normalize(18) }, styles.mb10]}>
                    <Text style={[{ fontSize: normalize(18), fontWeight: 'bold' }]}>
                      Title:
                    </Text>
                    {'  '}
                    <Text style={{ fontSize: normalize(18) }}>
                      {jobData.description}
                    </Text>
                  </Text>
                  <Text style={[{ fontSize: normalize(18) }, styles.mb10]}>
                    <Text style={[{ fontSize: normalize(18), fontWeight: 'bold' }]}>
                      Tutor:
                    </Text>
                    {'  '}
                    <Text style={{ fontSize: normalize(18) }}>{jobData.teacher.name}</Text>
                  </Text>
                  <Text style={[{ fontSize: normalize(18) }, styles.mb10]}>
                    <Text style={[{ fontSize: normalize(18), fontWeight: 'bold' }]}>
                      Agreed Budget:
                    </Text>
                    {'  '}
                    <Text style={{ fontSize: normalize(18) }}>Rs. {jobData.jobBudget}</Text>
                  </Text>
                  <Text style={[{ fontSize: normalize(18) }, styles.mb10]}>
                    <Text style={[{ fontSize: normalize(18), fontWeight: 'bold' }]}>
                      Job Status:
                    </Text>
                    {'  '}
                    <Text style={{ fontSize: normalize(18) }}>{jobData.status}</Text>
                  </Text>
                </View>
                <View style={[styles.mb10, { width: '100%' }]}>
                  <TouchableOpacity
                    style={[styles.mb10, styles.button, styles.boxShadow]} 
                    onPress={() => navigation.goBack()}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                      Post Job Again
                    </Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                    style={[styles.mb10, styles.button, styles.boxShadow]}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                      Contact Tutor
                    </Text>
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    style={[styles.mb10, styles.button, styles.boxShadow]}
                    onPress={() => navigation.goBack()}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                      Go Back
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              : ''
          }

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={[{flex:1, justifyContent:'center'}]}>
              <View style={[styles.modalView]}>
              <View style={{width:'100%', alignItems:'flex-end', position:'relative'}}>
                  <Icon
                    name="close"
                    size={18}
                    style={{color:'#333', position:'absolute', top:-5, right:-10}}
                    onPress={()=> setModalVisible(false)}
                  />
              </View>
              <Text style={[styles.mb10, styles.mt20, {textAlign:'center', fontWeight:'bold', fontSize:14}]}>Please review Teacher to complete this job</Text>
                <View style={[styles.mb20, {width:'100%'}]}>
                  <Text style={[styles.mb10, {textAlign:'center'}]}>Rate Teacher</Text>
                  <View style={[styles.mb20, {width:'100%', flexDirection:'row', justifyContent:'center'}]}>
                  {
                  [...Array(5)].map((el, index) => (
                      <Icon
                        key={index}
                        name="star"
                        size={18}
                        style={[{marginTop: 5, marginLeft: 10 }, 
                          {color: (userRating && userRating >= index+1) ?
                            Colors.secondary : '#333'
                          }]}
                        color={Colors.primary}
                        onPress={()=> {setUserRating(index+1); setIsUserRatingTouched(true)} }
                      />
                    ))
                  }
                  <View style={[{borderRadius:5, marginLeft:20, marginTop:5}]} >
                    <Icon
                      name="reply"
                      size={10}
                      style={{color:'#fff', backgroundColor:'#333', padding:5, borderRadius:15}}
                      onPress={()=> setUserRating(0)}
                    />
                  </View>
                  </View>
                  <View style={{width:'100%'}}>
                    { isUserRatingTouched && (!userRating || userRating == 0) &&  
                    <Text style={[styles.error, {textAlign:'center'}]}>Please provide rating</Text> }
                  </View>
                </View>
              
                <Text style={[styles.mb10, {color:'#333'}]}>Provide Your Review</Text>
                <TouchableOpacity  style={{width:'100%'}}>
                  <View >
                <TextInput
                  onFocus={()=>setStudentReviewsTeacherTouched(true)}
                  style={{
                    height: 80,
                    borderColor: 'gray',
                    borderWidth: 1,
                    placeholderTextColor: 'gray',
                    backgroundColor: '#fff',
                    borderRadius: 7,
                    width:'100%'
                  }}
                  onChangeText={text => setStudentReviewsTeacher(text)}
                  value={studentReviewsTeacher}
                  multiline={true}
                  numberOfLines={4}
                /></View>
                </TouchableOpacity>
                <View style={{width:'100%'}}>
                  { studentReviewsTeacherTouched && (!studentReviewsTeacher || studentReviewsTeacher.length == 0) &&  
                  <Text style={[styles.error, {textAlign:'center'}]}>Please provide review to continue</Text> }

                  { studentReviewsTeacherTouched && (studentReviewsTeacher && studentReviewsTeacher.length < 30 ) &&  
                  <Text style={[styles.error, {textAlign:'center'}]}>Review should be at least 30 characters long.</Text> }
                </View>

                <TouchableOpacity
                    style={[styles.mb10, styles.button, styles.boxShadow, styles.mt10, {width:'100%'}]}
                    onPress={()=> markJobCompleted()}
                    disabled={(!studentReviewsTeacher || !userRating || studentReviewsTeacher.length < 30 || userRating == 0) }
                    >
                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
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
