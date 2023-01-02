import React from 'react';
import {Button, StyleSheet, Text, TouchableOpacity} from 'react-native';
import styles from './Styles';
const SimpleButton = props => {
  const {title, backgroundColor, textColor, handleClick} = props;
  return (
    <TouchableOpacity
      style={[styles.buttonStyle, {backgroundColor: backgroundColor}]}
      onPress={handleClick}>
      <Text style={[styles.textStyle, {color: textColor}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SimpleButton;
