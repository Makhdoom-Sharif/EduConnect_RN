import {StyleSheet} from 'react-native';
import {Colors} from '../../Global/GlobalCSS';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBB718',
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 25,
  },
  textColor: {
    color: Colors.white,
  },
});
export default styles;
