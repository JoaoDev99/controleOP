import React, {useState, useContext, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../../routes/AuthProvider';

export default function Caracteristica({data}) {

  const {removeCaracteristicaRef} = useContext(AuthContext);
  const [isHidden, setIsHidden] = useState(false); 

  const handleremoveSupplier = (id) => {
    removeCaracteristicaRef(id);
    setIsHidden(true);
  };


  return (
    !isHidden && (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          Fornecedor: {data.caracteristica}
        </Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.buttonConclusion} onPress={() => handleremoveSupplier(data.id)}>
          <Icon name="trash-o" size={30} color={'#FFF'} />
        </TouchableOpacity>
      </View>
    </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    color: '#000',
  },
  buttonConclusion: {
    paddingStart: 12,
    paddingEnd: 12,
    backgroundColor: '#FF4848',
    paddingTop: 9,
    paddingBottom: 9,
    borderRadius: 5
  },
  containerAdd: {
    backgroundColor: '#FAFAFA',
    paddingEnd: 14,
    paddingStart: 14,
    paddingTop: 14,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#999',
  },
});
