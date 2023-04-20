import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PlusButton, MinusButton} from '../../components/ButtonsPlusAndMinus';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function EstoqueMateriasEditarTecidos({route}) {
  const [quantidade, setQuantidade] = useState(route.params.quantidade);
  const [estoqueMin, setEstoqueMin] = useState('');

  const parseQuantidade = quantidade => {
    return parseInt(quantidade, 10) || '';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerOP}>
        <Text style={styles.textTitle}>
          {route.params.fornecedor} - {route.params.tipoTecido}
        </Text>
        <Text style={styles.textTitle2}>
          {route.params.cor}
          {route.params.codigo == '' ? null : (
            <Text style={styles.textTitle2}>, {route.params.codigo}</Text>
          )}
        </Text>

        <View style={{flexDirection:'row'}}></View>
        <Text style={styles.textTitleQtd}>Quantidade:</Text>
        <View style={{flexDirection: 'row'}}>
          <PlusButton onPress={() => setQuantidade(state => state + 1)} />
          <TextInput
            style={styles.inputTextQtd}
            onChangeText={t => setQuantidade(parseQuantidade(t))}>
            {quantidade}
          </TextInput>
          <MinusButton onPress={() => setQuantidade(state => state - 1)} />
        </View>

        <Text style={styles.textTitleEstoque}>Estoque mínimo:</Text>
        <View>
          <TextInput
            style={styles.inputTextEstoqueMin}
            onChangeText={t => setEstoqueMin(parseQuantidade(t))}>
            {estoqueMin}
          </TextInput>
        </View>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingEnd: 14,
    paddingStart: 14,
    paddingTop: 14,
  },
  containerOP: {
    backgroundColor: '#FAFAFA',
    paddingEnd: 14,
    paddingStart: 14,
    paddingTop: 14,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#999',
  },
  inputTextEstoqueMin: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 5,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    color: '#666',
    width: Dimensions.get('window').width / 7,
    fontSize: 25,
    textAlign: 'center',
  },
  inputTextQtd: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    color: '#666',
    width: Dimensions.get('window').width / 7,
    fontSize: 25,
    textAlign: 'center',
  },
  textTitle: {
    color: '#696969',
    fontSize: 30,
    fontWeight: 'bold',
  },
  textTitleQtd: {
    color: '#696969',
    fontSize: 25,
    marginBottom: 5,
    marginTop: 10,
  },
  textTitleEstoque: {
    color: '#696969',
    fontSize: 25,
    marginBottom: 5,
    marginTop: 10,
  },
  textTitle2: {
    color: '#696969',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
