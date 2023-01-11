import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  main: {
    marginLeft: 28,
    marginRight: 28,
  },
  profText: {
    fontFamily: 'Helvetica',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 22,
    lineHeight: 28,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centre: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    marginTop: 10,
    borderRadius: 100,
    resizeMode: 'cover',
    opacity: 0.5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  username: {
    fontFamily: 'Helvetica',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 3,
  },
  margTop: {
    marginTop: 0,
    marginBottom: 10,
  },
  fntsiz: {
    fontSize: 14,
  },
  deleteText: {
    color: 'red',
  },
  camera: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  img: {
    marginLeft: -18,
    color: '#BDBDBD',
  },
  divider: {
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#E0E0E0',
    marginTop: 24,
    marginBottom: 24,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: 'Helvetica',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default styles;
