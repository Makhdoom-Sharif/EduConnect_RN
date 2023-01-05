import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const Index = () => {
  return (
    <View
      style={{
        backgroundColor: '#FBB718',
        width: 41,
        borderRadius: 20,
        marginHorizontal: 10,
        marginTop: 5,
      }}>
      <Icon
        name="leftcircleo"
        style={{
          fontSize: 40,
          color: '#fff',
        }}
      />
    </View>
  );
};

export default Index;
