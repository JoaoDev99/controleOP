import React, {useState, useContext, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../../routes/AuthProvider';

export default function Product({data, onPress}) {

  const {removeColorRef} = useContext(AuthContext);


  if (!Array.isArray(data.tecido)) {
    return null; // ou algum valor padrão ou uma mensagem de erro, caso necessário
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          Cor: {data.cor}, {data.codigo}
        </Text>
        <Text style={styles.title}>Fornecedor: {data.fornecedor}</Text>
        <Text style={styles.title}>Tecido: {data.tecido.join(', ')}. </Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.buttonConclusion} onPress={() => removeColorRef(data.id)}>
          <Icon name="trash-o" size={30} color={'#FFF'} />
        </TouchableOpacity>
      </View>
    </View>
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
  },
});
