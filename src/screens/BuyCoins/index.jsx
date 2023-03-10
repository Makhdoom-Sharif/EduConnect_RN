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
  FlatList,
} from 'react-native';
import BottomSliderHeader from '../../components/BottomSliderHeader';
import {useSelector} from 'react-redux';
import styles from './Styles';
import {SafeAreaStyles} from '../../Global/GlobalCSS';
import {getCourses} from '../../backenAPICalls/coursesAPICall';
import axios from 'axios';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {Colors} from '../../Global/GlobalCSS';
import imageCoins from '../../Assets/coins.png';
export default function BuyCoins() {
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
  const [courses, setCourses] = useState();

  const [coinPackage, setCoinPackage] = useState([
    {
      label: 'Package 1',
      value: 50,
      price: 500,
    },
    {
      label: 'Package 2',
      value: 100,
      price: 800,
    },
    {
      label: 'Package 3',
      value: 150,
      price: 1250,
    },
  ]);

  // const allCoinPackages = async () => {
  //   const headers = { token: 'Bearer ' + accessToken }
  //   const res = await getCourses(headers)
  //   if (res) {
  //     console.log(res.data, 'all courses')
  //     const arr = []
  //     res.data.forEach(obj => {
  //       let data = {
  //         key: obj._id,
  //         value: obj.title
  //       }
  //       arr.push(data)
  //     });
  //     setCourses(arr)
  //   }
  // }

  const resetStates = () => {
    setCoinPackage(null);
  };

  // useEffect(() => {
  //   allCourses()
  // }, [])

  const buyCoinPackage = async () => {
    if (
      userName &&
      userBio &&
      userPayRate &&
      payByValue &&
      userQualification &&
      selected
    ) {
      let data = {};
      console.log(data);
      try {
        const res = await axios.patch(
          `https://educonnectbackend-production.up.railway.app/api/teachers/${_id}`,
          data,
          {
            headers: {
              token: 'Bearer ' + accessToken,
            },
          },
        );
        if (res) {
          Alert.alert(
            'Are your sure?',
            `Are you sure you want to buy this Package?`,
            [
              {
                text: 'Yes',
                onPress: async () => {
                  const res = await axios.patch(
                    `https://educonnectbackend-production.up.railway.app/api/bids/${bidId}`,
                    data,
                    {
                      headers: {
                        token: 'Bearer ' + accessToken,
                      },
                    },
                  );
                  if (res) {
                    Alert.alert(
                      'Success',
                      `Bid has been ${status} successfully`,
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
                    Alert.alert('Error', 'Something went wrong', [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ]);
                  }
                },
              },
              {
                text: 'No',
              },
            ],
          );
        }
      } catch (error) {
        // Alert.alert(error);
        console.log(error);
      }
    } else {
      //alert after response failure
      Alert.alert('Error', 'Please select a package to continue', [
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
      <ScrollView style={[styles.scrollView]} nestedScrollEnabled={true}>
        <View style={styles.container}>
          <BottomSliderHeader title="Buy Coins" />
          <View style={[styles.mb10, styles.mt20]}>
            <Text style={{color: '#fff', fontSize: normalize(16)}}>
              Select a Coin Package
            </Text>
          </View>
          <FlatList
            style={styles.mt20}
            data={coinPackage}
            contentContainerStyle={{
              flexDirection: 'row',
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.coins,
                  styles.boxShadow,
                  styles.mb20,
                  {marginRight: 20, backgroundColor: '#fff', borderRadius: 5},
                ]}
                onPress={() => buyCoinPackage(item)}>
                <Image style={[styles.logo, styles.mt20]} source={imageCoins} />

                <View style={[styles.coinInfo]}>
                  <Text
                    style={[
                      styles.textStyles,
                      {
                        marginLeft: 5,
                        fontSize: normalize(16),
                        fontWeight: '600',
                      },
                    ]}>
                    {item.label}
                  </Text>
                </View>

                <View style={[styles.coinInfo]}>
                  <Text
                    style={[
                      styles.textStyles,
                      styles.mb10,
                      {
                        marginLeft: 5,
                        fontSize: normalize(14),
                        fontWeight: '600',
                      },
                    ]}>
                    {item.value} Coins
                  </Text>
                </View>

                <View style={[styles.coinInfo, styles.mb20]}>
                  <Text
                    style={[
                      styles.textStyles,
                      {marginLeft: 5, fontSize: normalize(14)},
                    ]}>
                    Rs. {item.price}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />

          <View style={[styles.mb10, {width: '100%'}]}>
            <TouchableOpacity
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
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
