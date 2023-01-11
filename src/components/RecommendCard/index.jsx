import React from 'react';
import {TouchableOpacity, View, Text, FlatList} from 'react-native';
import styles from './Styles';
import {Colors} from '../../Global/GlobalCSS';
import {RecommendedData} from '../../Global/CourseArray';

const RecommendCard = () => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.mainHeading}>Recommend Tutors</Text>
        <Text style={styles.sideOption}>View All</Text>
      </View>
      <FlatList
        data={RecommendedData}
        // contentContainerStyle={{
        //   flexDirection: 'row',
        // }}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity style={[styles.container, styles.boxShadow]}>
            {/* <item.icon name={item.iconName} size={40} color={Colors.primary} /> */}
            <Text style={styles.textStyles}>{item.name}</Text>
            <Text style={styles.textStyles}>{item.name}</Text>
            <Text style={styles.textStyles}>{item.name}</Text>
            <Text style={styles.textStyles}>{item.name}</Text>
            <Text style={styles.textStyles}>{item.name}</Text>

            <Text style={styles.textStyles}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default RecommendCard;
