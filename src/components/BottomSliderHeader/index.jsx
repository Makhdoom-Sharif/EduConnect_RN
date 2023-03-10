import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const BottomSliderHeader = props => {
  const {title} = props;
  const {goBack} = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <Text style={{color: '#fff', marginRight: 5, fontSize: 26}}>
          {title}
        </Text>
      </View>
      <View>
        <TouchableOpacity onPress={goBack}>
          <MaterialIcons name="cancel" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomSliderHeader;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  titleStyle: {
    fontFamily: 'Helvetica',
    fontStyle: 'normal',
    fontWeight: 'bold',
    // fontSize: 12,
    fontSize: 20,
  },
});
