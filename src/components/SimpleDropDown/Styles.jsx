import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  dropDownMain: {
    marginHorizontal: 20,
    width: width - 40,
    backgroundColor: '#3A4859',
    borderColor: 'transparent',
    marginVertical: 5,
  },
  dropDownContainer: {
    marginHorizontal: 20,
    backgroundColor: '#3A4859',
    width: width - 40,
  },
  dropDownLabel: {color: '#fff'},
});
export default styles;
