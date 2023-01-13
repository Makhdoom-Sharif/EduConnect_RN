import React from 'react';
import {TouchableOpacity, View, Text, FlatList} from 'react-native';
import styles from './Styles';
import {Colors} from '../../Global/GlobalCSS';
import {RecommendedData} from '../../Global/CourseArray';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
const RecommendCard = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.mainHeading}>Recommend Tutors</Text>
        <Text style={styles.sideOption}>View All</Text>
      </View>
      <FlatList
        data={RecommendedData}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity style={[styles.container, styles.boxShadow]}>
            <View style={styles.iconStyle}>
              <EvilIcons name="image" size={100} />
            </View>
            <View style={styles.bio}>
              <Text style={[styles.nameStyle, styles.bottomGap]}>
                {item.name}
              </Text>
              <Text style={{color: Colors.primary, paddingBottom: 5}}>
                {item.modeOfTeaching}
              </Text>
              <Text style={styles.bottomGap}>{item.preferredBoardToTeach}</Text>
              <Text style={styles.bottomGap}>{item.preferredClassToTeach}</Text>
              <Text style={styles.bottomGap}>{item.address}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text>{item.expectedRates}</Text>
                <Text style={styles.bottomGap}>|</Text>
                <Text>{item.expectedRatePeriod}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default RecommendCard;
