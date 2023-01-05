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
const ResetPassword = () => {
  const handleClick = () => {
    console.log('Click works');
  };
  return (
    <SafeAreaView style={styles.main}>
      <ScrollView>
        <BackButton />
        <Text style={styles.mainTitle}>Edu-Connect</Text>
        <View
          style={{
            justifyContent: 'center',
            height: '100%',
          }}>
          <Text style={styles.centerText}>Reset Password</Text>
          <SimpleTextInput placeholder="Enter New Password" secureTextEntry />
          <SimpleTextInput placeholder="Confirm Password" secureTextEntry />
          <SimpleButton
            title="Reset"
            backgroundColor="#FBB718"
            textColor="#fff"
            handleClick={handleClick}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPassword;
