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
import styles from './Styles';
import SimpleDropDown from '../../../components/SimpleDropDown';
import BackButton from '../../../components/BackButton';
import {useNavigation} from '@react-navigation/native';

const SignUp = () => {
  const handleClick = () => {
    // navigate('Home')
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
            height: '65%',
          }}>
          <Text style={styles.centerText}>Register!</Text>
          <SimpleTextInput placeholder="Username or email" />
          <SimpleTextInput placeholder="Password" secureTextEntry />
          <SimpleTextInput placeholder="Confirm Password" secureTextEntry />
          <SimpleDropDown />
          <SimpleButton
            title="Sign Up"
            backgroundColor="#FBB718"
            textColor="#fff"
            handleClick={handleClick}
          />
          <Text style={[styles.simpleTextStyle, {textAlign: 'center'}]}>
            or SignUp with
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

export default SignUp;
