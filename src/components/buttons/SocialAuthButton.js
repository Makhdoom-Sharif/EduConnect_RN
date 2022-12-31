import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

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
const styles = StyleSheet.create({
  container: {
    height: 50,
    marginHorizontal: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 15,
  },
  btnMain: {
    backgroundColor: '#3A4859',
    width: '50%',
    justifyContent: 'center',
    flexDirection: 'row',

    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    marginLeft: 10,
  },
  socialIcon: {
    color: '#fff',
    fontSize: 25,
  },
});

export default SocialAuthButton;
