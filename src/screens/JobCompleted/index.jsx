import React, {useState} from 'react';
import {
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
  ScrollView,
  Modal,
} from 'react-native';
import {Colors, SafeAreaStyles} from '../../Global/GlobalCSS';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './Styles';
import {useNavigation} from '@react-navigation/native';
import imageTutorJob from '../../assets/payment.jpg';
export default function JobCompleted({route}) {
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

  const [paymentOptionsOpen, setPaymentOptionsOpen] = useState(false);
  const [paymentOptionsValue, setPaymentOptionsValue] = useState(null);
  const [paymentOptions, setPaymentOptions] = useState([
    {
      label: 'Credit Card',
      value: 1,
    },
  ]);

  const [jobReview, setJobReview] = useState('');
  const [cardHolderName, setCardHolderName] = useState(null);
  const [cardNumber, setCardNumber] = useState(null);
  const [cardExpiryDate, setCardExpiryDate] = useState(null);
  const [cardCVV, setCardCVV] = useState(null);

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [tutorReview, setTutorReview] = useState('');

  const initiatePayment = () => {
    console.log('working');
    if (paymentOptionsValue == 1) {
      if (
        cardHolderName &&
        cardNumber &&
        cardExpiryDate &&
        cardCVV &&
        tutorReview
      ) {
        setPaymentSuccess(true);
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
    }
  };

  const closeModal = () => {
    setPaymentSuccess(false);
    setCardHolderName(null);
    setCardNumber(null);
    setCardExpiryDate(null);
    setCardCVV(null);
    setTutorReview('');
  };

  return (
    <SafeAreaView style={SafeAreaStyles}>
      <ScrollView style={{height: '100%'}} nestedScrollEnabled={true}>
        <View style={styles.container}>
          <View style={styles.bannerImg}>
            <Image
              style={{
                width: 450,
                height: 400,
                resizeMode: 'contain',
              }}
              source={imageTutorJob}
            />
          </View>
          <View style={[styles.mb10, styles.mt30, {width: '100%'}]}>
            <Text style={[styles.textWhite, {fontSize: normalize(15)}]}>
              Select Payment Method
            </Text>
            <DropDownPicker
              style={{zIndex: 1}}
              open={paymentOptionsOpen}
              value={paymentOptionsValue}
              items={paymentOptions}
              setOpen={setPaymentOptionsOpen}
              setValue={setPaymentOptionsValue}
              setItems={setPaymentOptions}
            />
          </View>
          {paymentOptionsValue == 1 ? (
            <View style={[styles.mb10, {width: '100%'}]}>
              <View style={[styles.mb10, {width: '100%'}]}>
                <Text style={[styles.textWhite, {fontSize: normalize(15)}]}>
                  Provide Card Holder Name:
                </Text>
                <TextInput
                  style={styles.inputStyles}
                  onChangeText={setCardHolderName}
                  value={cardHolderName}
                  placeholder="e.g Muhammad Ali"
                />
              </View>

              <View style={[styles.mb10, {width: '100%'}]}>
                <Text style={[styles.textWhite, {fontSize: normalize(15)}]}>
                  Provide Card Number:
                </Text>
                <TextInput
                  style={styles.inputStyles}
                  onChangeText={setCardNumber}
                  value={cardNumber}
                  placeholder="0000 0000 0000 0000"
                  keyboardType="numeric"
                  secureTextEntry={true}
                />
              </View>

              <View style={[styles.mb10, {width: '100%'}]}>
                <Text style={[styles.textWhite, {fontSize: normalize(15)}]}>
                  Provide Card Expiry Date:
                </Text>
                <TextInput
                  style={styles.inputStyles}
                  onChangeText={setCardExpiryDate}
                  value={cardExpiryDate}
                  placeholder="MM/YY"
                  keyboardType="numeric"
                  secureTextEntry={true}
                />
              </View>

              <View style={[styles.mb10, {width: '100%'}]}>
                <Text style={[styles.textWhite, {fontSize: normalize(15)}]}>
                  Provide Card CVV:
                </Text>
                <TextInput
                  style={styles.inputStyles}
                  onChangeText={setCardCVV}
                  value={cardCVV}
                  placeholder="000"
                  keyboardType="numeric"
                  secureTextEntry={true}
                />
              </View>

              <View style={[styles.mb10, {width: '100%'}]}>
                <Text style={[styles.textWhite, {fontSize: normalize(15)}]}>
                  Provide Tutor Review:
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
                  onChangeText={text => setTutorReview(text)}
                  value={tutorReview}
                  multiline={true}
                  numberOfLines={4}
                />
              </View>

              <View style={[styles.mb10, {width: '100%'}]}>
                <TouchableOpacity
                  style={[styles.button, styles.mt20, {alignItems: 'center'}]}
                  onPress={() => initiatePayment()}>
                  <Text style={[styles.textStyles, styles.textWhite]}>Pay</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.mt10, {alignItems: 'center'}]}
                  onPress={() => navigation.goBack()}>
                  <Text style={[styles.textStyles, styles.textWhite]}>
                    Go Back
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.container}>
              <Text></Text>
            </View>
          )}
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={paymentSuccess}
          onRequestClose={() => {
            setPaymentSuccess(!paymentSuccess);
          }}>
          <View style={[styles.centeredView, {backgroundColor: Colors.white}]}>
            <View style={[styles.mb10, {width: '100%', alignItems: 'center'}]}>
              <Image
                style={[
                  {
                    width: 250,
                    height: 250,
                  },
                  styles.mb10,
                ]}
                source={{
                  uri: 'https://www.pngall.com/wp-content/uploads/9/Green-Tick-Vector-PNG-Images.png',
                }}
              />
              <Text
                style={[
                  {fontSize: normalize(24), fontWeight: 'bold'},
                  styles.mb20,
                ]}>
                Payment Successful
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.button, styles.mb20]}
              onPress={() => closeModal()}>
              <Text
                style={[
                  styles.textStyles,
                  styles.textWhite,
                  {textAlign: 'center', fontWeight: 'bold'},
                ]}>
                Go Back
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
