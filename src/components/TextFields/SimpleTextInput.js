import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

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
const styles = StyleSheet.create({
  textFieldStyles: {
    color: '#fff',
    backgroundColor: '#3A4859',
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 7.5,
    height: 50,
    paddingHorizontal: 15,
  },
});
export default SimpleTextInput;
