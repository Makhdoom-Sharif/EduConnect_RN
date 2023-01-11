// import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Image, ScrollView, StatusBar, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {buildNumber, version} from '../../../package.json';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './Styles';
const Setting = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPass] = useState('');
  const [modState, setModState] = useState('');
  const [actState, setActionSheet] = useState('');
  const [img, setImg] = useState({});
  const navigation = useNavigation();
  const [priority, setPriority] = useState(0);
  const changeProfile = () => {};

  const changePassword = () => {};

  const openAppStoreReview = () => {};

  const aboutUs = () => {};

  const contactUS = () => {};

  const signOutApp = () => {};

  const deleteUser = () => {};
  const data = [
    {
      text: 'Change Profile',
      func: () => changeProfile(),
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
    <>
      <View
        style={{
          flex: 1,
        }}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View safeArea>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.main]}>
              <View style={styles.heading}>
                <Text style={styles.profText}>Settings</Text>
              </View>
              <View style={styles.centre}>
                <View>
                  <Image
                    source={
                      // user?.userDetail?.dp ? {uri: user.userDetail.dp} : Profile
                      ''
                    }
                    width={100}
                    height={100}
                    style={styles.avatar}
                    alt="profile"
                  />
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
                    <TouchableOpacity onPress={item.func}>
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
              <Text style={{color: 'grey'}}>
                Version {version} ({buildNumber})
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};
export default Setting;
// const styles = StyleSheet.create({
//   main: {
//     marginLeft: 28,
//     marginRight: 28,
//   },
//   profText: {
//     fontFamily: 'Helvetica',
//     fontStyle: 'normal',
//     fontWeight: 'bold',
//     fontSize: 22,
//     lineHeight: 28,
//   },
//   heading: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   centre: {
//     justifyContent: 'center',
//     alignContent: 'center',
//     alignItems: 'center',
//   },
//   avatar: {
//     marginTop: 10,
//     borderRadius: 100,
//     resizeMode: 'cover',
//     opacity: 0.5,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   username: {
//     fontFamily: 'Helvetica',
//     fontStyle: 'normal',
//     fontWeight: 'bold',
//     fontSize: 16,
//     marginRight: 3,
//   },
//   margTop: {
//     marginTop: 0,
//     marginBottom: 10,
//   },
//   fntsiz: {
//     fontSize: 14,
//   },
//   deleteText: {
//     color: 'red',
//   },
//   camera: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     zIndex: 9999,
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100%',
//   },
//   img: {
//     marginLeft: -18,
//     color: '#BDBDBD',
//   },
//   divider: {
//     borderWidth: 0.5,
//     borderStyle: 'solid',
//     borderColor: '#E0E0E0',
//     marginTop: 24,
//     marginBottom: 24,
//   },
//   settingItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   textStyle: {
//     fontFamily: 'Helvetica',
//     fontStyle: 'normal',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });
