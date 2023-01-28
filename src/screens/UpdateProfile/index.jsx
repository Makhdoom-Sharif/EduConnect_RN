import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import BottomSliderHeader from '../../components/BottomSliderHeader';
export default function UpdateProfile() {
  return (
    <View style={{paddingTop: 25}}>
      <View style={styles.container}>
        <BottomSliderHeader title="Update Profile" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginLeft: 28,
    marginRight: 28,
  },
});
