import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import BottomSliderHeader from '../../components/BottomSliderHeader';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../Global/GlobalCSS';
import {preferedRegions} from '../../Global/CourseArray';
export default function SearchByLocation() {
  const [currentLocation, setCurrentLocatio] = useState(false);
  return (
    <View
      style={{
        paddingTop: 25,
        backgroundColor: Colors.background,
        height: '100%',
      }}>
      <View style={styles.container}>
        <BottomSliderHeader title="Search By Location" />
        <View
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
        </View>
        <View
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
        </View>
        <View
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
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginLeft: 28,
    marginRight: 28,
  },
});
