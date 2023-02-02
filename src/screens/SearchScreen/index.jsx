// import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import {Colors} from '../../Global/GlobalCSS';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SearchFactor from '../../components/SearchFactor';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
const SearchScreen = props => {
  return (
    <View style={{backgroundColor: Colors.primary, height: '100%'}}>
      <SafeAreaView>
        <View style={{marginVertical: 10}}>
          <SearchFactor
            title={'Tuition Type'}
            option1={'Online'}
            option2={'Offline'}
            icon={{Icon: FontAwesome5, name: 'chalkboard-teacher'}}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <SearchFactor
            title={'Tutor Gender'}
            option1={'Male'}
            option2={'Female'}
            icon={{Icon: MaterialCommunityIcons, name: 'gender-male-female'}}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <SearchFactor
            title={'Tuition Language'}
            option1={'Urdu'}
            option2={'English'}
            icon={{Icon: MaterialIcons, name: 'language'}}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <SearchFactor
            title={'Syllabus Type'}
            option1={'BISE'}
            option2={'Cambridge'}
            icon={{Icon: Entypo, name: 'open-book'}}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
export default SearchScreen;
