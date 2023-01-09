import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const Index = props => {
  const {onPress} = props;
  return (
    <View
      style={{
        backgroundColor: '#FBB718',
        width: 41,
        borderRadius: 20,
        marginHorizontal: 10,
        marginTop: 5,
      }}
      onStartShouldSetResponder={() => onPress()}>
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
