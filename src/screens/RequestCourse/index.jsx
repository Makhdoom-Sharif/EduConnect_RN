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
  Alert,
} from 'react-native';
import BottomSliderHeader from '../../components/BottomSliderHeader';
import {useSelector} from 'react-redux';
import styles from './Styles';
import axios from 'axios';
import {SelectList} from 'react-native-dropdown-select-list';
import {SafeAreaStyles} from '../../Global/GlobalCSS';


export default function RequestCourse() {
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

  const {_id, accessToken, role} = useSelector(state => state?.login);
  const [requestedCourse, setRequestedCourse] = useState(null);
  const [selectedCourseType, setSelectedCourseType] = useState([])
  const [courseTypes, setCourseTypes] = useState([
    {
      label: 'Academic',
      value: 'Academic',
    },
    {
      label: 'Non Academic',
      value: 'Non Academic',
    },
  ]);

  const requestCourse = async () => {
    if (requestedCourse && selectedCourseType) {
      let data = {
        student: _id, 
        title: requestedCourse,
        isAcademic: selectedCourseType == 'Academic' ? true : false
      };
      console.log(data);
      console.log(accessToken, 'access token');

      let res = null;
          res = await axios.post(
            `https://educonnectbackend-production.up.railway.app/api/requests`, data, { headers: { token: 'Bearer ' + accessToken } }
          );
        
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
        else{
           //alert after response success
           Alert.alert(
            'Error',
            'Something went wrong',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => console.log('Cancel Pressed')},
            ],
          );
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

  const resetStates = () => {
    setRequestedCourse(null);
    setSelectedCourseType(null);
    navigation.navigate('Home');
  };


  return (
    <SafeAreaView style={SafeAreaStyles}>
      <ScrollView style={styles.scrollView} nestedScrollEnabled={true}>
        <View style={styles.container}>
          <BottomSliderHeader title="Request Course" />

          <View style={[styles.mb10, styles.mt20, {width: '100%'}]}>
            <Text style={[styles.textWhite, {fontSize: normalize(15)}]}>
              Request Course Title:
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
              onChangeText={text => setRequestedCourse(text)}
              value={requestedCourse}
            />
          </View>

          <View style={[styles.mb10, {width: '100%'}]}>
            <Text style={[styles.textWhite, {fontSize: normalize(15)}]}>
              Course Type:
            </Text>
            <SelectList
              boxStyles={{backgroundColor: '#fff'}}
              dropdownStyles={{backgroundColor: '#fff'}}
              setSelected={val => setSelectedCourseType(val)}
              data={courseTypes}
              save="value"
            />
          </View>

          <View style={[styles.mb10, {width: '100%'}]}>
            <TouchableOpacity
              style={[styles.button, styles.mt20]}
              onPress={() => requestCourse()}>
              <Text
                style={[
                  styles.textStyles,
                  styles.textWhite,
                  {textAlign: 'center'},
                ]}>
                Post Request
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
