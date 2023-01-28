import React from 'react';
import {StyleSheet, View} from 'react-native';
import BottomSliderHeader from '../../components/BottomSliderHeader';
export default function ChangePassword() {
  return (
    <View style={{paddingTop: 25}}>
      <View style={styles.container}>
        <BottomSliderHeader title="Change Password" />
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
