import React, {useState} from 'react';
import {
  Modal,
  Image,
  Text,
  View,
  PixelRatio,
  Dimensions,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import {SafeAreaStyles} from '../../Global/GlobalCSS';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './Styles';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {Colors} from '../../Global/GlobalCSS';

export default function SelectedStudent({route}) {
  const navigation = useNavigation();
  console.log(route.params, 'params');

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

  const [studentData, setstudentData] = useState(route.params);
  const [modalVisible, setModalVisible] = useState(false);

  const showSpecializations = (dataArr) => {
    if (dataArr) {
      setModalVisible(true)
    }
  }

  const scheduleMeeting = () => {
    const value = true;
    if (value) {

      //alert after response success
      Alert.alert(
        'Invite Sent',
        'A meeting invite has been sent to the tutor',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
      );
    } else {
      //alert after response failure
      Alert.alert('Error', 'Something went wrong', [
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
      <View style={[styles.container]}>

        <View style={[styles.card, styles.mb10]}>
          <View style={styles.tutorInfo}>
            <Image
              style={[styles.avatar, styles.mb20]}
              source={studentData.profilePicture ? { uri : studentData.profilePicture } : {
                uri: 'https://cdn.dribbble.com/users/304574/screenshots/6222816/male-user-placeholder.png'
              }}
            />
          </View>
          <View style={styles.tutorInfo}>
            <Text
              style={{
                fontSize: normalize(24),
                fontWeight: 'bold',
                marginLeft: 5,
              }}>
              {studentData.name}
            </Text>
          </View>
          {/* <View style={styles.tutorInfo}>
            <Text style={{marginLeft: 5, marginTop: 2}}>{studentData.description}</Text>
          </View> */}
        </View>

        {/* <View style={[styles.card, styles.mb10, {flexDirection:'row', justifyContent:'space-around'}]}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Icon name="male" size={20} color={Colors.primary} />
              <Text style={{marginLeft: 5,fontSize: normalize(18)}}>{studentData['gender']}</Text>
            </View>
        </View> */}

        {/* <View style={[styles.card, styles.mb10]}>
          <View style={[{flexDirection:'row', alignItems:'center'}, styles.mb10]}>
            <Icon name="map-marker" size={20} color={Colors.primary} />
            <Text style={{marginLeft: 5,fontSize: normalize(18)}}>{studentData['location']}</Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Icon name="motorcycle" size={20} color={Colors.primary} />
            <Text style={{marginLeft: 5,fontSize: normalize(18)}}>
              {studentData['distance'] + ' Km away'}
            </Text>
          </View>
        </View> */}

        {/* <View style={[styles.card, styles.mb10]}>
          <View style={[styles.tutorInfo, {alignItems:'center'}]}>
            <Icon name="usd" size={20} color={Colors.primary} />
            <Text style={{marginLeft: 5,fontSize: normalize(18)}}>
              {studentData['payBy']}
            </Text>
          </View>
        </View> */}

        {/* <View style={[styles.card]}>
          <View style={[styles.tutorInfo, styles.mb10, {alignItems:'center'}]}>
            <Icon name="comments" size={20} color={Colors.primary} />
          </View>
          <View>
            <Text style={[styles.mb10, {fontSize: normalize(14)}]}>
                Enjoyed teaching her - Ahmed Khan (Tutor)
              </Text>
              <Text style={[styles.mb10, {fontSize: normalize(14)}]}>
                A very bright mind - Amna Ali (Tutor)
              </Text>
          </View>
        </View> */}

        <View style={[{width: '100%'}]}>
          <TouchableOpacity
            style={[styles.button, styles.mt10]}
            onPress={() => navigation.goBack()}>
            <Text style={[styles.textStyles, styles.textWhite, {textAlign:'center', fontWeight:'bold'}]}>Go Back</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}
