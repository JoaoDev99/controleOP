import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const PlusButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.buttonPlus} onPress={onPress}>
      <Icon name="plus" size={30} color={'#FFF'} />
    </TouchableOpacity>
  );
};

export const MinusButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.buttonMinus} onPress={onPress}>
      <Icon name="minus" size={30} color={'#FFF'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonPlus: {
    backgroundColor: '#168fff',
    paddingStart: 12,
    paddingEnd: 12,
    paddingTop: 9,
    paddingBottom: 9,
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
  },
  buttonMinus: {
    backgroundColor: 'red',
    paddingStart: 12,
    paddingEnd: 12,
    paddingTop: 9,
    paddingBottom: 9,
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: 'center',
  },
 
});
