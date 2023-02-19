import React from 'react';
import {TouchableOpacity, View, Text, FlatList} from 'react-native';
import styles from './Styles';
import {Colors, whiteColorWithOpacity} from '../../Global/GlobalCSS';
import {JobArray} from '../../Global/JobArray';
import {useNavigation} from '@react-navigation/native';

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

  return (
    <View style={[styles.mainContainer]}>
      <Text style={styles.mainHeading}>
      {userJobsArray ? 'Your Jobs' : 'Available Jobs'}
      </Text>
      <FlatList
        data={userJobsArray !=undefined ? userJobsArray : JobArray}
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
            <item.icon name={item.iconName} size={40} color={Colors.primary} />
            <Text style={styles.textStyles}>{item.jobName}</Text>
            { item.hasUpdate &&
              <View style={styles.notification}>
                  <Text style={{fontWeight:'bold', textAlign:'center'}}> 1 </Text>                    
              </View> 
            }
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default JobCard;
