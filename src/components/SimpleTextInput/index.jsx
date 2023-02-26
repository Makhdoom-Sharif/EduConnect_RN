import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import styles from './Styles';
const SimpleTextInput = props => {
  const {placeholder, secureTextEntry, value, onChange, onBlur} = props;
  return (
    <TextInput
      style={styles.textFieldStyles}
      placeholder={placeholder}
      placeholderTextColor="#fff"
      secureTextEntry={secureTextEntry}
      value={value}
      // onChange={event => console.log('text', event.nativeEvent.text)}
      onBlur={onBlur}
      onChange={onChange}
    />
  );
};

export default SimpleTextInput;
