import React from 'react';
import {Text} from 'react-native';
// import {Text} from 'native-base';
import styles from './style';
export default function index(props) {
  return (
    <Text style={[styles.valerr, props.color && {color: props.color}]}>
      {props.error}
    </Text>
  );
}
