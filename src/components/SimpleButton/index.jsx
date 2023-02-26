import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import styles from './Styles';
const SimpleButton = props => {
  const {title, backgroundColor, textColor, handleClick, loading} = props;
  return (
    <TouchableOpacity
      style={[styles.buttonStyle, {backgroundColor: backgroundColor}]}
      onPress={handleClick}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        // <Text style={styles.textStyle}>{title}</Text>
        <Text style={[styles.textStyle, {color: textColor}]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default SimpleButton;
