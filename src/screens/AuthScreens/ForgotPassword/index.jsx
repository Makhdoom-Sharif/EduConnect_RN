import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import SimpleButton from '../../../components/SimpleButton';
import SocialAuthButton from '../../../components/SocialAuthButton';
import SimpleTextInput from '../../../components/SimpleTextInput';
import BackButton from '../../../components/BackButton';

import styles from './Styles';
import {useNavigation} from '@react-navigation/native';
const ForgotPassword = () => {
  const handleClick = () => {
    console.log('Click works');
  };
  const {goBack, navigate} = useNavigation();

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView>
        <BackButton onPress={goBack} />

        <Text style={styles.mainTitle}>Edu-Connect</Text>
        <View
          style={{
            justifyContent: 'center',
            height: '100%',
            // backgroundColor: 'red',
          }}>
          <Text style={styles.centerText}>Forgot Your Password ?</Text>
          <Text style={[styles.simpleTextStyle]}>Enter your email</Text>
          <SimpleTextInput placeholder="Enter Your Registered Email" />
          <Text
            style={[
              styles.simpleTextStyle,
              {textAlign: 'right', marginBottom: 10},
            ]}
            onPress={() => navigate('SignUpScreen')}>
            Don't have an account?
          </Text>
          <SimpleButton
            title="Send OTP"
            backgroundColor="#FBB718"
            textColor="#fff"
            handleClick={handleClick}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
