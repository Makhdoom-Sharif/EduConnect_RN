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
  ScrollView
} from 'react-native';
import {SafeAreaStyles} from '../../Global/GlobalCSS';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './Styles';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {Colors} from '../../Global/GlobalCSS';

export default function SelectedTutor({route}) {
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

  const [tutorData, setTutorData] = useState(route.params);
  const [modalVisible, setModalVisible] = useState(false);
  // const filterKeys = (val, dataObj) => {
  //   const filtered = Object.keys(dataObj)
  //     .filter(key => !key.includes(val))
  //     .reduce((obj, key) => {
  //       return Object.assign(obj, {
  //         [key]: dataObj[key],
  //       });
  //     }, {});
  //   return filtered;
  // };

  // const iteratableFilter = valArr => {
  //   let obj = null;
  //   for (let i = 0; i < valArr.length; i++) {
  //     obj = filterKeys(valArr[i], obj == null ? tutorData : obj);
  //   }
  //   return obj;
  // };

  const showSpecializations = (dataArr) => {
    if (dataArr) {
      setModalVisible(true)
    }
  }

  const scheduleMeeting = () => {
    const value = true;
    if (value) {
      //api call to post job

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
      <ScrollView>
        <View style={[styles.container]}>
          {/* <View style={styles.card}>
            {Object.keys(iteratableFilter(['location', 'distance', 'currency', 'fees', 'chargedBy'])).map(
              (key, index) => {
                return (
                  <View style={[styles.tutorInfo, {marginTop: 5}]}>
                    {key == 'avatar' ? (
                      <Image
                        key={index}
                        style={[styles.avatar, styles.mb20]}
                        source={{
                          uri: tutorData[key],
                        }}
                      />
                    ) : (
                      <View style={styles.tutorInfo}>
                        <Icon
                          name={
                            key == 'gender'
                              ? 'male'
                              : key == 'age'
                              ? 'clock-o'
                              : key == 'qualification'
                              ? 'graduation-cap'
                              : ''
                          }
                          size={20}
                          color={Colors.primary}
                        />
                        {key != 'rating' ? (
                          <Text
                            style={
                              key == 'name'
                                ? {
                                    fontSize: normalize(24),
                                    fontWeight: 'bold',
                                    marginLeft: 5,
                                  }
                                : {marginLeft: 5}
                            }
                            key={index}>
                            {tutorData[key]}
                          </Text>
                        ) :(
                          [...Array(tutorData[key])].map((el, index) => (
                            <Icon
                              key={index}
                              name="star"
                              size={20}
                              style={{marginTop: 5}}
                              color={Colors.primary}
                            />
                          ))
                        )}
                      </View>
                    )}
                  </View>
                );
              },
            )}
          </View> */}

          <View style={[styles.card, styles.mb10]}>
            <View style={styles.tutorInfo}>
              <Image
                style={[styles.avatar, styles.mb20]}
                source={{
                  uri: tutorData['avatar'],
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
                {tutorData['name']}
              </Text>
            </View>
            <View style={styles.tutorInfo}>
              <Text style={{marginLeft: 5, marginTop: 2}}>{tutorData['about']}</Text>
            </View>
          </View>

          <View style={[styles.card, styles.mb10, {flexDirection:'row', justifyContent:'space-around'}]}>
            <View>
              <View style={[styles.mb10, {flexDirection:'row', alignItems:'center'}]}>
                <Icon name="clock-o" size={20} color={Colors.primary} />
                <Text style={{marginLeft: 5, fontSize: normalize(18)}}>{tutorData['experience']}{' yrs'}</Text>
              </View>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Icon name="male" size={20} color={Colors.primary} />
                <Text style={{marginLeft: 5,fontSize: normalize(18)}}>{tutorData['gender']}</Text>
              </View>
            </View>
            <View>
              <View style={[styles.mb10, {flexDirection:'row', alignItems:'center'}]}>
                <Icon name="graduation-cap" size={20} color={Colors.primary} />
                <Text style={{marginLeft: 5,fontSize: normalize(18)}}>{tutorData['qualification']}</Text>
              </View>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Icon name="book" size={20} color={Colors.primary} />
                {
                  (tutorData['specialization'] && tutorData['specialization'].length == 1) ? <Text style={{marginLeft: 5, marginTop: 2, fontSize: normalize(18)}}> {tutorData['specialization'][0]} </Text> 
                  : (<Text style={{marginLeft: 5,fontSize: normalize(18)}} onPress={()=> showSpecializations(tutorData['specialization'])}>see all</Text>)
                }
              </View>
            </View>
          </View>

          <View style={[styles.card, styles.mb10]}>
            <View style={[{flexDirection:'row', alignItems:'center'}, styles.mb10]}>
              <Icon name="map-marker" size={20} color={Colors.primary} />
              <Text style={{marginLeft: 5,fontSize: normalize(18)}}>{tutorData['location']}</Text>
            </View>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Icon name="motorcycle" size={20} color={Colors.primary} />
              <Text style={{marginLeft: 5,fontSize: normalize(18)}}>
                {tutorData['distance'] + ' Km away'}
              </Text>
            </View>
          </View>

          <View style={[styles.card,  styles.mb10]}>
            <View style={[styles.tutorInfo, {alignItems:'center'}]}>
              <Icon name="usd" size={20} color={Colors.primary} />
              <Text style={{marginLeft: 5,fontSize: normalize(18)}}>
                {tutorData['currency'] +
                  tutorData['fees'] +
                  '/' +
                  tutorData['chargedBy']}
              </Text>
            </View>
          </View>

          <View style={[styles.card, styles.mb30]}>
            <View style={[styles.tutorInfo, styles.mb10, {alignItems:'center'}]}>
              <Icon name="comments" size={20} color={Colors.primary} />
            </View>
            <View>
              {tutorData['reviews'].length > 0 ?
                tutorData['reviews'].map((item, index) => {
                  return <Text style={[styles.mb10, {fontSize: normalize(14)}]}>
                  {item}
                </Text>
                })
                :
                <Text style={[styles.mb10, {fontSize: normalize(14)}]}>
                  No reviews available
                </Text>
              }
            </View>
          </View>

          <View style={[{width: '100%'}, styles.mb10]}>
            <TouchableOpacity
              style={[styles.button, styles.mb10]}
              onPress={() => scheduleMeeting()}>
              <Text style={[styles.textStyles, styles.textWhite, {textAlign:'center', fontWeight:'bold'}]}>
                Invite For Meeting
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.mb10]}
              onPress={() => scheduleMeeting()}>
              <Text style={[styles.textStyles, styles.textWhite, {textAlign:'center', fontWeight:'bold'}]}>
                Start Job
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.mb10]}
              onPress={() => navigation.goBack()}>
              <Text style={[styles.textStyles, styles.textWhite, {textAlign:'center', fontWeight:'bold'}]}>Go Back</Text>
            </TouchableOpacity>
          </View>

          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={[styles.textStyle, styles.mb20, {fontSize: normalize(16), fontWeight: 'bold'}]}>Specializations </Text> 
              <View style={{textAlign:'left'}}>
                  {tutorData['specialization'].map((item,index)=> {
                    return <Text style={[styles.modalText, {textAlign:'left'}]}> {index+1 + '.'} {item} {index == tutorData['specialization'].length-1 ? '' : ','} </Text>
                  })}
              </View>
              <Pressable
                style={[styles.button, {backgroundColor:Colors.primary}]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={[styles.textStyle, {color:Colors.white}]}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
