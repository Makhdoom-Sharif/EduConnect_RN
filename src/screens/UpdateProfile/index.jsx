import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  PixelRatio,
  Dimensions,
  Platform,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import BottomSliderHeader from '../../components/BottomSliderHeader';
import { useSelector } from 'react-redux';
import styles from './Styles';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaStyles } from '../../Global/GlobalCSS';
import { getCourses } from '../../backenAPICalls/coursesAPICall';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { SelectList } from 'react-native-dropdown-select-list';
import axios from 'axios';

export default function UpdateProfile() {
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

  const { _id, accessToken, role } = useSelector(state => state?.login);

  const [courses, setCourses] = useState();

  const [userProfileImg, setUserProfileImg] = useState(
    'https://cdn.dribbble.com/users/304574/screenshots/6222816/male-user-placeholder.png',
  );
  const [userName, setUserName] = useState(null);
  const [userBio, setUserBio] = useState(null);
  const [userPayRate, setUserPayRate] = useState(null);
  const [userQualification, setUserQualification] = useState(null);
  const [userExperience, setUserExperience] = useState();
  const [selected, setSelected] = useState([]);
  const [location, setLocation] = useState([]);

  const [teacherWorkingHourStart, setTeacherWorkingHourStart] = useState(null)
  const [teacherWorkingHourEnd, setTeacherWorkingHourEnd] = useState(null)
  const [workingTimes, setWorkingTimes] = useState([
    {
      label: '12 AM',
      value: '12 AM'
    },
    {
      label: '01 AM',
      value: '01 AM'
    },
    {
      label: '02 AM',
      value: '02 AM'
    },
    {
      label: '03 AM',
      value: '03 AM'
    },
    {
      label: '04 AM',
      value: '04 AM'
    },
    {
      label: '05 AM',
      value: '05 AM'
    },
    {
      label: '06 AM',
      value: '06 AM'
    },
    {
      label: '07 AM',
      value: '07 AM'
    },
    {
      label: '08 AM',
      value: '08 AM'
    },
    {
      label: '09 AM',
      value: '09 AM'
    },
    {
      label: '10 AM',
      value: '10 AM'
    },
    {
      label: '11 AM',
      value: '11 AM'
    },
    {
      label: '12 PM',
      value: '12 PM'
    },
    {
      label: '01 PM',
      value: '01 PM'
    },
    {
      label: '02 PM',
      value: '02 PM'
    },
    {
      label: '03 PM',
      value: '03 PM'
    },
    {
      label: '04 PM',
      value: '04 PM'
    },
    {
      label: '05 PM',
      value: '05 PM'
    },
    {
      label: '06 PM',
      value: '06 PM'
    },
    {
      label: '07 PM',
      value: '07 PM'
    },
    {
      label: '08 PM',
      value: '08 PM'
    },
    {
      label: '09 PM',
      value: '09 PM'
    },
    {
      label: '10 PM',
      value: '10 PM'
    },
    {
      label: '11 PM',
      value: '11 PM'
    },
  ])

  const [payByOpen, setPayByOpen] = useState(false);
  const [payByValue, setPayByValue] = useState(null);
  const [payBy, setPayBy] = useState([
    {
      label: 'Per Hour',
      value: '/hour',
    },
    {
      label: 'Per Month',
      value: '/month',
    },
  ]);

  let options = {
    mediaType: 'photo',
  };

  const [locationList, setLocationList] = useState([
    {
      label: 'Clifton',
      value: 'Clifton',
    },
    {
      label: 'Defence Housing Authority (DHA)',
      value: 'Defence Housing Authority (DHA)',
    },
    {
      label: 'Gulshan-e-Iqbal',
      value: 'Gulshan-e-Iqbal',
    },
    {
      label: 'North Nazimabad',
      value: 'North Nazimabad',
    },
    {
      label: 'Gulistan-e-Jauhar',
      value: 'Gulistan-e-Jauhar',
    },
    {
      label: 'Tariq Road',
      value: 'Tariq Road',
    },
    {
      label: 'Saddar',
      value: 'Saddar',
    },
    {
      label: 'PECHS',
      value: 'PECHS',
    },
    {
      label: 'Bahadurabad',
      value: 'Bahadurabad',
    },
    {
      label: 'Nazimabad',
      value: 'Nazimabad',
    },
    {
      label: 'Korangi',
      value: 'Korangi',
    },
    {
      label: 'Malir',
      value: 'Malir',
    },
    {
      label: 'Karachi Cantonment',
      value: 'Karachi Cantonment',
    },
    {
      label: 'Jamshed Road',
      value: 'Jamshed Road',
    },
    {
      label: 'Liaquatabad',
      value: 'Liaquatabad',
    },
    {
      label: 'FB Area',
      value: 'FB Area',
    },
  ]);

  const [refresh, setRefresh] = useState(false)

  const selectProfileImage = async () => {
    const res = await launchImageLibrary(options);
    selectProfileImage(res.assets[0].uri);
  };

  const allCourses = async () => {
    const headers = { token: 'Bearer ' + accessToken };
    const res = await getCourses(headers);
    if (res) {
      console.log(res.data, 'all courses');
      const arr = [];
      res.data.forEach(obj => {
        let data = {
          key: obj._id,
          value: obj.title,
        };
        arr.push(data);
      });
      setCourses(arr);
    }
  };

  const updateProfile = async () => {

    let data = {
      name: userName,
      profilePicture: userProfileImg,
      bio: userBio,
      highestQualification: userQualification,
      courses: selected.length > 0 ? selected : null,
      experience: userExperience ? userExperience : null,
      location: location.length > 0 ? location : null,
      availability: (teacherWorkingHourStart && teacherWorkingHourEnd) ? teacherWorkingHourStart + ' to ' + teacherWorkingHourEnd : null
    };
    Object.keys(data).forEach(key => {
      if (data[key] == null) {
        delete data[key];
      }
    });
    console.log(data);
    console.log(accessToken, 'token')
    try {
      let res = null;
      let sendReq = false
      Object.keys(data).forEach(key => {
        if (key != 'profilePicture' && data[key] != null) {
          sendReq = true
        }
      });
      if (sendReq) {
        if (role == 'teacher') {
          res = await axios.patch(
            `https://educonnectbackend-production.up.railway.app/api/teachers/${_id}`,
            data,
            {
              headers: {
                token: 'Bearer ' + accessToken,
              },
            },
          );
        } else {
          res = await axios.put(
            `https://educonnectbackend-production.up.railway.app/api/students/${_id}`,
            data,
            {
              headers: {
                token: 'Bearer ' + accessToken,
              },
            },
          );
        }
      }
      else {
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

      if (res) {
        //alert after response success
        Alert.alert(
          'Profile Updated',
          'Your profile has been updated successfully',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => resetStates() },
          ],
        );
      }
    } catch (error) {
      // Alert.alert(error);
      console.log(error);
    }
};

