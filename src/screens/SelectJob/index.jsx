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
  ScrollView,
} from 'react-native';
import {SafeAreaStyles} from '../../Global/GlobalCSS';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './Styles';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {refresh} from '../../store/action';
import imageStudentJob from '../../Assets/student_job.jpg';

export default function SelectJob({route}) {
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
  const {_id, accessToken} = useSelector(state => state?.login);
  const dispatch = useDispatch();

  // const {jobId, jobName, jobLogo, job, teacher, student, course, description, } = route.params;

  const [jobData, setJobData] = useState(route.params ? route.params : null);

  // const [jobOwner, setJobOwner] = useState()

  // const [jobOwner, setJobOwner] = useState([
  //   {
  //     avatar:
  //       'https://thumbs.dreamstime.com/b/young-happy-teen-girl-laughing-smiling-young-happy-teen-girl-laughing-smiling-outside-159870575.jpg',
  //     name: 'Aalia Khan',
  //     gender: 'female',
  //     about: 'Aiming for a bright future',
  //     location: 'Block 20, F.B Area, Karachi',
  //     distance: 5,
  //     payBy: 'hr',
  //     currency: 'Rs.',
  //   },
  //   {
  //     avatar: 'https://www.assyst.de/cms/upload/sub/digitalisierung/15-M.jpg',
  //     name: 'Ahmed Khan',
  //     gender: 'male',
  //     about: 'Aiming for a bright future',
  //     location: 'Block 21, F.B Area, Karachi',
  //     distance: 5,
  //     payBy: 'mo',
  //     currency: 'Rs.',
  //   },
  // ]);

  const [budget, setBudget] = useState(0);
  const [isValidBudget, setIsValidBudget] = useState(false);
  const [isJobBudgetTouched, setIsJobBudgetTouched] = useState(false);

  const viewStudentProfile = student => {
    console.log('working');
    if (route.params.student) {
      navigation.navigate('SelectedStudent', route.params.student);
    } else {
      Alert.alert('Error', 'error', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  const placeBidAmount = async () => {
    if (budget && _id && route.params._id) {
      let obj = {
        job: route.params._id,
        teacher: _id,
        bidAmount: budget,
      };
      console.log(obj);
      dispatch(refresh(false));

      try {
        const res = await axios.post(
          `https://educonnectbackend-production.up.railway.app/api/bids/`,
          obj,
          {
            headers: {
              token: 'Bearer ' + accessToken,
            },
          },
        );
        if (res) {
          Alert.alert('Bid Sent', 'Your bid has been sent successfully', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => resetStates()},
          ]);
          navigate('Home');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      //alert after response failure
      Alert.alert('Error', 'Please provide bid amount', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  const resetStates = () => {
    dispatch(refresh(true));
    setJobData(null);
    setBudget(0);
    navigation.navigate('Home');
  };

  const getBudgetValidity = () => {
    if (Number(budget) > Number(jobData.jobBudget)) {
      setIsValidBudget(true);
    } else {
      setIsValidBudget(false);
    }
  };

  return (
    <SafeAreaView style={SafeAreaStyles}>
      <ScrollView
        style={[styles.scrollView, {height: '100%'}]}
        nestedScrollEnabled={true}>
        {jobData && (
          <>
            <View style={styles.bannerImg}>
              <Image
                style={[
                  {
                    flex: 1,
                    width: 450,
                    height: 300,
                    resizeMode: 'contain',
                  },
                  styles.mb20,
                ]}
                source={imageStudentJob}
              />
            </View>

            <View style={styles.container}>
              <View style={[styles.jobDetails, styles.boxShadow]}>
                <Text style={[styles.mb10, {fontSize: normalize(16)}]}>
                  {jobData
                    ? jobData.description
                    : 'Job description not available'}
                </Text>
                {/* <Text style={[styles.mb10, {fontSize: normalize(14)}]}>
                  I need a full time tutor to help me in my physics course
                </Text> */}
              </View>

              <View style={[styles.jobDetails, styles.boxShadow]}>
                <Text style={[{fontSize: normalize(14)}]}>
                  Budget: {jobData.jobBudget}
                </Text>
              </View>

              <View
                style={[
                  styles.jobDetails,
                  styles.boxShadow,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                ]}>
                <View>
                  <Text style={[styles.mb10, {fontSize: normalize(14)}]}>
                    Posted By:
                  </Text>
                </View>
                <View
                  style={{alignItems: 'center'}}
                  onStartShouldSetResponder={() => viewStudentProfile()}>
                  <Image
                    style={styles.jobDetailUserAvatar}
                    source={
                      jobData && jobData.student.profilePicture
                        ? {uri: jobData.student.profilePicture}
                        : {
                            uri: 'https://cdn.dribbble.com/users/304574/screenshots/6222816/male-user-placeholder.png',
                          }
                    }
                  />
                  <Text>{jobData.student.name}</Text>
                </View>
              </View>

              <View style={[styles.mb10, {width: '100%'}]}>
                <Text style={[styles.textWhite, {fontSize: normalize(15)}]}>
                  Bid Amount:
                </Text>
                <TextInput
                  onFocus={() => setIsJobBudgetTouched(true)}
                  style={{
                    paddingLeft: 10,
                    height: 50,
                    borderColor: 'gray',
                    borderWidth: 1,
                    placeholderTextColor: 'gray',
                    backgroundColor: '#fff',
                    borderRadius: 7,
                  }}
                  onChangeText={text => {
                    setBudget(text);
                  }}
                  value={budget}
                  keyboardType="numeric"
                  placeholder="Place Your Bid Amount"
                />
                <Text style={styles.error}>
                  {isJobBudgetTouched && Number(budget) > jobData.jobBudget
                    ? 'Bid amount should not exceed budget amount'
                    : null}
                </Text>
              </View>

              <View style={[styles.mb10, {width: '100%'}]}>
                <TouchableOpacity
                  style={[styles.button, styles.mt20]}
                  onPress={() => placeBidAmount()}
                  disabled={Number(budget) > Number(jobData.jobBudget)}>
                  <Text
                    style={[
                      styles.textStyles,
                      styles.textWhite,
                      {textAlign: 'center', fontWeight: 'bold'},
                    ]}>
                    Place Bid
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.mt10]}
                  onPress={() => navigation.goBack()}>
                  <Text
                    style={[
                      styles.textStyles,
                      styles.textWhite,
                      {textAlign: 'center', fontWeight: 'bold'},
                    ]}>
                    Go Back
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
