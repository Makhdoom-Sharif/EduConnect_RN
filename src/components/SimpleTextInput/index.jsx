import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import styles from './Styles';
const SimpleTextInput = props => {
  const {placeholder, secureTextEntry} = props;
  return (
    <TextInput
      style={styles.textFieldStyles}
      placeholder={placeholder}
      placeholderTextColor="#fff"
      secureTextEntry={secureTextEntry}
    />
  );
};

export default SimpleTextInput;
