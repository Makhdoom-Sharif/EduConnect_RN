import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';
import SimpleButton from '../../../components/SimpleButton';
import SocialAuthButton from '../../../components/SocialAuthButton';
import SimpleTextInput from '../../../components/SimpleTextInput';
import styles from './Styles';
import SimpleDropDown from '../../../components/SimpleDropDown';
import BackButton from '../../../components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {signUpUser} from '../../../Services/auth';
import {useFormik} from 'formik';
import * as yup from 'yup';
import ValidationMessage from '../../../components/ValidationMessage';
import {useDispatch} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import logo2 from '../../../assets/logo2.png';

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const {goBack, navigate} = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      contactNo: '',
      role: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().email('Not a valid email!').required('Required!'),
      username: yup
        .string()
        .required('Required!')
        .matches(
          '^([a-zA-Z])[a-zA-Z0-9_]*$',
          'Username should not have any space or symbols',
        )
        .min(4, 'Username should be between 4 and 15 characters')
        .max(15, 'Username should be between 4 and 15 characters'),
      password: yup
        .string()
        .required('Required!')
        .min(6, 'minimum 6 characters required!')
        .max(16, 'maximum limit reached!'),
      contactNo: yup
        .string()
        .required('Required!')
        .min(4, 'Username should be between 4 and 15 characters')
        .max(15, 'Username should be between 4 and 15 characters'),
      role: yup
        .string()
        .required('Required!')
        .matches(
          '^([a-zA-Z])[a-zA-Z0-9_]*$',
          'Role should not have any space or symbols',
        ),
    }),

    onSubmit: async (values, {resetForm}) => {
      setLoading(true);
      const {email, role, contactNo, password, username} = values;
      await signUpUser({email, role, contactNo, password, username})
        .then(res => {
          resetForm();
          navigate('LoginScreen');
          setLoading(false);
          toast.show('Account created successfully', {type: 'success'});
        })
        .catch(err => {
          let errorMessage =
            err?.response?.data?.code == 11000
              ? `${
                  Object.keys(err?.response?.data?.keyValue)[0] == 'contactNo'
                    ? 'Contact no'
                    : Object.keys(err?.response?.data?.keyValue)[0] ==
                      'contactNo'
                } is already in use.`
              : 'Network error';
          setLoading(false);
          toast.show(errorMessage, {type: 'error'});
        });
    },
  });

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView>
        <BackButton onPress={goBack} />
        {/* <Text style={styles.mainTitle}>Edu-Connect</Text> */}
        <Image
          style={[
            {
              width: 400,
              height: 300,
              resizeMode: 'contain',
            },
          ]}
          source={logo2}
        />
        <View
          style={{
            height: '65%',
          }}>
          <Text style={styles.centerText}>Register!</Text>
          <SimpleTextInput
            placeholder="Email"
            onChange={event => {
              formik.setFieldValue('email', event.nativeEvent.text);
            }}
          />
          {formik.errors.email && formik.values.email.length > 0 && (
            <ValidationMessage error={formik.errors.email} />
          )}
          <SimpleTextInput
            placeholder="Username"
            onChange={event => {
              formik.setFieldValue('username', event.nativeEvent.text);
            }}
          />
          {formik.errors.username && formik.values.username.length > 0 && (
            <ValidationMessage error={formik.errors.username} />
          )}
          <SimpleTextInput
            placeholder="Password"
            secureTextEntry
            onChange={event => {
              formik.setFieldValue('password', event.nativeEvent.text);
            }}
          />
          {formik.errors.password && formik.values.password.length > 0 && (
            <ValidationMessage error={formik.errors.password} />
          )}
          <SimpleTextInput
            placeholder="Contact Number"
            onChange={event => {
              formik.setFieldValue('contactNo', event.nativeEvent.text);
            }}
          />
          {formik.errors.contactNo && formik.values.contactNo.length > 0 && (
            <ValidationMessage error={formik.errors.contactNo} />
          )}
          <SimpleDropDown
            onChangeValue={val => formik.setFieldValue('role', val)}
          />
          <SimpleButton
            title="Sign Up"
            backgroundColor="#FBB718"
            textColor="#fff"
            handleClick={formik.handleSubmit}
            loading={loading}
          />
          {/* <Text style={[styles.simpleTextStyle, { textAlign: 'center' }]}>
            or SignUp widfdfth
          </Text> */}
          {/* <SocialAuthButton /> */}
          {/* <Text style={[styles.simpleTextStyle,{ textAlign: 'center', marginTop:0},]}>
            Already a user? 
            <Text onPress={navigate('LoginScreen')} style={{textDecorationLine: 'underline'}}>Login here</Text> 
          </Text> */}
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
