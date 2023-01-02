import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import SimpleButton from '../../components/SimpleButton';
import SocialAuthButton from '../../components/SocialAuthButton';
import SimpleTextInput from '../../components/SimpleTextInput';
import styles from './Styles';
const LandingScreen = () => {
  const handleClick = () => {
    console.log('Click works');
  };
  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.mainTitle}>Edu-Connect</Text>
      <View style={styles.bottomContainer}>
        <Text style={styles.centerText}>Learn Everything You Want </Text>
        <View style={styles.divider} />
        <Text style={[styles.simpleTextStyle]}>
          The Fast, Fun and effective way to learn and grow
        </Text>
      </View>
      <View style={{marginVertical: 20}}>
        <SimpleButton
          title="Get started for free"
          backgroundColor="#FBB718"
          textColor="#fff"
          handleClick={handleClick}
        />
        <SimpleButton
          title="I already have an account"
          backgroundColor="#fff"
          textColor="#000"
          handleClick={handleClick}
        />
      </View>
    </SafeAreaView>
  );
};

export default LandingScreen;
