import React, { useState, useEffect } from 'react';
import {TouchableOpacity, View, Text, FlatList} from 'react-native';
import styles from './Styles';
import {Colors, whiteColorWithOpacity} from '../../Global/GlobalCSS';
import {JobArray} from '../../Global/JobArray';
import {useNavigation} from '@react-navigation/native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';


const JobCard = ({ userJobsArray }) => {
  const {navigate} = useNavigation();
  const {accessToken, _id} = useSelector(state => state?.login);


  const onJobSelect = (job) => {
    if(userJobsArray){
      navigate('TutorJobs', {
        jobId: job.id,
        jobName: job.jobName,
        jobLogo: job.logo,
      });
    }
    else{
      navigate('SelectJob', job)
    }
  }

  const [userJobs, setUserJobs] = useState()

  const allUserJobs = async () => {
    console.log('Bearer ' + accessToken)
    console.log(_id)
      const headers = { token: 'Bearer ' + accessToken }
      const res = await axios({
        method: 'get',
        url: `https://educonnectbackend-production.up.railway.app/api/jobs/${_id}`,
        headers: headers
      });
      if(res){
        setUserJobs(res.data)
      }
      console.log(res.data, 'all user jobs')
    }
  
    useEffect(() => {
      allUserJobs()
    }, [])
  


  return (
    <View style={[styles.mainContainer]}>
      <Text style={styles.mainHeading}>
      {userJobsArray ? 'Your Jobs' : 'Available Jobs'}
      </Text>
      <FlatList
        data={userJobsArray ? userJobsArray : userJobs}
        contentContainerStyle={{
          flexDirection: 'row',
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity 
          style={[styles.container, styles.boxShadow, {position:'relative'}]} 
          onPress={() => onJobSelect(item)}
          >
            {
              userJobsArray ? 
              <>
                <item.icon name={item.iconName} size={40} color={Colors.primary} />
                <Text style={styles.textStyles}>{item.jobName}</Text>
                { item.hasUpdate &&
                  <View style={styles.notification}>
                      <Text style={{fontWeight:'bold', textAlign:'center'}}> 1 </Text>                    
                  </View> 
                }
              </>
            :
              <>
                <Icon name="book" size={30} color={Colors.primary} />
                <Text style={styles.textStyles}>{item.description.substring(0, 15).concat('...')}</Text>
                <Text style={[styles.textStyles, {fontSize:13}]}>{item.course.title}</Text>
                <Text style={[styles.textStyles, {backgroundColor:Colors.secondary, marginTop:5, 
                  paddingVertical:2, paddingHorizontal:10, borderRadius:5, fontSize:14, fontWeight:'bold'}]}>
                  Rs.{item.jobBudget}</Text>
              </>
            
            }
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default JobCard;
