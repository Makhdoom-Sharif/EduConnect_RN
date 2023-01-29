import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from '../../../Global/GlobalCSS';

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.primary,
    height: '100%',
  },
  mainTitle: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '800',
    textAlign: 'center',
    margin: '10%',
  },
  centerText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginHorizontal: '20%',
    marginBottom: '10%',
  },
  simpleTextStyle: {
    color: '#fff',
    marginHorizontal: 20,
  },
});
export default styles;
