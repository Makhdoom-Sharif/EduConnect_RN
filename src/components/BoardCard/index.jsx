import React from 'react';
import {TouchableOpacity, View, Text, FlatList} from 'react-native';
import styles from './Styles';
import {Colors} from '../../Global/GlobalCSS';
import {BoardArray} from '../../Global/BoardCard';

const BoardCard = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainHeading}>Select Board</Text>
      <FlatList
        data={BoardArray}
        contentContainerStyle={{
          flexDirection: 'row',
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity style={[styles.container, styles.boxShadow]}>
            <item.icon name={item.iconName} size={40} color={Colors.primary} />
            <Text style={styles.textStyles}>{item.CourseName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default BoardCard;
