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
  Alert      
} from 'react-native';
import {SafeAreaStyles} from '../../Global/GlobalCSS';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './Styles';
import {useNavigation} from '@react-navigation/native';

export default function SelectCourse({ route }) {
  const navigation = useNavigation();
  const { courseId, courseName, courseLogo } = route.params;

  const [courseData, setCourseData] = useState({ 
    courseId: courseId,
    courseName: courseName,
    courseLogo: courseLogo
  })
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
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

  // const getClassesForCourse = () => {}

  const searchTutor = () => {
    if(value){
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
      Alert.alert('Error', 'Please select a class to continue', [
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
        <View style={{width: '100%'}}>
          <Text
            style={[styles.textWhite, styles.mb10, {fontSize: normalize(15)}]}>
            Select your class:
          </Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setValue={setValue}
            setItems={setItems}
            setOpen={setOpen}
          />
          {
            <View>
              <TouchableOpacity
                style={[styles.button, styles.mt20]}
                onPress={() => searchTutor()}>
                <Text style={[styles.textStyles, styles.textWhite]}>Find Tutor</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.mt10]}
                onPress={() => navigation.goBack()}>
                <Text style={[styles.textStyles, styles.textWhite]}>Go Back</Text>
              </TouchableOpacity>
            </View>
          }
        </View>
      </View>
    </SafeAreaView>
  );
}