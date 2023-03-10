import { StyleSheet } from 'react-native';
import { Colors } from '../../Global/GlobalCSS';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.backgroundPrimary,
    marginHorizontal: 10,
    borderRadius: 15,
  },
  container: {
    borderRadius: 15,
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingBottom: 10,
    marginVertical: 15,
    marginHorizontal: 10,
  },
  textStyles: {
    fontWeight: '600',
    fontSize: 18,
    paddingTop: 5,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainHeading: {
    paddingTop: 10,
    paddingHorizontal: 15,
    fontWeight: '700',
    fontSize: 21,
    color: Colors.primary,
  },
  sideOption: {
    paddingTop: 10,
    paddingHorizontal: 15,
    fontWeight: '600',
    color: Colors.primary,
  },
  boxShadow: {
    shadowColor: Colors.primary,
    shadowRadius: 5,
    shadowOpacity: 0.35,
    elevation: 8,
  },
  iconStyle: {
    backgroundColor: Colors.backgroundPrimary,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  bio: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  bottomGap: {
    paddingBottom: 5,
  },
  nameStyle: { fontWeight: '700', fontSize: 18 },
  profile: {
    height: 80,
    width: 100,
    resizeMode: 'contain'
  },
});
export default styles;
