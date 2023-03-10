import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, FlatList } from 'react-native';
import styles from './Styles';
import { Colors } from '../../Global/GlobalCSS';
import { BoardArray } from '../../Global/BoardCard';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { refresh } from '../../store/action';

const TopRatedTutors = () => {
  const { accessToken, _id } = useSelector(state => state?.login);
  const refreshState = useSelector(state => state?.refresh);
  const dispatch = useDispatch()

  const [topTeachers, setTopTeachers] = useState(null)

  const getTopRatedTeachers = async () => {
    // console.log('Bearer ' + accessToken)
    const headers = { token: 'Bearer ' + accessToken }
    const res = await axios.get('https://educonnectbackend-production.up.railway.app/api/ratings/top-rated', headers)
    if (res) {
      setTopTeachers(res.data)
      dispatch(refresh(false))
    }
    console.log(res.data, 'top rated teachers')
  }


  useEffect(() => {
    getTopRatedTeachers()
  }, [])

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainHeading}>Top Rated Tutors</Text>
      {
        topTeachers && topTeachers.length > 0 ?
        <FlatList
          data={topTeachers}
          contentContainerStyle={{
            flexDirection: 'row',
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={[styles.container, styles.boxShadow]}>
              <item.icon name={item.iconName} size={40} color={Colors.primary} />
              <Text style={styles.textStyles}>{item.CourseName}</Text>
            </TouchableOpacity>
          )}
        />
        :
        <View style={{ paddingBottom: 10 }}>
          <Text style={[styles.mainHeading, { fontSize: 13 }]}>
            No tutor available
          </Text>
        </View>
      }

    </View>
  );
};

export default TopRatedTutors;
