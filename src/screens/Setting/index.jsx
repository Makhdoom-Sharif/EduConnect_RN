// import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {buildNumber, version} from '../../../package.json';
import styles from './Styles';

const Setting = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPass] = useState('');
  const [modState, setModState] = useState('');
  const [actState, setActionSheet] = useState('');
  const [img, setImg] = useState({});
  const {navigate} = useNavigation();
  const [priority, setPriority] = useState(0);
  const updateProfile = () => {
    navigate('UpdateProfile');
  };

  const changePassword = () => {
    navigate('ChangePassword');
  };

  const openAppStoreReview = () => {};

  const aboutUs = () => {};

  const contactUS = () => {};

  const signOutApp = () => {};

  const deleteUser = () => {};
  const data = [
    {
      text: 'Update Profile',
      func: () => updateProfile(),
    },
    {
      text: 'Change Password',
      func: () => changePassword(),
    },
    {
      text: 'Leave Us A Review In The App Store',
      func: () => openAppStoreReview(),
    },
    {
      text: 'About Us',
      func: () => aboutUs(),
    },
    {
      text: 'Contact Us',
      func: () => contactUS(),
    },
    {
      text: 'Logout',
      func: () => signOutApp(),
    },
    {
      text: 'Delete Account',
      func: () => deleteUser(),
    },
  ];
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar barStyle="dark-content" />
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.main]}>
              <View style={styles.heading}>
                <Text style={styles.profText}>Settings</Text>
              </View>
              <View style={styles.centre}>
                <View
                  onStartShouldSetResponder={() => {
                    console.log('sds');
                  }}
                  style={{backgroundColor: 'red'}}>
                  <Text>dsdsdsd</Text>

                  <View style={styles.camera}>
                    <Entypo name="camera" size={20} color="#003087" />
                  </View>
                </View>
                <View
                  style={[
                    {marginTop: 16},
                    {display: 'flex', flexDirection: 'row'},
                  ]}>
                  <Text style={styles.username}>username</Text>

                  <View style={{marginRight: -10}}></View>
                </View>
              </View>
            </View>
            <View style={styles.divider}></View>
            <View style={[styles.main, styles.margTop]}>
              {data.map((item, index, arr) => {
                return (
                  <View key={index}>
                    <TouchableOpacity
                      onPress={item.func}
                      style={[
                        // whiteColorWithOpacity
                        // {backgroundColor: '#c5e0ea'},
                        styles.settingContainer,
                      ]}>
                      <View style={styles.settingItem}>
                        <View>
                          <Text
                            style={[
                              styles.textStyle,
                              styles.fntsiz,
                              arr.length - 1 === index && styles.deleteText,
                            ]}>
                            {item.text}
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <MaterialCommunityIcons
                            name="chevron-right"
                            size={35}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.divider}></View>
                  </View>
                );
              })}
            </View>
            <View
              style={{
                marginBottom: 40,
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff'}}>
                Version {version} ({buildNumber})
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};
export default Setting;
