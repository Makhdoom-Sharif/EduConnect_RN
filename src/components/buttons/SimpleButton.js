import React from 'react';
import {Button, StyleSheet, Text, TouchableOpacity} from 'react-native';

const SimpleButton = props => {
  const {title, backgroundColor, textColor, handleClick} = props;
  return (
    <TouchableOpacity
      style={[styles.buttonStyle, {backgroundColor: backgroundColor}]}
      onPress={handleClick}>
      <Text style={[styles.textStyle, {color: textColor}]}>Log in</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonStyle: {
    color: '#fff',
    height: 50,
    borderRadius: 7.5,
    marginHorizontal: 20,
    justifyContent: 'center',
    marginVertical: 15,
  },
  textStyle: {
    alignSelf: 'center',
    fontWeight: '700',
    fontSize: 15,
  },
});
export default SimpleButton;
