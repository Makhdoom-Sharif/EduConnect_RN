import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, FlatList, Image } from 'react-native';
import styles from './Styles';
import { Colors } from '../../Global/GlobalCSS';
import { RecommendedData } from '../../Global/CourseArray';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { refresh } from '../../store/action';

const RecommendTopRated = () => {

  const { accessToken, _id } = useSelector(state => state?.login);
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
      <View style={[styles.headingContainer, {width:'100%', justifyContent:'center'}]}>
        <Text style={styles.mainHeading}>Top Rated Tutors</Text>
        {/* {topTeachers && topTeachers.length > 0 && <Text style={styles.sideOption}>View All</Text> } */}
      </View>
      {
        topTeachers && topTeachers.length > 0 ?
          <FlatList
            data={topTeachers}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.container, styles.boxShadow]}>
                <View style={[styles.iconStyle, {width:'100%'}]}>
                  {
                    item.profilePicture ? 
                    <Image
                      style={[styles.profile, styles.mt20, styles.mb20]}
                      source={{uri: item.profilePicture}}
                    />
                    :
                    <EvilIcons name="image" size={100} />
                  }
                </View>
                <View style={[styles.bio, { width:'100%'}]}>
                  <Text style={[styles.nameStyle, styles.bottomGap, {textAlign:'center'}]}>
                    {item.name}
                  </Text>
                  {/* <Text style={{ color: Colors.primary, paddingBottom: 5 }}>
                    {item.modeOfTeaching}
                  // </Text> */}
                  <Text style={styles.bottomGap}>{item.bio ? item.bio : 'Bio Not available'}</Text>
                  <Text style={styles.bottomGap}>{item.highestQualification ? item.highestQualification : 'Qualification Not available'}</Text>
                  <Text style={styles.bottomGap}>{item.hourlyRate ? item.hourlyRate : 'Rate Not available'}</Text>
                  <Text style={styles.bottomGap}>{item.avgRating}</Text>
                  <View style={{ width:'100%' }}>
                    <Text style={{fontWeight:'bold'}}>Specializes in: </Text>
                    {
                      item.courses && item.courses.length>0 ? item.courses.map((item, index)=> {
                        return <Text key={index}> - {item.title}</Text>
                      })
                      :  <Text> Specialization not available </Text>
                    }
                    {/* <Text style={styles.bottomGap}>|</Text>
                    <Text>{item.expectedRatePeriod}</Text> */}
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
          :
          <View style={{ paddingBottom: 10 }}>
            <Text style={[styles.mainHeading, { fontSize: 13 }]}>
              No data available
            </Text>
          </View>
      }

    </View>
  );
};

export default RecommendTopRated;
