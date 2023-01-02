import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './Styles';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
const index = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    {label: 'Educationist', value: 'Educationist'},
    {label: 'Student', value: 'Student'},
  ]);

  return (
    <DropDownPicker
      style={styles.dropDownMain}
      placeholderStyle={styles.dropDownLabel}
      dropDownContainerStyle={styles.dropDownContainer}
      listItemLabelStyle={styles.dropDownLabel}
      labelStyle={styles.dropDownLabel}
      ArrowDownIconComponent={() => {
        return (
          <FontAwesomeIcon
            size={16}
            color={'#fff'}
            style={{paddingHorizontal: 5}}
            name="chevron-down"
          />
        );
      }}
      ArrowUpIconComponent={() => {
        return (
          <FontAwesomeIcon
            size={16}
            color={'#fff'}
            style={{paddingHorizontal: 5}}
            name="chevron-up"
          />
        );
      }}
      TickIconComponent={() => {
        return (
          <FontAwesomeIcon
            size={16}
            color={'#fff'}
            style={{paddingHorizontal: 5}}
            name="check"
          />
        );
      }}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      closeOnBackPressed={true}
    />
  );
};

export default index;
