import React, {useState, useContext, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../../routes/AuthProvider';

export default function Fornecedor({data, onPress}) {

  const {removeSupplier} = useContext(AuthContext);
  const [isHidden, setIsHidden] = useState(false); // Estado para controlar a visibilidade da View

  const handleremoveSupplier = (id) => {
    // Função para remover a cor do Firebase e atualizar o estado de visibilidade
    removeSupplier(id);
    setIsHidden(true);
  };

  if (!Array.isArray(data.tecido)) {
    return null; // ou algum valor padrão ou uma mensagem de erro, caso necessário
  }

  return (
    !isHidden && (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          Fornecedor: {data.nome}
        </Text>
        <Text style={styles.title}>Tecido: {data.tecido.join(', ')}. </Text>
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
