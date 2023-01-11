import {StyleSheet} from 'react-native';
import {Colors} from '../../Global/GlobalCSS';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.backgroundPrimary,
    marginHorizontal: 10,
    borderRadius: 15,
  },
  container: {
    borderRadius: 10,
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 15,
    marginHorizontal: 10,
  },
  textStyles: {
    fontWeight: '600',
    fontSize: 18,
    paddingTop: 5,
  },
  mainHeading: {
    paddingTop: 10,
    paddingHorizontal: 15,
    fontWeight: '700',
    fontSize: 21,
    textAlign: 'center',
  },
  sideOption: {
    alignSelf: 'flex-end',
    margin: 10,
    fontWeight: '600',
  },
  boxShadow: {
    shadowColor: Colors.primary,
    shadowRadius: 5,
    shadowOpacity: 0.35,
    elevation: 8,
  },
});
export default styles;
