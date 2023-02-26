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
  const {jobId, jobName, jobLogo} = route.params;

  const [jobData, setjobData] = useState({
    jobId: jobId,
    jobName: jobName,
    jobLogo: jobLogo,
  });

  const [hasJobStarted, setHasJobStarted] = useState(true);
  const [isJobCompleted, setIsJobCompleted] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const [cardHolderName, setCardHolderName] = useState(null);
  const [cardNumber, setCardNumber] = useState(null);
  const [cardExpiryDate, setCardExpiryDate] = useState(null);
  const [cardCVV, setCardCVV] = useState(null);

  const [interestedTutors, setInterestedTutors] = useState([
    {
      avatar: 'https://www.assyst.de/cms/upload/sub/digitalisierung/15-M.jpg',
      name: 'Aslam',
      gender: 'male',
      experience: '5',
      about: 'A young and passionate tutor',
      qualification: 'BCOM',
      rating: 2,
      location: 'Block 20, F.B Area, Karachi',
      distance: 5,
      fees: 700,
      chargedBy: 'hr',
      currency: 'Rs.',
      specialization: ['databases'],
    },
    {
      avatar:
        'https://i.pinimg.com/736x/19/30/37/193037f58ad6b9795782b5153af06ced.jpg',
      name: 'Makhdoom',
      gender: 'male',
      experience: '3',
      about: 'A young and passionate tutor',
      qualification: 'MCS',
      rating: 3,
      location: 'Shah Faisal 3, Karachi',
      distance: 20,
      fees: 12000,
      chargedBy: 'mo',
      currency: 'Rs.',
      specialization: ['physics', 'applied physics', 'chemistry'],
    },
    {
      avatar:
        'https://www.lawinsider.in/wp-content/uploads/2020/09/BmNAaxjCMAMnbqz.jpg',
      name: 'Wajiha',
      gender: 'female',
      experience: '4',
      about: 'A young and passionate tutor',
      qualification: 'BCOM',
      rating: 4,
      location: 'Block 13, Gulshan-e-Iqbal, Karachi',
      distance: 10,
      fees: 13000,
      chargedBy: 'mo',
      currency: 'Rs.',
      specialization: ['maths', 'applied maths', 'calculus'],
    },
  ]);
  const [bidStatus, setbidStatus] = useState('accepted');
  const [tutorReview, setTutorReview] = useState('');

  const onTutorSelect = tutor => {
    console.log(tutor, 'selected tutor');
    navigation.navigate('SelectedTutor', tutor);
  };

  const submitReview = () => {
    if (tutorReview.length > 0) {
      setModalVisible(false);
      //alert after response failure
      Alert.alert('Success', 'Review has been submitted', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
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

  return (
    <SafeAreaView style={SafeAreaStyles}>
      <ScrollView style={{height: '100%'}}>
        {!isJobCompleted && (
          <View style={styles.bannerImg}>
            <Image
              style={{
                flex: 1,
                width: 450,
                height: 300,
                resizeMode: 'contain',
              }}
              source={'../../assets/student_job.jpg'}
            />
          </View>
        )}
        <View style={styles.container}>
          {!hasJobStarted && !isJobCompleted ? (
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
                    Physics Tutor Required
                  </Text>
                </View>
                <View style={[styles.mb10, {flexDirection: 'row'}]}>
                  <Text style={[{fontSize: normalize(18), fontWeight: 'bold'}]}>
                    Student:{' '}
                  </Text>
                  <Text style={{fontSize: normalize(18)}}>Aslam Khan</Text>
                </View>
                <View style={[styles.mb10, {flexDirection: 'row'}]}>
                  <Text style={[{fontSize: normalize(18), fontWeight: 'bold'}]}>
                    Status:{' '}
                  </Text>
                  <Text style={{fontSize: normalize(18)}}>Bid Sent</Text>
                </View>
                <View style={[styles.mb10, {flexDirection: 'row'}]}>
                  <Text style={[{fontSize: normalize(18), fontWeight: 'bold'}]}>
                    Budget:{' '}
                  </Text>
                  <Text style={{fontSize: normalize(18)}}>Rs. 5000/mo</Text>
                </View>
              </View>

              <View style={[styles.mb10, {width: '100%'}]}>
                {bidStatus == 'accepted' && (
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
                )}
                <TouchableOpacity
                  style={[styles.button, styles.boxShadow, styles.mb10]}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                    Cancel Job
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.boxShadow]}
                  onPress={() => navigation.goBack()}>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                    Go Back
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : hasJobStarted && !isJobCompleted ? (
            <View style={[{width: '100%'}, styles.tutors, styles.boxShadow]}>
              <View style={[styles.mb10]}>
                <Text style={[styles.mb10, {fontSize: normalize(18)}]}>
                  <Text style={[{fontSize: normalize(18), fontWeight: 'bold'}]}>
                    Title:
                  </Text>
                  {'  '}
                  <Text style={{fontSize: normalize(18)}}>
                    Physics Tutor Required
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
                  <Text style={{fontSize: normalize(18)}}>Aslam Khan</Text>
                </Text>
                <Text style={[{fontSize: normalize(18)}]}>
                  <Text style={[{fontSize: normalize(18), fontWeight: 'bold'}]}>
                    Agreed Budget:
                  </Text>
                  {'  '}
                  <Text style={{fontSize: normalize(18)}}>Rs. 5000/mo</Text>
                </Text>
              </View>
            </View>
          ) : hasJobStarted && isJobCompleted ? (
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
                    Physics Tutor Required
                  </Text>
                </Text>
                <Text style={[{fontSize: normalize(18)}, styles.mb10]}>
                  <Text style={[{fontSize: normalize(18), fontWeight: 'bold'}]}>
                    Student:
                  </Text>
                  {'  '}
                  <Text style={{fontSize: normalize(18)}}>Aslam Khan</Text>
                </Text>
                <Text style={[{fontSize: normalize(18)}, styles.mb10]}>
                  <Text style={[{fontSize: normalize(18), fontWeight: 'bold'}]}>
                    Agreed Budget:
                  </Text>
                  {'  '}
                  <Text style={{fontSize: normalize(18)}}>Rs. 5000/mo</Text>
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
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View
                  style={[
                    styles.mb10,
                    {backgroundColor: Colors.white, width: '100%'},
                  ]}>
                  <Text style={[{fontSize: normalize(15)}]}>
                    Provide Student Review:
                  </Text>
                  <TextInput
                    style={{
                      height: 80,
                      borderColor: 'gray',
                      borderWidth: 1,
                      placeholderTextColor: 'gray',
                      backgroundColor: '#fff',
                      borderRadius: 7,
                    }}
                    onChangeText={text => setTutorReview(text)}
                    value={tutorReview}
                    multiline={true}
                    numberOfLines={4}
                  />
                </View>
                <View style={[styles.mb10, {width: '100%'}]}>
                  <TouchableOpacity
                    style={[styles.button, styles.boxShadow]}
                    onPress={() => submitReview()}>
                    <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                      Submit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
