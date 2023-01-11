import React from 'react';
import {View, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './Styles';
import {Colors} from '../../Global/GlobalCSS';

const SearchLocation = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons
        name="location-on"
        size={25}
        style={{
          color: Colors.white,
        }}
      />
      <Text style={styles.textColor}>Select The Location</Text>
      <Entypo name="chevron-down" style={styles.textColor} size={25} />
    </View>
  );
};

export default SearchLocation;
