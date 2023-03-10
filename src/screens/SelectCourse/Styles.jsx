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
    paddingTop: 50,
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
    fontWeight: '600',
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
  error:{
    color:'red'
  }
});
export default styles;
