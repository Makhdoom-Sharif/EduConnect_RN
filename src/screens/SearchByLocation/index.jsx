import React, {useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet, 
  Text, 
  TextInput, 
  View,
  Image,
  TouchableOpacity,
  PixelRatio,
  Dimensions,
  Platform,
  ScrollView,
  SafeAreaView,
  Alert
} from 'react-native';
import BottomSliderHeader from '../../components/BottomSliderHeader';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../Global/GlobalCSS';
import {preferedRegions} from '../../Global/CourseArray';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { SelectList } from 'react-native-dropdown-select-list'
import { useNavigation } from '@react-navigation/native';
import { tutorsByLocation } from '../../store/action';
import styles from '../SelectCourse/Styles';


export default function SearchByLocation() {
  const navigation = useNavigation()
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
  const [locationList, setLocationList] = useState([
    {
      label: "Clifton",
      value: "Clifton"
    },
    {
      label: "Defence Housing Authority (DHA)",
      value: "Defence Housing Authority (DHA)"
    },
    {
      label: "Gulshan-e-Iqbal",
      value: "Gulshan-e-Iqbal"
    },
    {
      label: "North Nazimabad",
      value: "North Nazimabad"
    },
    {
      label: "Gulistan-e-Jauhar",
      value: "Gulistan-e-Jauhar"
    },
    {
      label: "Tariq Road",
      value: "Tariq Road"
    },
    {
      label: "Saddar",
      value: "Saddar"
    },
    {
      label: "PECHS",
      value: "PECHS"
    },
    {
      label: "Bahadurabad",
      value: "Bahadurabad"
    },
    {
      label: "Nazimabad",
      value: "Nazimabad"
    },
    {
      label: "Korangi",
      value: "Korangi"
    },
    {
      label: "Malir",
      value: "Malir"
    },
    {
      label: "Karachi Cantonment",
      value: "Karachi Cantonment"
    },
    {
      label: "Jamshed Road",
      value: "Jamshed Road"
    },
    {
      label: "Liaquatabad",
      value: "Liaquatabad"
    },
    {
      label: "FB Area",
      value: "FB Area"
    },
  ])

  const [location, setLocation] = useState(null)

  const searchTutorsByLocation = () => {
    console.log(location,'search lcoation')
    dispatch(tutorsByLocation(location))
    navigation.navigate('Home')
  }

  return (
    <View
      style={{
        paddingTop: 25,
        backgroundColor: Colors.background,
        height: '100%',
      }}>
      <View style={styles.container}>
        <BottomSliderHeader title="Search By Location" />
        {/* <View
          style={{
            marginHorizontal: 5,
            borderColor: Colors.black,
            borderWidth: 1,
            borderRadius: 15,
            height: 35,
            paddingHorizontal: 10,
            paddingVertical: 5,
            flexDirection: 'row',
            backgroundColor: Colors.backgroundPrimary,
            marginVertical: 25,
          }}>
          <FontAwesome5 name="search" size={20} />
          <TextInput
            placeholder="Type a location, city or area"
            style={{
              height: '90%',
              alignSelf: 'center',
              width: '90%',
              marginHorizontal: 7,
            }}
          />
        </View> */}
        <View style={{ width: '100%', marginBottom:20, marginTop:20 }}>
          <SelectList
            boxStyles={{ backgroundColor: '#fff' }}
            dropdownStyles={{ backgroundColor: '#fff' }}
            setSelected={(val) => setLocation(val)}
            data={locationList}
            save="value"
          />
        </View>
        <View style={{width:'100%'}}>
          <TouchableOpacity
            style={[styles.mb10, styles.button, styles.boxShadow]}
            onPress={() => searchTutorsByLocation()}
            disabled={!location}
            >
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
              Search Tutors
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <MaterialIcons
            name={currentLocation ? 'my-location' : 'location-searching'}
            size={25}
            style={{color: Colors.secondary}}
            onPress={() => setCurrentLocatio(prev => !prev)}
          />
          <Text
            style={{
              fontSize: 18,
              color: Colors.secondary,
              marginHorizontal: 5,
            }}>
            Use current location
          </Text>
        </View> */}
        {/* <View
          style={{
            backgroundColor: Colors.backgroundPrimary,
            borderRadius: 15,
            height: 30,
            marginVertical: 25,
            justifyContent: 'center',
            paddingHorizontal: 5,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Helvetica',
              fontStyle: 'normal',
              fontWeight: 'bold',
            }}>
            Choose Region
          </Text>
        </View>
        <FlatList
          data={preferedRegions}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 10,
                  alignItems: 'center',
                }}>
                <MaterialIcons
                  name="location-on"
                  size={25}
                  style={{
                    color: Colors.white,
                  }}
                />
                <Text style={{fontSize: 18}}>{item.title}</Text>
                <MaterialCommunityIcons name="chevron-right" size={35} />
              </View>
            );
          }}
        /> */}
      </View>
    </View>
  );
}
// const styles = StyleSheet.create({
//   container: {
//     marginLeft: 28,
//     marginRight: 28,
//   },
// });
