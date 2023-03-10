import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, FlatList } from 'react-native';
import styles from './Styles';
import { Colors, whiteColorWithOpacity } from '../../Global/GlobalCSS';
import { JobArray } from '../../Global/JobArray';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';


const JobCard = ({ teacherJobsArray }) => {
  const { navigate } = useNavigation();
  const { accessToken, _id } = useSelector(state => state?.login);
  const refreshState = useSelector(state => state?.refresh);

  
  useEffect(() => {
    availableJobs()
  }, [refreshState])


  const [allAvailableJobs, setAllAvailableJobs] = useState(null)
  console.log(teacherJobsArray, 'teacher job')
  const onJobSelect = (job, id) => {
    if (id == 1) {
      navigate('TutorJobs', job);
    }
    else {
      navigate('SelectJob', job)
    }
  }

  const availableJobs = async () => {
    console.log('Bearer ' + accessToken)
    console.log(_id)
    const headers = { token: 'Bearer ' + accessToken }
    const res = await axios({
      method: 'get',
      url: `https://educonnectbackend-production.up.railway.app/api/jobs/${_id}`,
      headers: headers
    });
    if (res) {
      setAllAvailableJobs(res.data)
    }
    console.log(res.data, 'all available jobs')
  }


  return (
    <View>
      <View style={[styles.mainContainer, { marginBottom: 20 }]}>
        {
          teacherJobsArray ?
            <>
              <Text style={styles.mainHeading}>
                Your Jobs
              </Text>
              <FlatList
                data={teacherJobsArray}
                contentContainerStyle={{
                  flexDirection: 'row',
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[styles.container, styles.boxShadow, { position: 'relative' }]}
                    onPress={() => onJobSelect(item, 1)}
                  >
                    {
                      //  teacherJobsArray ?
                        // <>
                        //    <Icon name="book" size={30} color={Colors.primary} />
                        //   <Text style={styles.textStyles}>{item.jobName}</Text>
                        //   {item.hasUpdate &&
                        //     <View style={styles.notification}>
                        //       <Text style={{ fontWeight: 'bold', textAlign: 'center' }}> 1 </Text>
                        //     </View>
                        //   }
                        // </>
                        // :
                        <>
                          <Icon name="book" size={30} color={Colors.primary} />
                          <Text style={styles.textStyles}>{item.description.substring(0, 15).concat('...')}</Text>
                          <Text style={[styles.textStyles, { fontSize: 13 }]}>{item.course.title}</Text>
                          <Text style={[styles.textStyles, {
                            backgroundColor: Colors.secondary, marginTop: 5,
                            paddingVertical: 2, paddingHorizontal: 10, borderRadius: 5, fontSize: 14, fontWeight: 'bold'
                          }]}>
                            Rs.{item.jobBudget}</Text>
                            <Text style={[styles.textStyles, {
                            backgroundColor: Colors.secondary, marginTop: 5,
                            paddingVertical: 2, paddingHorizontal: 10, borderRadius: 5, fontSize: 14, fontWeight: 'bold'
                          }]}>
                            {item.status}</Text>
                        </>

                    }
                  </TouchableOpacity>
                )}
              />
            </>
            :
            <View style={{paddingBottom: 10}}>
              <Text style={styles.mainHeading}>
                Your Jobs
              </Text>
              <Text style={[styles.mainHeading, { fontSize: 13 }]}>
                No jobs selected
              </Text>
            </View>
           
        }
      </View>


      <View style={[styles.mainContainer, { marginBottom: 20 }]}>
        {
          allAvailableJobs ?
            <>
              <Text style={styles.mainHeading}>
                Available Jobs
              </Text>
              <FlatList
                data={allAvailableJobs}
                contentContainerStyle={{
                  flexDirection: 'row',
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[styles.container, styles.boxShadow, { position: 'relative' }]}
                    onPress={() => onJobSelect(item, 2)}
                  >
                    {/* {
                      // allAvailableJobs ?
                      //   <>
                      //     <item.icon name={item.iconName} size={40} color={Colors.primary} />
                      //     <Text style={styles.textStyles}>{item.jobName}</Text>
                      //     {item.hasUpdate &&
                      //       <View style={styles.notification}>
                      //         <Text style={{ fontWeight: 'bold', textAlign: 'center' }}> 1 </Text>
                      //       </View>
                      //     }
                      //   </>
                      //   :
                        

                    } */}
                    <>
                      <Icon name="book" size={30} color={Colors.primary} />
                      <Text style={styles.textStyles}>{item.description ? item.description.substring(0, 15).concat('...') : item.discription.substring(0, 15).concat('...')}</Text>
                      <Text style={[styles.textStyles, { fontSize: 13 }]}>{item.course.title}</Text>
                      <Text style={[styles.textStyles, {
                        backgroundColor: Colors.secondary, marginTop: 5,
                        paddingVertical: 2, paddingHorizontal: 10, borderRadius: 5, fontSize: 14, fontWeight: 'bold'
                      }]}>
                        Rs.{item.jobBudget}</Text>
                    </>
                  </TouchableOpacity>
                )}
              />
            </>
            :
            <View style={{paddingBottom: 10}}>
              <Text style={styles.mainHeading}>
                Available Jobs
              </Text>
              <Text style={[styles.mainHeading, { fontSize: 13 }]}>
                No job available
              </Text>
          </View>

        }
      </View>
    </View>
  );
};

export default JobCard;
