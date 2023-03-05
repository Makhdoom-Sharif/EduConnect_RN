import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView, Text, View
} from 'react-native';
import BackButton from '../../../components/BackButton';
import SimpleButton from '../../../components/SimpleButton';
import SimpleTextInput from '../../../components/SimpleTextInput';
import SocialAuthButton from '../../../components/SocialAuthButton';
import { useNavigation } from '@react-navigation/native';
import styles from './Styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ValidationMessage from '../../../components/ValidationMessage';
import { useDispatch } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import { loginUser } from '../../../Services/auth';
import { login } from '../../../store/action';


const Login = () => {
  const { goBack, navigate, reset } = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();


  const [loading, setLoading] = useState(false)


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().email('Not a valid email!').required('Required!'),
      password: yup
        .string()
        .required('Required!')
        .min(6, 'minimum 6 characters required!')
        .max(16, 'maximum limit reached!'),
    }),

    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const { email, password } = values;
      console.log('values', values);
      await loginUser({ email, password })
        .then(res => {
          const { user, ...others } = res.data
          const userDetails = { ...others, userID: user }
          dispatch(login(userDetails))
          resetForm();
          reset({
            index: 0,
            routes: [
              {
                name: 'Home',
              },
            ],
          });
          setLoading(false);
          toast.show('Login successfully', { type: 'success' });
        })
        .catch(err => {
          // let errorMessage =
          //   err?.response?.data?.code == 11000
          //     ? `${Object.keys(err?.response?.data?.keyValue)[0] == 'contactNo'
          //       ? 'Contact no'
          //       : Object.keys(err?.response?.data?.keyValue)[0] ==
          //       'contactNo'
          //     } is already in use.`
          //     : 'Network error';
          setLoading(false);
          // toast.show(errorMessage, { type: 'error' });
        });
    },
  });




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
          <SimpleTextInput placeholder="Email" onChange={event => {
            formik.setFieldValue('email', event.nativeEvent.text);
          }} />
          {formik.errors.email && formik.values.email.length > 0 && (
            <ValidationMessage error={formik.errors.username} />
          )}
          <SimpleTextInput placeholder="Password" secureTextEntry onChange={event => {
            formik.setFieldValue('password', event.nativeEvent.text);
          }} />
          {formik.errors.password && formik.values.password.length > 0 && (
            <ValidationMessage error={formik.errors.password} />
          )}
          <Text
            style={[
              styles.simpleTextStyle,
              { textAlign: 'right', marginBottom: 10 },
            ]}
            onPress={() => navigate('ForgotPasswordScreen')}>
            Forgot your password?
          </Text>
          <SimpleButton
            title="Login"
            backgroundColor="#FBB718"
            textColor="#fff"
            handleClick={formik.handleSubmit}
            loading={loading}
          />
          <Text style={[styles.simpleTextStyle, { textAlign: 'center' }]}>
            or log in with
          </Text>
          <SocialAuthButton />
        </View>
        {/* <Text onPress={() => navigate('SignUpScreen')} style={[styles.simpleTextStyle,{ textAlign: 'center', marginTop:0},]}>
          Not a user?  {''}
          <Text  style={{textDecorationLine: 'underline'}}>Register here</Text> 
        </Text> */}
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
