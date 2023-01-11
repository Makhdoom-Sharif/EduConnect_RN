import React from 'react';
import {TouchableOpacity, View, Text, FlatList} from 'react-native';
import styles from './Styles';
import {Colors, whiteColorWithOpacity} from '../../Global/GlobalCSS';
import {CourseArray} from '../../Global/CourseArray';

const CourseCard = () => {
  return (
    <View style={[styles.mainContainer]}>
      <Text style={styles.mainHeading}>Select Course</Text>
      <FlatList
        data={CourseArray}
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

export default CourseCard;
