import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import {AuthContext} from '../../routes/AuthProvider';
import {SafeAreaView} from 'react-native-safe-area-context';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from "@react-navigation/native";


export default function Fornecedores() {
  const {createSupplier} = useContext(AuthContext);

  const navigation = useNavigation();

  const [fornecedor, setFornecedor] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  
  

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.textTitle}>Fornecedor:</Text>
        <TextInput style={styles.textInput}
         placeholder="Digite o nome do fornecedor"
         placeholderTextColor="#C0C0C0"
         autoCorrect={false}
         color="#000"
         onChangeText={fornecedor => setFornecedor(fornecedor)}
       ></TextInput>
      </View>
      
      <Text style={styles.textTitle}>Tecido: </Text>


      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.btnSeguir} onPress={() => navigation.navigate("AddFornecedores")}>
          <Text style={{color: '#FFF'}}>Adicionar</Text>
        </TouchableOpacity>
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
  textInput: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 14,
    padding: 8,
    paddingTop: 14,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  textTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
  },
  text: {
    fontSize: 17,
    color: '#000',
  },
  btnSeguir: {
    borderWidth: 1,
    borderColor: '#168fff',
    borderRadius: 5,
    marginBottom: 14,
    marginRight: 14,
    padding: 8,
    paddingTop: 14,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#168fff',
    height: 50,
    flexBasis: '30%',
    marginTop: 20,
  },
});