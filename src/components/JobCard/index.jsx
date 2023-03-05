import React, { useState, useEffect } from 'react';
import {TouchableOpacity, View, Text, FlatList} from 'react-native';
import styles from './Styles';
import {Colors, whiteColorWithOpacity} from '../../Global/GlobalCSS';
import {JobArray} from '../../Global/JobArray';
import {useNavigation} from '@react-navigation/native';
import { useSelector } from 'react-redux';
import axios from 'axios';

const JobCard = ({ userJobsArray }) => {
  const {navigate} = useNavigation();

  const onJobSelect = (job) => {
    if(userJobsArray){
      navigate('TutorJobs', {
        jobId: job.id,
        jobName: job.jobName,
        jobLogo: job.logo,
      });
    }
    else{
      navigate('SelectJob',{
        jobId: job.id,
        jobName: job.jobName,
        jobLogo: job.logo,
      })
    }
  }

  const [userJobs, setUserJobs] = useState()
  const {accessToken, _id} = useSelector(state => state?.login);

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
        data={userJobsArray !=undefined ? userJobsArray : userJobs}
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
                <Icon name="male" size={30} color={Colors.primary} />
                <Text style={styles.textStyles}>{item.title}</Text>
              </>
            
            }
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default JobCard;
