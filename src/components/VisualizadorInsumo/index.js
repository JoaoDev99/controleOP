import React, {useState, useContext, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../../routes/AuthProvider';
import {useNavigation} from '@react-navigation/native';
import { Alert } from 'react-native';

export default function VisualizarTecidos({data}) {
  const {removeInsumo} = useContext(AuthContext);
  const [isHidden, setIsHidden] = useState(false);
  const navigation = useNavigation();
  const [codigo, setCodigo] = useState(data.codigo);

  const handleremoveTipoTecido = id => {
    removeInsumo(id);
    setIsHidden(true);
  };

  const handleDeleteConfirm = (id) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja excluir?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {text: 'Excluir', onPress: () => handleremoveTipoTecido(id)},
      ],
      { cancelable: false }
    );
  };

  return (
    !isHidden && (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('EstoqueMateriaisEditarTecidos', {
              id: data.id,
              produto: data.produto,
              fornecedor: data.fornecedor,
              cor: data.cor,
              codigo: data.codigo,
              quantidade: data.quantidade,
              observacoes: data.observacoes,
              estoqueMinimo: data.estoqueMinimo,
            })
          }>
          <View>
          <Text style={styles.title}>Produto: {data.produto}</Text>
            <Text style={styles.title}>
              Cor: {data.cor}
              {codigo != '' ? ', ' + data.codigo : null}
            </Text>
            <Text style={styles.title}>Fornecedor: {data.fornecedor}</Text>
            <Text style={styles.title}>
              Quantidade: {data.quantidade} {data.tipoMedida}
            </Text>
            <Text style={styles.title}>Observações: {data.observacoes}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.buttonConclusion}
            onPress={() => handleDeleteConfirm(data.id)}>
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
    marginBottom: 10,
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
