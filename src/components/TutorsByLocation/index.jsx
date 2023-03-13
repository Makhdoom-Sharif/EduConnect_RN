import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, FlatList, Image } from 'react-native';
import styles from './Styles';
import { Colors } from '../../Global/GlobalCSS';
import { RecommendedData } from '../../Global/CourseArray';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { refresh } from '../../store/action';

const TutorsByLocation = () => {

  const { accessToken, _id } = useSelector(state => state?.login);
  const userLocation = useSelector(state => state?.tutorsByLocation);
  console.log(userLocation, 'location at tutor')
  const dispatch = useDispatch()

  const [teachers, setTeachers] = useState(null)

  const getTeachersByLocation = async () => {
    // console.log('Bearer ' + accessToken)
    const headers = { token: 'Bearer ' + accessToken }
    console.log(userLocation, 'user location')
    if (userLocation) {
      const res = await axios.get(`https://educonnectbackend-production.up.railway.app/api/teachers/location/${userLocation}`, headers)
      if (res) {
        setTeachers(res.data)
        // dispatch(refresh(true))
      }
      console.log(res.data, 'tutors by location')
    }
  }


  useEffect(() => {
    getTeachersByLocation()
    console.log('ran')
  }, [userLocation])


  return (
    <View style={[userLocation ? styles.mainContainer : null]}>
      {
        teachers && teachers.length > 0 ?
          <View style={styles.mainContainer}>
            <View style={[styles.headingContainer, { width: '100%', justifyContent: 'center' }]}>
              <Text style={[styles.mainHeading]}>Tutors in {userLocation}</Text>
            </View>
            <FlatList
              data={teachers}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity style={[styles.container, styles.boxShadow]}>
                  <View style={[styles.iconStyle, { width: '100%' }]}>
                    {
                      item.profilePicture ?
                        <Image
                          style={[styles.profile, styles.mt20, styles.mb20]}
                          source={{ uri: item.profilePicture }}
                        />
                        :
                        <EvilIcons name="image" size={100} />
                    }
                  </View>
                  <View style={[styles.bio, { width: '100%' }]}>
                    <Text style={[styles.nameStyle, styles.bottomGap, { textAlign: 'center' }]}>
                      {item.name}
                    </Text>
                    {/* <Text style={{ color: Colors.primary, paddingBottom: 5 }}>
                    {item.modeOfTeaching}
                  // </Text> */}
                    <Text style={styles.bottomGap}>{item.bio ? item.bio : 'Bio Not available'}</Text>
                    <Text style={styles.bottomGap}>{item.highestQualification ? item.highestQualification : 'Qualification Not available'}</Text>
                    <Text style={styles.bottomGap}>{item.hourlyRate ? item.hourlyRate : 'Rate Not available'}</Text>
                    <Text style={styles.bottomGap}>{item.avgRating}</Text>
                    <View style={{ width: '100%' }}>
                      <Text style={{ fontWeight: 'bold' }}>Specializes in: </Text>
                      {
                        item.courses && item.courses.length > 0 ? item.courses.map((item, index) => {
                          return <Text key={index}> - {item.title}</Text>
                        })
                          : <Text> Specialization not available </Text>
                      }
                      {/* <Text style={styles.bottomGap}>|</Text>
                    <Text>{item.expectedRatePeriod}</Text> */}
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          :
          <View style={{ paddingBottom: 10 }}>
            <Text style={[styles.mainHeading, { fontSize: 16, textAlign:'center' }]}>
            No tutor available in {userLocation}
            </Text>
        </View>
      }
    </View>
  );
};

export default TutorsByLocation;
