import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import {Colors} from '../../Global/GlobalCSS';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const SearchFactor = props => {
  const {title, option1, option2, icon} = props;
  return (
    <View
      style={{
        backgroundColor: Colors.backgroundPrimary,
        marginHorizontal: 10,
        borderRadius: 15,
        padding: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <icon.Icon name={icon.name} size={25} />
        <Text style={{fontSize: 20, fontWeight: '700', marginHorizontal: 20}}>
          {title}
        </Text>
      </View>
      <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
        <View
          style={{
            backgroundColor: '#fff',
            marginHorizontal: 10,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 25,
          }}>
          <Text>{option1}</Text>
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            marginHorizontal: 10,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 25,
          }}>
          <Text>{option2}</Text>
        </View>
      </View>
    </View>
  );
};

export default SearchFactor;
