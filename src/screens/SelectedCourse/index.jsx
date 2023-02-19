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
  ScrollView
} from 'react-native';
import {SafeAreaStyles} from '../../Global/GlobalCSS';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './Styles';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {Colors} from '../../Global/GlobalCSS';

export default function SelectedCourse({route}) {
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
  const {courseId, courseName, courseLogo} = route.params;

  const [courseData, setCourseData] = useState({
    courseId: courseId,
    courseName: courseName,
    courseLogo: courseLogo,
  });

  const [hasJobStarted, setHasJobStarted] = useState(false)
  const [isJobCompleted, setIsJobCompleted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [cardHolderName, setCardHolderName] = useState(null)
  const [cardNumber, setCardNumber] = useState(null)
  const [cardExpiryDate, setCardExpiryDate] = useState(null)
  const [cardCVV, setCardCVV] = useState(null)

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
      reviews:[]
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
      reviews:[
        'A very helpful and kind person - Ali (Student)',
        'His way of teaching is amazing - Aalia Khan (Student)'
      ]
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
      reviews:[
        'A very helpful and kind person - Ali (Student)',
        'His way of teaching is amazing - Aalia Khan (Student)'
      ]
    },
  ]);

  const onTutorSelect = tutor => {
    console.log(tutor, 'selected tutor');
    navigation.navigate('SelectedTutor', tutor);
  };

  const initiateJobCompletion = () => {
    if(true){
      navigation.navigate('JobCompleted', {})
    }
    else{
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
  }

  return (
    <SafeAreaView style={SafeAreaStyles}>
      <ScrollView style={{height:'100%'}}>
        {
          !isJobCompleted &&
          <View style={styles.bannerImg}>
            <Image
                style={[{
                width: 450,
                height: 400,
                resizeMode:'contain'
              }, 
              styles.mb20]}
                source={require('../../assets/tutor_job.jpg')}
              />
          </View>
        }
      
      <View style={styles.container}>
        { !hasJobStarted && !isJobCompleted ? (
          <View>
            <View style={[styles.mb20, styles.mainHeading, styles.boxShadow, {backgroundColor:Colors.white, borderRadius:5, padding:5, paddingLeft:10, fontSize: normalize(20)}]}>
              <Text style={[styles.mb10,{fontSize: normalize(20), marginTop:5}]}>Interested Tutors:</Text>
            </View>
            <FlatList
              data={interestedTutors}
              contentContainerStyle={{
                flexDirection: 'row',
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[styles.tutors, styles.boxShadow, {marginRight:20}]}
                  onPress={() => onTutorSelect(item)}
                  >
                  <Image
                    style={[styles.avatar, styles.mb20]}
                    source={{
                      uri: item.avatar,
                    }}
                  />

                  <View style={styles.tutorInfo}>
                    <Text
                      style={[
                        styles.textStyles,
                        styles.mb10,
                        {
                          marginLeft: 5,
                          fontSize: normalize(16),
                          fontWeight: '600',
                        },
                      ]}>
                      {item.name}
                    </Text>
                  </View>

                  <View style={styles.tutorInfo}>
                    <Icon
                      name="clock-o"
                      size={15}
                      style={{marginTop: 5}}
                      color={Colors.primary}
                    />
                    <Text
                      style={[
                        styles.textStyles,
                        {marginLeft: 5, fontSize: normalize(12)},
                      ]}>
                      {item.experience} {' yrs'}
                    </Text>
                  </View>

                  <View style={styles.tutorInfo}>
                    <Icon
                      name="graduation-cap"
                      size={15}
                      style={{marginTop: 5}}
                      color={Colors.primary}
                    />
                    <Text
                      style={[
                        styles.textStyles,
                        {marginLeft: 5, fontSize: normalize(12)},
                      ]}>
                      {item.qualification}
                    </Text>
                  </View>

                  <View style={styles.tutorInfo}>
                    <Icon
                      name="map-marker"
                      size={15}
                      style={{marginTop: 5}}
                      color={Colors.primary}
                    />
                    <Text
                      style={[
                        styles.textStyles,
                        {marginLeft: 5, fontSize: normalize(12)},
                      ]}>
                      {item.location}
                    </Text>
                  </View>

                  <View style={styles.tutorInfo}>
                    <Icon
                      name="motorcycle"
                      size={15}
                      style={{marginTop: 5}}
                      color={Colors.primary}
                    />
                    <Text
                      style={[
                        styles.textStyles,
                        {marginLeft: 5, fontSize: normalize(12)},
                      ]}>
                      {item.distance} km away
                    </Text>
                  </View>

                  <View style={styles.tutorInfo}>
                    {[...Array(item.rating)].map((el, index) => (
                      <Icon
                        key={index}
                        name="star"
                        size={15}
                        style={{marginTop: 5}}
                        color={Colors.primary}
                      />
                    ))}
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : hasJobStarted && !isJobCompleted ? (
          <View style={[{width:'100%'}, styles.boxShadow, styles.tutors]}>
            <View style={[styles.mb30]}>
              <Text style={[{fontSize: normalize(18)}, styles.mb10]}>
                <Text style={[{fontSize: normalize(18), fontWeight:'bold'}]}>
                  Title:
                </Text>{"  "}
                <Text style={{fontSize: normalize(18)}}>
                  Physics Tutor Required
                </Text>
              </Text>
              <Text style={[{fontSize: normalize(18)}, styles.mb10]}>
                <Text style={[{fontSize: normalize(18), fontWeight:'bold'}]}>
                  Tutor:
                </Text>{"  "}
                <Text style={{fontSize: normalize(18)}}>Aslam Khan</Text>
              </Text>
              <Text style={[{fontSize: normalize(18)}, styles.mb10]}>
                <Text style={[{fontSize: normalize(18), fontWeight:'bold'}]}>
                  Job Status:
                </Text>{"  "}
                <Text style={{fontSize: normalize(18)}}>In Progress</Text>
              </Text>
              <Text style={[{fontSize: normalize(18)}, styles.mb10]}>
                <Text style={[{fontSize: normalize(18), fontWeight:'bold'}]}>
                  Agreed Budget:
                </Text>{"  "}
                <Text style={{fontSize: normalize(18)}}>Rs. 5000/mo</Text>
              </Text>
            </View>

            <View style={[styles.mb10,{width:'100%'}]}>
              <TouchableOpacity style={[ styles.button, styles.boxShadow]} onPress={()=> initiateJobCompletion()}>
                <Text style={{textAlign:'center', fontWeight:'bold'}}>Mark As Completed</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.mb10,{width:'100%'}]}>
              <TouchableOpacity style={[ styles.button, styles.boxShadow]}
              onPress={()=> navigation.goBack()}
              >
                <Text style={{textAlign:'center', fontWeight:'bold'}}>Go Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
          : hasJobStarted && isJobCompleted ? 
          <View style={[{width:'100%'}, styles.tutors, styles.boxShadow]}>
             <View style={[styles.mb10, {width:'100%', alignItems:'center'}]}>
              <Image
                  style={[{
                  width: 250,
                  height: 250,
                }, 
                styles.mb10]}
                  source={{uri: 'https://www.pngall.com/wp-content/uploads/9/Green-Tick-Vector-PNG-Images.png'}}
                />
                 <Text style={[{fontSize: normalize(24), fontWeight:'bold'}, styles.mb20]}>
                  Job Completed
                </Text>
            </View>
            <View style={[styles.mb10]}>
              <Text style={[{fontSize: normalize(18)}, styles.mb10]}>
                <Text style={[{fontSize: normalize(18), fontWeight:'bold'}]}>
                  Title:
                </Text>{"  "}
                <Text style={{fontSize: normalize(18)}}>
                  Physics Tutor Required
                </Text>
              </Text>
              <Text style={[{fontSize: normalize(18)}, styles.mb10]}>
                <Text style={[{fontSize: normalize(18), fontWeight:'bold'}]}>
                  Tutor:
                </Text>{"  "}
                <Text style={{fontSize: normalize(18)}}>Aslam Khan</Text>
              </Text>
              <Text style={[{fontSize: normalize(18)}, styles.mb10]}>
                <Text style={[{fontSize: normalize(18), fontWeight:'bold'}]}>
                  Agreed Budget:
                </Text>{"  "}
                <Text style={{fontSize: normalize(18)}}>Rs. 5000/mo</Text>
              </Text>
              <Text style={[{fontSize: normalize(18)}, styles.mb10]}>
                <Text style={[{fontSize: normalize(18), fontWeight:'bold'}]}>
                  Job Status:
                </Text>{"  "}
                <Text style={{fontSize: normalize(18)}}>Completed</Text>
              </Text>
            </View>
            <View style={[styles.mb10, {width:'100%'}]} >
              <TouchableOpacity style={[ styles.mb10, styles.button, styles.boxShadow]}>
                <Text style={{textAlign:'center', fontWeight:'bold'}}>Post Job Again</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.mb10, styles.button, styles.boxShadow]}>
                <Text style={{textAlign:'center', fontWeight:'bold'}}>Contact Tutor</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.mb10, styles.button, styles.boxShadow]} onPress={()=> navigation.goBack()}>
                <Text style={{textAlign:'center', fontWeight:'bold'}}>Go Back</Text>
              </TouchableOpacity>
            </View>
          </View>
          : ''
      }

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <TextInput
                  style={styles.input}
                  onChangeText={setCardHolderName}
                  value={cardHolderName}
                  placeholder="useless placeholder"
                  keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setCardNumber}
                    value={cardNumber}
                    placeholder="useless placeholder"
                    keyboardType="numeric"
                  />
                <TextInput
                  style={styles.input}
                  onChangeText={setCardExpiryDate}
                  value={cardExpiryDate}
                  placeholder="useless placeholder"
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={setCardCVV}
                  value={cardCVV}
                  placeholder="useless placeholder"
                  keyboardType="numeric"
                />
            </View>
          </View>
        </Modal>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
