import React, {useState, useContext, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../../routes/AuthProvider';

export default function VisualizarTecidos({data}) {
  const {removeTecido} = useContext(AuthContext);
  const [isHidden, setIsHidden] = useState(false); // Estado para controlar a visibilidade da View

  const handleremoveTipoTecido = id => {
    removeTecido(id);
    setIsHidden(true);
  };

  return (
    !isHidden && (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Cor: {data.cor}, {data.codigo}</Text>
          <Text style={styles.title}>Fornecedor: {data.fornecedor}</Text>
          <Text style={styles.title}>Tecido: {data.tipoTecido}, {data.tecido}</Text>
          <Text style={styles.title}>Quantidade: {data.quantidade} {data.tipoMedida}</Text>
          
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.buttonConclusion}
            onPress={() => handleremoveTipoTecido(data.id)}>
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
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
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
    borderRadius: 5,
  },
});
