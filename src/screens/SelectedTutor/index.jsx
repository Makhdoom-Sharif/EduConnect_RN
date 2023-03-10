import React, { useState } from 'react';
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
  ScrollView,
  TextInput
} from 'react-native';
import { SafeAreaStyles } from '../../Global/GlobalCSS';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './Styles';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Colors } from '../../Global/GlobalCSS';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { refresh } from '../../store/action';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native'
import DatePicker from 'react-native-date-picker'

export default function SelectedTutor({ route }) {
  const navigation = useNavigation();
  console.log(route.params, 'selected tutor data');
  const dispatch = useDispatch()

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

  const { _id, accessToken } = useSelector(state => state?.login);

  const [tutorBidData, setTutorBidData] = useState(route.params.teacher);
  const [modalVisible, setModalVisible] = useState(false);
  const [escrowModal, setEscrowModal] = useState(false)
  const [hasSpecializations, setHasSpecializations] = useState(false)

  const [cardNumber, setCardNumber] = useState(null)
  const [cardCVV, setCardCVV] = useState(null)
  const [cardHolderName, setCardHolderName] = useState(null)

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const [cardDateTouched, setCardDateTouched] = useState(null)
  const [cardNumberTouched, setCardNumberTouched] = useState(null)
  const [cardCVVTouched, setCardCVVTouched] = useState(null)
  const [cardHolderNameTouched, setCardHolderNameTouched] = useState(null)
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
  //     obj = filterKeys(valArr[i], obj == null ? tutorBidData : obj);
  //   }
  //   return obj;
  // };

  const showSpecializations = (dataArr) => {
    if (dataArr) {
      setModalVisible(true)
    }
  }

  const setBidStatus = (status) => {
    console.log(status)
    console.log(route.params._id)
    const bidId = route.params._id
    if (status) {
      let data = {
        status: status
      }
      dispatch(refresh(false))
      Alert.alert(
        "Are your sure?",
        `Are you sure you want to ${status == 'accepted' ? 'accept' : 'reject'} this Bid?`,
        [
          {
            text: "Yes",
            onPress: async () => {
              const res = await axios.patch(`https://educonnectbackend-production.up.railway.app/api/bids/${bidId}`, data, {
                headers: {
                  token: 'Bearer ' + accessToken
                }
              })
              if (res) {
                Alert.alert(`${status == 'accepted' ? 'Bid Accepted' : 'Success'}`, `${status == 'accepted' ? 'Job Budget has been escrowed' : 'Bid has been rejected'}`, [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  { text: 'OK', onPress: () => resetStates() },
                ]);
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
  };

  const resetStates = () => {
    {
      dispatch(refresh(true));
      navigation.navigate('Home')
    }
  }

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
                          uri: tutorBidData[key],
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
                            {tutorBidData[key]}
                          </Text>
                        ) :(
                          [...Array(tutorBidData[key])].map((el, index) => (
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
                source={tutorBidData && tutorBidData.profilePicture ? { uri: tutorBidData.profilePicture } : {
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
                {tutorBidData.name}
              </Text>
            </View>
            <View style={styles.tutorInfo}>
              <Text style={{ marginLeft: 5, marginTop: 2 }}>{tutorBidData && tutorBidData.bio}</Text>
            </View>
          </View>

          <View style={[styles.card, styles.mb10, { flexDirection: 'row', justifyContent: 'space-around' }]}>
            {/* <View>
              <View style={[styles.mb10, {flexDirection:'row', alignItems:'center'}]}>
                <Icon name="clock-o" size={20} color={Colors.primary} />
                <Text style={{marginLeft: 5, fontSize: normalize(18)}}>{tutorBidData['experience']}{' yrs'}</Text>
              </View>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Icon name="male" size={20} color={Colors.primary} />
                <Text style={{marginLeft: 5,fontSize: normalize(18)}}>{tutorBidData['gender']}</Text>
              </View>
            </View> */}
            <View>
              <View style={[styles.mb10, { flexDirection: 'row', alignItems: 'center' }]}>
                <Icon name="graduation-cap" size={20} color={Colors.primary} />
                <Text style={{ marginLeft: 5, fontSize: normalize(18) }}>{tutorBidData.highestQualification}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="book" size={20} color={Colors.primary} />
                {
                  (tutorBidData && tutorBidData.courses && tutorBidData.courses.length == 1) ?
                    <Text style={{ marginLeft: 5, marginTop: 2, fontSize: normalize(18) }}>
                      {tutorBidData.courses[0].title} </Text>
                    : (<Text style={{ marginLeft: 5, fontSize: normalize(18) }} onPress={() => showSpecializations(tutorBidData.courses)}>view all specializations</Text>)
                }
              </View>
            </View>
          </View>


          <View style={[styles.card, styles.mb10]}>
            <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }]}>
              <Icon name="dollar" size={20} color={Colors.primary} />
              <Text style={{ marginLeft: 5, fontSize: normalize(18) }}>{route.params.bidAmount}</Text>
            </View>
          </View>

          {/* <View style={[styles.card, styles.mb10]}>
            <View style={[{flexDirection:'row', alignItems:'center'}, styles.mb10]}>
              <Icon name="map-marker" size={20} color={Colors.primary} />
              <Text style={{marginLeft: 5,fontSize: normalize(18)}}>{tutorBidData['location']}</Text>
            </View>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Icon name="motorcycle" size={20} color={Colors.primary} />
              <Text style={{marginLeft: 5,fontSize: normalize(18)}}>
                {tutorBidData['distance'] + ' Km away'}
              </Text>
            </View>
          </View> */}

          {/* <View style={[styles.card,  styles.mb10]}>
            <View style={[styles.tutorInfo, {alignItems:'center'}]}>
              <Icon name="usd" size={20} color={Colors.primary} />
              <Text style={{marginLeft: 5,fontSize: normalize(18)}}>
                {tutorBidData['currency'] +
                  tutorBidData['fees'] +
                  '/' +
                  tutorBidData['chargedBy']}
              </Text>
            </View>
          </View> */}

          {/* <View style={[styles.card, styles.mb30]}>
            <View style={[styles.tutorInfo, styles.mb10, {alignItems:'center'}]}>
              <Icon name="comments" size={20} color={Colors.primary} />
            </View>
            <View>
              {tutorBidData['reviews'].length > 0 ?
                tutorBidData['reviews'].map((item, index) => {
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
          </View> */}

          <View style={[{ width: '100%' }, styles.mb10]}>
            <TouchableOpacity
              style={[styles.button, styles.mb10]}
              onPress={() => setEscrowModal(true)}>
              <Text style={[styles.textStyles, styles.textWhite, { textAlign: 'center', fontWeight: 'bold' }]}>
                Accept Bid
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.mb10]}
              onPress={() => setBidStatus('rejected')}>
              <Text style={[styles.textStyles, styles.textWhite, { textAlign: 'center', fontWeight: 'bold' }]}>
                Reject Bid
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={[styles.button, styles.mb10]}
              onPress={() => scheduleMeeting()}>
              <Text style={[styles.textStyles, styles.textWhite, {textAlign:'center', fontWeight:'bold'}]}>
                Start Job
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={[styles.button, styles.mb10]}
              onPress={() => navigation.goBack()}>
              <Text style={[styles.textStyles, styles.textWhite, { textAlign: 'center', fontWeight: 'bold' }]}>Go Back</Text>
            </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={[styles.textStyle, styles.mb20, { fontSize: normalize(16), fontWeight: 'bold' }]}>Specializations </Text>
                <View style={{ textAlign: 'left' }}>
                  {tutorBidData.courses.map((item, index) => {
                    return <Text style={[styles.modalText, { textAlign: 'left' }]}> {index + 1 + '.'} {item.title} </Text>
                  })}
                </View>
                <Pressable
                  style={[styles.button, { backgroundColor: Colors.primary }]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={[styles.textStyle, { color: Colors.white }]}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={escrowModal}
            onRequestClose={() => {
              setEscrowModal(!escrowModal);
            }}>
            <View style={[{ flex: 1, justifyContent: 'center' }]}>
              <View style={[styles.modalView, { backgroundColor: '#fff', padding: 20, borderRadius: 10 }]}>
                <View style={{ width: '100%', alignItems: 'flex-end', position: 'relative' }}>
                  <Icon
                    name="close"
                    size={18}
                    style={{ color: '#333', position: 'absolute', top: -5, right: -10 }}
                    onPress={() => setModalVisible(false)}
                  />
                </View>
                <Text style={[styles.mb20, styles.mt20, { textAlign: 'center', fontWeight: 'bold', fontSize: 20 }]}>Payment Escrow</Text>

                <TouchableOpacity style={{ width: '100%' }}>
                  <View style={[styles.mb10, { width: '100%' }]}>
                    <Text style={{ fontSize: normalize(15) }}>
                      Card Number
                    </Text>
                    <TextInput
                      onFocus={() => setCardNumberTouched(true)}
                      keyboardType='numeric'
                      secureTextEntry={true}
                      style={{
                        height: 80,
                        borderColor: 'gray',
                        borderWidth: 1,
                        placeholderTextColor: 'gray',
                        backgroundColor: '#fff',
                        borderRadius: 7,
                      }}
                      onChangeText={text => setCardNumber(text)}
                      value={cardNumber}
                    />
                  </View>
                </TouchableOpacity>
                <View style={{ width: '100%' }}>
                  {cardNumberTouched && (!cardNumber || cardNumber.length != 16) &&
                    <Text style={[styles.error, { textAlign: 'center' }]}>Please provide 16 digits Card number</Text>}
                </View>

                <TouchableOpacity style={{ width: '100%' }}>
                  <View style={[styles.mb10, { width: '100%' }]}>
                    <Text style={{ fontSize: normalize(15) }}>
                      CVV
                    </Text>
                    <TextInput
                      onFocus={() => setCardCVVTouched(true)}
                      keyboardType='numeric'
                      secureTextEntry={true}
                      style={{
                        height: 80,
                        borderColor: 'gray',
                        borderWidth: 1,
                        placeholderTextColor: 'gray',
                        backgroundColor: '#fff',
                        borderRadius: 7,
                      }}
                      onChangeText={text => setCardCVV(text)}
                      value={cardCVV}
                    />
                  </View>
                </TouchableOpacity>
                <View style={{ width: '100%' }}>
                  {cardCVVTouched && (!cardCVV || cardCVV.length != 3) &&
                    <Text style={[styles.error, { textAlign: 'center' }]}>Please provide 3 digits CVV</Text>}
                </View>

                <TouchableOpacity style={[{ width: '100%' }, styles.mt20]}>
                  <View style={[styles.mb10, { width: '100%' }]}>
                    <Text style={{ fontSize: normalize(15) }}>
                      Card Holder Name
                    </Text>
                    <TextInput
                      onFocus={() => setCardHolderNameTouched(true)}
                      style={{
                        height: 80,
                        borderColor: 'gray',
                        borderWidth: 1,
                        placeholderTextColor: 'gray',
                        backgroundColor: '#fff',
                        borderRadius: 7,
                      }}
                      onChangeText={text => setCardHolderName(text)}
                      value={cardHolderName}
                    />
                  </View>
                </TouchableOpacity>
                <View style={{ width: '100%' }}>
                  {cardHolderNameTouched && (!cardHolderName || cardHolderName.length == 0) &&
                    <Text style={[styles.error, { textAlign: 'center' }]}>Please provide review to continue</Text>}

                  {cardHolderNameTouched && (cardHolderName && cardHolderName.length < 3) &&
                    <Text style={[styles.error, { textAlign: 'center' }]}>Review should be at least 3 characters long.</Text>}

                  {cardHolderNameTouched && (cardHolderName && cardHolderName.length > 20) &&
                    <Text style={[styles.error, { textAlign: 'center' }]}>Review should not exceed 30 characters</Text>}
                </View>

                <TouchableOpacity style={{ width: '100%' }}>
                  <View style={[styles.mb10, { width: '100%' }]}>
                    <Text style={{ fontSize: normalize(15) }}>
                      Card Expiration Date
                    </Text>
                    <Button style={{ backgroundCplor: Colors.primary }} title="Open" onPress={() => { setOpen(true); setCardDateTouched(true) }} />
                    <DatePicker
                      modal
                      open={open}
                      date={date}
                      onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                      }}
                      onCancel={() => {
                        setOpen(false)
                      }}
                    />
                  </View>
                </TouchableOpacity>
                <View style={{ width: '100%' }}>
                  {cardDateTouched && ((new Date(date)) < Date.now()) &&
                    <Text style={[styles.error, { textAlign: 'center' }]}>Please provide an active card</Text>}
                </View>

                <TouchableOpacity
                  style={[styles.mb10, styles.button, styles.boxShadow, styles.mt10, { width: '100%' }]}
                  onPress={() => setBidStatus('accepted')}
                  disabled={(
                    (cardHolderName && (cardHolderName.length == 0 || cardHolderName.length < 3 || cardHolderName.length > 20)) ||
                    (cardCVV && cardCVV.length != 3) || (cardNumber && cardNumber.length != 16) || ((new Date(date)) < Date.now())
                  )}
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