const resetStates = () => {
  setUserProfileImg('');
  setUserName(null);
  setUserBio(null);
  setUserPayRate(null);
  setUserQualification(null);
  setUserExperience(null);
  setSelected([]);
  setLocation([]);
  setPayByOpen(false);
  setPayByValue(null);
  setRefresh(true)
  navigation.navigate('Home');
};

useEffect(() => {
  allCourses();
}, []);

useEffect(() => {
  console.log('refresh')
}, [refresh]);

return (
  <SafeAreaView style={SafeAreaStyles}>
    <ScrollView style={styles.scrollView} nestedScrollEnabled={true}>
      <View style={styles.container}>
        <BottomSliderHeader title="Update Profile" />

        <TouchableOpacity onPress={selectProfileImage}>
          <Image
            style={[styles.logo, styles.mt20, styles.mb20, {}]}
            source={
              userProfileImg
                ? { uri: userProfileImg }
                : {
                  uri: 'https://cdn.dribbble.com/users/304574/screenshots/6222816/male-user-placeholder.png',
                }
            }
            resizeMode="cover"
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.mb30,
            styles.mainHeading,
            { fontSize: normalize(16) },
          ]}>
          Select Profile Image
        </Text>

        <View style={[styles.mb10, { width: '100%' }]}>
          <Text style={[styles.textWhite, { fontSize: normalize(15) }]}>
            Your Name:
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
            onChangeText={text => setUserName(text)}
            value={userName}
          />
        </View>

        <View style={[styles.mb10, { width: '100%' }]}>
          <Text style={[styles.textWhite, { fontSize: normalize(15) }]}>
            Describe Yourself:
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
            onChangeText={text => setUserBio(text)}
            value={userBio}
            multiline={true}
            numberOfLines={4}
          />
        </View>

        {/* <View style={[styles.mb10, {width: '100%'}]}>
            <Text style={[styles.textWhite, {fontSize: normalize(15)}]}>
              Your Payment Rate:
            </Text>
            <TextInput
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                placeholderTextColor: 'gray',
                backgroundColor: '#fff',
                borderRadius: 7,
              }}
              onChangeText={text => setUserPayRate(text)}
              value={userPayRate}
              keyboardType="numeric"
            />
          </View> */}

        {/* <View style={[styles.mb10, {width: '100%'}]}>
            <Text style={[styles.textWhite, {fontSize: normalize(15)}]}>
              Select Payment Method:
            </Text>
            <DropDownPicker
              style={{zIndex: 1}}
              open={payByOpen}
              value={payByValue}
              items={payBy}
              setOpen={setPayByOpen}
              setValue={setPayByValue}
              setItems={setPayBy}
            />
          </View> */}
        {role == 'teacher' && (
          <View style={[styles.mb10, { width: '100%' }]}>
            <Text style={[styles.textWhite, { fontSize: normalize(15) }]}>
              Highest Qualification:
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
              onChangeText={text => setUserQualification(text)}
              value={userQualification}
            />
          </View>
        )}

        {role == 'teacher' && (
          <View style={[styles.mb10, { width: '100%' }]}>
            <Text style={[styles.textWhite, { fontSize: normalize(15) }]}>
              Your Experience:
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
              onChangeText={text => setUserExperience(text)}
              value={userExperience}
            />
          </View>
        )}

        {role == 'teacher' && (
          <View style={[styles.mb10, { width: '100%', flexDirection: 'row' }]}>

            <View style={[styles.mb10, { width: '45%' }]}>
              <Text style={[styles.textWhite, { fontSize: normalize(15) }]}>
                Hours Start:
              </Text>
              <SelectList
                boxStyles={{ backgroundColor: '#fff' }}
                dropdownStyles={{ backgroundColor: '#fff' }}
                setSelected={val => setTeacherWorkingHourStart(val)}
                data={workingTimes}
                save="value"
              />
            </View>

            <View style={[styles.mb10, { width: '10%' }]}>
              {/* <Text style={[styles.textWhite, {fontSize: normalize(15)}]}>to</Text> */}
            </View>

            <View style={[styles.mb10, { width: '45%' }]}>
              <Text style={[styles.textWhite, { fontSize: normalize(15) }]}>
                Hours End:
              </Text>
              <SelectList
                boxStyles={{ backgroundColor: '#fff' }}
                dropdownStyles={{ backgroundColor: '#fff' }}
                setSelected={val => setTeacherWorkingHourEnd(val)}
                data={workingTimes}
                save="value"
              />
            </View>

          </View>
        )}


        {role == 'teacher' && (
          <View style={[styles.mb10, { width: '100%' }]}>
            <Text style={[styles.textWhite, { fontSize: normalize(15) }]}>
              Courses To Teach:
            </Text>
            <MultipleSelectList
              boxStyles={{ backgroundColor: '#fff' }}
              dropdownStyles={{ backgroundColor: '#fff' }}
              setSelected={val => setSelected(val)}
              data={courses}
              save="key"
              label="Available Courses"
              search={true}
              searchicon={true}
            />
          </View>
        )}

        {role == 'teacher' && (
          <View style={[styles.mb10, { width: '100%' }]}>
            <Text style={[styles.textWhite, { fontSize: normalize(15) }]}>
              Preferred Teaching Areas:
            </Text>
            <MultipleSelectList
              boxStyles={{ backgroundColor: '#fff' }}
              dropdownStyles={{ backgroundColor: '#fff' }}
              setSelected={val => setLocation(val)}
              data={locationList}
              save="key"
              label="Your Preferred Teaching Areas"
              search={true}
              searchicon={true}
            />
          </View>
        )}

        {role == 'student' && (
          <View style={[styles.mb10, { width: '100%' }]}>
            <Text style={[styles.textWhite, { fontSize: normalize(15) }]}>
              Your Location:
            </Text>
            <SelectList
              boxStyles={{ backgroundColor: '#fff' }}
              dropdownStyles={{ backgroundColor: '#fff' }}
              setSelected={val => setLocation(val)}
              data={locationList}
              save="value"
            />
          </View>
        )}

        <View style={[styles.mb10, { width: '100%' }]}>
          <TouchableOpacity
            style={[styles.button, styles.mt20]}
            onPress={() => updateProfile()}>
            <Text
              style={[
                styles.textStyles,
                styles.textWhite,
                { textAlign: 'center' },
              ]}>
              Update
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
              style={[styles.button, styles.mt10]}
              onPress={() => navigation.goBack()}>
              <Text
                style={[
                  styles.textStyles,
                  styles.textWhite,
                  {textAlign: 'center'},
                ]}>
                Go Back
              </Text>
            </TouchableOpacity> */}
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>
);
}
