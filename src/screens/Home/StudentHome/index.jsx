import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
const StudentHome = () => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#0A1A2E',
        width: '100%',
        height: '100%',
      }}>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#FBB718',
            width: '70%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 5,
            borderRadius: 20,
            alignItems: 'center',
          }}>
          <MaterialIcons
            name="location-on"
            size={25}
            style={{
              color: '#fff',
            }}
          />
          <Text style={{color: '#fff'}}>Select The Location</Text>
          <Entypo name="chevron-down" style={{color: '#fff'}} size={25} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StudentHome;
