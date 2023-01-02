import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './Styles';
const SocialAuthButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.btnMain,
          {
            borderTopLeftRadius: 7.5,
            borderBottomLeftRadius: 7.5,
            marginRight: 1,
          },
        ]}>
        <Icon name="google" style={styles.socialIcon} />
        <Text style={styles.btnText}>Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.btnMain,
          {borderTopRightRadius: 7.5, borderBottomRightRadius: 7.5},
        ]}>
        <Icon name="facebook-square" style={styles.socialIcon} />

        <Text style={styles.btnText}>Facebook</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SocialAuthButton;
