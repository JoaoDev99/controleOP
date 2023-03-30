import {useState, useContext} from 'react';
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
  const {user} = useContext(AuthContext);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
  const [toggleCheckBox3, setToggleCheckBox3] = useState(false);

  function CheckboxExample() {
    const [selectedItems, setSelectedItems] = useState([]);
  
    const items = [
      { id: 1, label: 'Item 1' },
      { id: 2, label: 'Item 2' },
      { id: 3, label: 'Item 3' },
    ];
  
    const handleToggleItem = (item) => {
      const index = selectedItems.indexOf(item.id);
  
      if (index >= 0) {
        // Item já está selecionado, então remove do array
        setSelectedItems(selectedItems.filter((id) => id !== item.id));
      } else {
        // Item não está selecionado, então adiciona ao array
        setSelectedItems([...selectedItems, item.id]);
      }
    };
  
    return (
      <View>
        {items.map((item) => (
          <View key={item.id}>
            <Checkbox
            disabled={false}
              value={selectedItems.indexOf(item.id) >= 0}
              onValueChange={() => handleToggleItem(item)}
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
        <TextInput style={styles.textInput}></TextInput>
      </View>
      <Text style={styles.textTitle}>Tecido: </Text>
      <View style={{flexDirection: 'row', marginTop: 20, justifyContent:'center'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: Dimensions.get('window').width / 9,
          }}>
          <Text style={styles.text}>Brim</Text>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
            tintColors={{true: '', false: '#000'}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: Dimensions.get('window').width / 9,
          }}>
          <Text style={styles.text}>Malha</Text>
          <CheckBox
            disabled={false}
            value={toggleCheckBox2}
            onValueChange={newValue => setToggleCheckBox2(newValue)}
            tintColors={{true: '', false: '#000'}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            
          }}>
          <Text style={styles.text}>Social</Text>
          <CheckBox
            disabled={false}
            value={toggleCheckBox3}
            onValueChange={newValue => setToggleCheckBox3(newValue)}
            tintColors={{true: '', false: '#000'}}
          />
        </View>
      </View>

      <CheckboxExample/> 

      <View style={{flexDirection:"row"}}>
          <TouchableOpacity
            style={styles.btnSeguir}
            onPress={() => importData()}>
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
    marginTop: 20
  },
});
