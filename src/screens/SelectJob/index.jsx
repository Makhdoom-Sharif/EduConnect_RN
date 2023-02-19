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
  ScrollView      
} from 'react-native';
import {SafeAreaStyles} from '../../Global/GlobalCSS';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './Styles';
import {useNavigation} from '@react-navigation/native';

export default function SelectJob({ route }) {
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
  const { jobId, jobName, jobLogo } = route.params;

  const [jobData, setJobData] = useState(route.params ? { 
      jobId: jobId,
      jobName: jobName,
      jobLogo: jobLogo
    } : 
    null
  )

  const [jobOwner, setJobOwner] = useState([
    {
      avatar: 'https://thumbs.dreamstime.com/b/young-happy-teen-girl-laughing-smiling-young-happy-teen-girl-laughing-smiling-outside-159870575.jpg',
      name: 'Aalia Khan',
      gender: 'female',
      about: 'Aiming for a bright future',
      location: 'Block 20, F.B Area, Karachi',
      distance: 5,
      payBy: 'hr',
      currency: 'Rs.',
    },
    {
      avatar: 'https://www.assyst.de/cms/upload/sub/digitalisierung/15-M.jpg',
      name: 'Ahmed Khan',
      gender: 'male',
      about: 'Aiming for a bright future',
      location: 'Block 21, F.B Area, Karachi',
      distance: 5,
      payBy: 'mo',
      currency: 'Rs.',
    },
  ]);

  const [budget, setBudget] = useState(0);

  const viewStudentProfile = (student) => {
    console.log('working')
    if(jobOwner){
      console.log(jobOwner,'working')
      navigation.navigate('SelectedStudent', jobOwner[0]);
    }
    else{
      Alert.alert('Error', 'error', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  }

  const placeBidAmount = () => {
    if(budget){

      Alert.alert('Bid Placed', 'Interested Student will respond back to you', [
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
      Alert.alert('Error', 'Please provide bid amount', [
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
      <ScrollView style={[styles.scrollView, {height:'100%'}]} nestedScrollEnabled={true}>
      {
        jobData ?
        <>
          <View style={styles.bannerImg}>
            <Image
                style={[{
                flex: 1,
                width: 450,
                height: 300,
                resizeMode:'contain'
              }, 
              styles.mb20]}
                source={require('../../assets/student_job.jpg')}
              />
          </View>
        
          <View style={styles.container}>
            <View style={[styles.jobDetails,  styles.boxShadow]}>
              <Text style={[styles.mb10,{fontSize: normalize(24)}]}>Physics Tutor Required</Text>
              <Text style={[styles.mb10,{fontSize: normalize(14)}]}>I need a full time tutor to help me in my physics course</Text>
            </View>

            <View style={[styles.jobDetails,  styles.boxShadow]}>
              <Text style={[{fontSize: normalize(14)}]}>Budget: 5000/mo</Text>
            </View>

            <View style={[styles.jobDetails, styles.boxShadow, {flexDirection:'row', justifyContent:'space-between', alignItems:'center'}]}>
              <View>
                <Text style={[styles.mb10,{fontSize: normalize(14)}]}>Posted By:</Text>
              </View>
              <View style={{alignItems:'center'}} onStartShouldSetResponder={()=>viewStudentProfile()}>
                <Image
                    style={styles.jobDetailUserAvatar}
                    source={{uri: 'https://thumbs.dreamstime.com/b/young-happy-teen-girl-laughing-smiling-young-happy-teen-girl-laughing-smiling-outside-159870575.jpg'}}
                />
                <Text>Aalia Khan</Text>
              </View>
            </View>

            <View style={[styles.mb10, {width: '100%'}]}>
              <Text
                style={[styles.textWhite, {fontSize: normalize(15)}]}>
                Bid Amount:
              </Text>
              <TextInput
                style={{ 
                paddingLeft:10,
                height: 50, 
                borderColor: 'gray', 
                borderWidth: 1,
                placeholderTextColor: 'gray',
                backgroundColor:"#fff",
                borderRadius: 7
              }}
                onChangeText={text => setBudget(text)}
                value={budget}
                keyboardType='numeric'
                placeholder='Place Your Bid Amount'
              />
            </View>

            <View style={[styles.mb10, {width: '100%'}]}>
              <TouchableOpacity
                style={[styles.button, styles.mt20]}
                onPress={() => placeBidAmount()}
                >
                <Text style={[styles.textStyles, styles.textWhite, {textAlign:'center', fontWeight:'bold'}]}>
                  Place Bid
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.mt10]}
                onPress={() => navigation.goBack()}>
                <Text style={[styles.textStyles, styles.textWhite, {textAlign:'center', fontWeight:'bold'}]}>Go Back</Text>
              </TouchableOpacity>
            </View>
          </View>
          </>
        :
        <View style={styles.container}>
          <Text>No data available</Text>
        </View>
      }
      </ScrollView>
    </SafeAreaView>
  );
}