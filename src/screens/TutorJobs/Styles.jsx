import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../Global/GlobalCSS';
const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  ScrollViewStyles: {
    // backgroundColor: Colors.primary,
    width: '100%',
    height: height - 210,
    marginBottom: 20,
  },
  SearchLocationContainer: {
    alignItems: 'center',
  },
  cardSpace: {
    marginVertical: 25,
  },
  container: {
    paddingTop: 30,
    marginLeft: 28,
    marginRight: 28,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    textAlign: 'center',
  },
  logo: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
    borderRadius: 200,
  },
  mt10: {
    marginTop: 10,
  },
  mt20: {
    marginTop: 20,
  },
  mb10: {
    marginBottom: 10,
  },
  mb20: {
    marginBottom: 20,
  },
  mb30: {
    marginBottom: 30,
  },
  textWhite: {
    color: Colors.white,
  },
  mainHeading: {
    color: Colors.white,
    fontFamily: 'poppins',
    textTransform: 'capitalize',
  },
  textStyles: {
    fontSize: 14,
    paddingTop: 5,
  },
  boxShadow: {
    shadowColor: Colors.primary,
    shadowRadius: 5,
    shadowOpacity: 0.35,
    elevation: 8,
  },
  button: {
    backgroundColor: Colors.secondary,
    color: '#fff',
    padding: 10,
    borderRadius: 5
  },
  tutors: {
    backgroundColor: Colors.white,
    padding: 20,
    marginBottom: 20,
    borderRadius:10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign:'center'
  },
  avatar:{
    height: 150,
    width: 150,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  tutorInfo:{
    justifyContent: 'flex-start',
    flexDirection:'row', 
    flexWrap:'wrap'
  },
  bannerImg:{
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width:'90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  error: {
    color:'red'
  }
});
export default styles;
