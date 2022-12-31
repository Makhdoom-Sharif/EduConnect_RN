import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import SimpleButton from '../components/buttons/SimpleButton';
import SocialAuthButton from '../components/buttons/SocialAuthButton';
import SimpleTextInput from '../components/TextFields/SimpleTextInput';

const Login = () => {
  const handleClick = () => {
    console.log('Click works');
  };
  return (
    <SafeAreaView style={styles.main}>
      <ScrollView>
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
            ]}>
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
              marginVertical: 15,
            },
          ]}>
          By using Edu-Connect you agree to our Terms of services and Privacy
          Policy.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  main: {
    backgroundColor: '#0A1A2E',
    height: '100%',
  },
  mainTitle: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '800',
    textAlign: 'center',
    margin: '15%',
  },
  centerText: {
    color: '#fff',
    fontSize: 35,
    fontWeight: '700',
    textAlign: 'center',
    marginHorizontal: '20%',
    marginBottom: '15%',
  },
  simpleTextStyle: {
    color: '#fff',
    marginHorizontal: 20,
  },
});
export default Login;
