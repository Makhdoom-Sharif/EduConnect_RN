import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, Text, View, Image} from 'react-native';
import SimpleButton from '../../../components/SimpleButton';
import styles from './Styles';
import imageLogo from '../../../Assets/logo2.png';
const LandingScreen = () => {
  const handleClick = () => {
    console.log('Click works');
  };

  const {navigate} = useNavigation();
  return (
    <SafeAreaView style={styles.main}>
      {/* <Text style={styles.mainTitle}>Edu-Connect</Text> */}
      <Image
        style={[
          {
            width: 400,
            height: 300,
            resizeMode: 'contain',
          },
        ]}
        source={imageLogo}
      />
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
          handleClick={() => navigate('SignUpScreen')}
          // handleClick={() => navigate('Home')}
        />
        <SimpleButton
          title="I already have an account"
          backgroundColor="#fff"
          textColor="#000"
          handleClick={() => navigate('LoginScreen')}
        />
      </View>
    </SafeAreaView>
  );
};

export default LandingScreen;
