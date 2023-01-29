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
const Login = () => {
  const {goBack, navigate} = useNavigation();
  const handleClick = () => {
    console.log('Click works');
    navigate('Home');
  };

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView>
        <BackButton onPress={goBack} />
        <Text style={styles.mainTitle}>Edu-Connect</Text>
        <View
          style={{
            height: '65%',
          }}>
          <Text style={styles.centerText}>Login to your Account</Text>
          <SimpleTextInput placeholder="Username or email" />
          <SimpleTextInput placeholder="Password" secureTextEntry />
          <Text
            style={[
              styles.simpleTextStyle,
              {textAlign: 'right', marginBottom: 10},
            ]}
            onPress={() => navigate('ForgotPasswordScreen')}>
            Forgot your password?
          </Text>
          <SimpleButton
            title="Login"
            backgroundColor="#FBB718"
            textColor="#fff"
            handleClick={handleClick}
          />
          <Text style={[styles.simpleTextStyle, {textAlign: 'center'}]}>
            or log in with
          </Text>
          <SocialAuthButton />
        </View>
        <Text
          style={[
            styles.simpleTextStyle,
            {
              textAlign: 'center',
              marginVertical: 20,
            },
          ]}>
          By using Edu-Connect you agree to our Terms of services and Privacy
          Policy.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
