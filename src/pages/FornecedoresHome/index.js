import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  FlatList,
} from 'react-native';
import {AuthContext} from '../../routes/AuthProvider';
import {SafeAreaView} from 'react-native-safe-area-context';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import VisualizarFornecedores from '../../components/VisualizadorFornecedor';

export default function Fornecedores() {
  const {createSupplier} = useContext(AuthContext);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [btn1Clicked, setBtn1Clicked] = useState(false);
  const [btn2Clicked, setBtn2Clicked] = useState(true);
  const [fornecedor, setFornecedor] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [clicked, setClicked] = useState(true);

  function CheckboxRender() {
    const items = [
      {id: 'Brim', label: 'Brim'},
      {id: 'Malha', label: 'Malha'},
      {id: 'Social', label: 'Social'},
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
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {items.map(item => (
          <View
            key={item.id}
            style={{
              marginTop: 10,
              alignItems: 'center',
            }}>
            <CheckBox
              disabled={false}
              value={selectedItems.indexOf(item.id) >= 0}
              onValueChange={() => [
                handleToggleItem(item),
                console.log(selectedItems),
              ]}
              tintColors={{true: '', false: '#000'}}
            />
            <Text style={styles.inputTitle2}>{item.label}</Text>
          </View>
        ))}
      </View>
    );
  }

  const getFornecedores = () => {
    firestore()
      .collection('fornecedores')
      .orderBy('nome', 'asc')
      .get()
      .then(querySnapshot => {
        let d = [];
        querySnapshot.forEach(documentSnapshot => {
          const user = {
            id: documentSnapshot.id,
            nome: documentSnapshot.data().nome,
            tecido: documentSnapshot.data().tecido,
          };
          d.push(user);
        });
        console.log(d);
        setData(d);
      })
      .catch(e => {
        console.log('Erro, catch user' + e);
      });
  };

  useEffect(() => {
    getFornecedores();
  }, [clicked]);

  const RenderPageCor = () => (
    <View>
      <View style={styles.containerOP}>
        {btn1Clicked ? (
          <View>
            <TouchableOpacity
              style={styles.buttonOP1}
              onPress={() => [setBtn1Clicked(false), setBtn2Clicked(true)]}>
              <Text style={styles.title3}>Visualizar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity style={styles.buttonOP1F}>
              <Text style={styles.title2}>Visualizar</Text>
            </TouchableOpacity>
          </View>
        )}

        {btn2Clicked ? (
          <View>
            <TouchableOpacity
              style={styles.buttonOP2}
              onPress={() => [setBtn1Clicked(true), setBtn2Clicked(false)]}>
              <Text style={styles.title3}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity style={styles.buttonOP2F}>
              <Text style={styles.title2}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {btn1Clicked ? (
        RenderAddCor()
      ) : (
        <View style={{borderWidth: 1}}>
          <View style={{height: Dimensions.get('window').width * 1.4}}>
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => (
                <VisualizarFornecedores data={item} />
              )}
            />
          </View>
        </View>
      )}
    </View>
  );

  const RenderAddCor = () => (
    <View style={styles.containerAdd}>
      <View>
        <Text style={styles.textTitle}>Fornecedor:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Digite o nome do fornecedor"
          placeholderTextColor="#C0C0C0"
          autoCorrect={false}
          color="#000"
          onChangeText={fornecedor => setFornecedor(fornecedor)}></TextInput>
      </View>

      <Text style={styles.textTitle}>Tecido: </Text>

      <CheckboxRender />

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.btnSeguir}
          onPress={() => [
            createSupplier(fornecedor, selectedItems),
            setClicked(clicked == false ? true : false),
            setBtn1Clicked(false),
            setBtn2Clicked(true),
            setFornecedor(''),
            setSelectedItems([])
          ]}>
          <Text style={{color: '#FFF'}}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {RenderPageCor()}
      <View style={{flexDirection: 'row'}}></View>
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
  containerAdd: {
    backgroundColor: '#FAFAFA',
    paddingEnd: 14,
    paddingStart: 14,
    paddingTop: 14,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#999',
  },
  containerOP: {
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
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
  buttonOP1: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#168fff',
    height: Dimensions.get('window').height / 9.99,
    width: Dimensions.get('window').width / 2.23,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    elevation: 20,
  },
  buttonOP2: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#168fff',
    height: Dimensions.get('window').height / 9.99,
    width: Dimensions.get('window').width / 2.19,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    elevation: 20,
  },
  buttonOP1F: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#63B4FF',
    height: Dimensions.get('window').height / 9.99,
    width: Dimensions.get('window').width / 2.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    zIndex: 1,
  },
  buttonOP2F: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#63B4FF',
    height: Dimensions.get('window').height / 9.99,
    width: Dimensions.get('window').width / 2.16,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    zIndex: 1,
  },
  title2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  title3: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  inputTitle2: {
    color: '#696969',
    fontSize: 15,
  },
});
