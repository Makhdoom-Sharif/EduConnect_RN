import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
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
  Alert
} from 'react-native';
import BottomSliderHeader from '../../components/BottomSliderHeader';
import {useSelector} from 'react-redux';
import styles from './Styles';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {SafeAreaStyles} from '../../Global/GlobalCSS';
import { getCourses } from '../../backenAPICalls/coursesAPICall';
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import axios from 'axios';


export default function UpdateProfile() {
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

  const { _id, accessToken} = useSelector(state => state?.login);

  const [courses, setCourses] = useState()

  const [userProfileImg, setUserProfileImg] = useState('https://cdn.dribbble.com/users/304574/screenshots/6222816/male-user-placeholder.png');
  const [userName, setUserName] = useState(null);
  const [userBio, setUserBio] = useState(null);
  const [userPayRate, setUserPayRate] = useState(null);
  const [userQualification, setUserQualification] = useState(null);
  const [selected, setSelected] = useState([]);

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

  const selectProfileImage = async () => {
    const res = await launchImageLibrary(options);
    selectProfileImage(res.assets[0].uri);
  };


  const allCourses = async () => {
      const headers = { token: 'Bearer ' + accessToken }
      const res = await getCourses(headers)
      if(res){
        console.log(res.data, 'all courses')
        const arr = []
        res.data.forEach(obj => {
          let data = {
            key: obj._id,
            value: obj.title
          }
          arr.push(data)
        });
        setCourses(arr)
      }
    }

    const resetStates = () => {
      setUserProfileImg('')
      setUserName(null)
      setUserBio(null)
      setUserPayRate(null)
      setUserQualification(null)
      setSelected([])
      setPayByOpen(false)
      setPayByValue(null)
    }
 
    useEffect(() => {
      allCourses()
    }, [])
      
  

  const updateProfile = async () => {
    if(userName && userBio && userPayRate && payByValue && userQualification && selected){
      let data= {
        name: userName,
        profilePicture: userProfileImg,
        bio: userBio,
        hourlyRate: userPayRate,
        highestQualification: userQualification,
        courses: selected,
      }
      console.log(data)
      console.log(_id)
      try {
        const res = await axios.patch(`https://educonnectbackend-production.up.railway.app/api/teachers/${_id}`, data, {
          headers: {
            token:'Bearer ' + accessToken
          }
        })
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
              {text: 'OK', onPress: () => resetStates()},
            ],
          );
        }
      } catch (error) {
        // Alert.alert(error);
        console.log(error)
      }
    } else {
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
  };


  return (
    <SafeAreaView style={SafeAreaStyles}>
      <ScrollView style={styles.scrollView} nestedScrollEnabled={true}>
        <View style={styles.container}>
          <BottomSliderHeader title="Update Profile" />
         
          <TouchableOpacity
            onPress={selectProfileImage}>
               <Image
              style={[styles.logo, styles.mt20, styles.mb20]}
              source={userProfileImg ? {uri: userProfileImg} : {
                uri: 'https://cdn.dribbble.com/users/304574/screenshots/6222816/male-user-placeholder.png'
              }}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.mb30,
              styles.mainHeading,
              {fontSize: normalize(16)},
            ]}>
            Select Profile Image
          </Text>

          <View style={[styles.mb10, {width: '100%'}]}>
            <Text style={[styles.textWhite, {fontSize: normalize(15)}]}>
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

          <View style={[styles.mb10, {width: '100%'}]}>
            <Text style={[styles.textWhite, {fontSize: normalize(15)}]}>
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

          <View style={[styles.mb10, {width: '100%'}]}>
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
          </View>

          <View style={[styles.mb10, {width: '100%'}]}>
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
          </View>

          <View style={[styles.mb10, {width: '100%'}]}>
            <Text style={[styles.textWhite, {fontSize: normalize(15)}]}>
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

          <View style={[styles.mb10, {width: '100%'}]}>
            <Text style={[styles.textWhite, {fontSize: normalize(15)}]}>
              Courses To Teach:
            </Text>
            <MultipleSelectList 
              boxStyles={{backgroundColor:'#fff'}}
              dropdownStyles={{backgroundColor:'#fff'}}
              setSelected={(val) => setSelected(val)} 
              data={courses} 
              save="key"
              label="Available Courses"
              search={true}
              searchicon={true}
            />
          </View>

          <View style={[styles.mb10, {width: '100%'}]}>
            <TouchableOpacity
              style={[styles.button, styles.mt20, {textAlign: 'center'}]}
              onPress={() => updateProfile()}>
              <Text style={[styles.textStyles, styles.textWhite]}>
                Update Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.mt10, {textAlign: 'center'}]}
              onPress={() => navigation.goBack()}>
              <Text style={[styles.textStyles, styles.textWhite]}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
