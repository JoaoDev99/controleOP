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

export default function Fornecedores() {
  const {createSupplier} = useContext(AuthContext);
  
  const [fornecedor, setFornecedor] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  function CheckboxRender() {
    const items = [
      {id: 'Brim', label: 'Brim'},
      {id: 'Malha', label: 'Malha'},
      {id: 'Social', label: 'Social'}
    ];

    const handleToggleItem = item => {
      const index = selectedItems.indexOf(item.id);

      if (index >= 0) {
        // Item já está selecionado, então remove do array
        setSelectedItems(selectedItems.filter(id => id !== item.id));
      } else {
        // Item não está selecionado, então adiciona ao array
        setSelectedItems([...selectedItems, item.id]);
      }
    };
    
    return (
      <View
        style={{flexDirection: 'row', marginTop: 20, justifyContent: 'center'}}>
        
        {items.map(item => (
          <View
            key={item.id}
            style={{
              flexDirection: 'row',
              marginTop: 20,
              alignItems: 'center',
              marginRight: Dimensions.get('window').width / 25,
              marginLeft: Dimensions.get('window').width / 25,
            }}>
              <CheckBox
                disabled={false}
                value={selectedItems.indexOf(item.id) >= 0}
                onValueChange={() => [
                  handleToggleItem(item),
                  console.log(selectedItems)
                ]}
                tintColors={{true: '', false: '#000'}}
              />
              <Text style={styles.textTitle}>{item.label}</Text>
            </View>
          
        ))}
      </View>
    );
  }
  
  

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

      <CheckboxRender />

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.btnSeguir} onPress={() => createSupplier(fornecedor, selectedItems)}>
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
