import React, {useState, useContext, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  FlatList
} from 'react-native';
import {AuthContext} from '../../routes/AuthProvider';
import {SafeAreaView} from 'react-native-safe-area-context';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';

const clients = [
    {name: 'Cineshow', id: '967'},
    {name: '365 Supermercados', id: '260'},
    {name: 'Biota', id: '263'},
  ];

export default function EstoqueReferecias() {

    const [search, setSearch] = useState('');
    const [clicked, setClicked] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [selectedClient, setSelectedClient] = useState('');
    
    const searchRef = useRef();
    const onSearch = search => {
      if (search !== '') {
        let tempData = data.filter(item => {
          return item.nome.toLowerCase().indexOf(search.toLowerCase()) > -1;
        });
        setData(tempData);
      } else {
        setData(list);
      }
    };
    
    const getFornecedores = () => {
        firestore()
          .collection('fornecedores')
          .orderBy('nome', 'asc')
          .get()
          .then(querySnapshot => {
            let d = [];
            querySnapshot.forEach(documentSnapshot => {
              const user = {
                nome: documentSnapshot.data().nome,
              };
              d.push(user);
            });
            console.log(d);
            setData(d);
            setList(d)
          })
          .catch(e => {
            console.log('Erro, catch user' + e);
          });
      };
    
      useEffect(() => {
        getFornecedores();
      }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
          style={styles.dropdownSelector}
          onPress={() => {
            setClicked(!clicked);
          }}>
          <Text>{selectedClient == '' ? 'Empresa' : selectedClient}</Text>
          {clicked ? (
            <Icon name="arrow-drop-up" size={30} />
          ) : (
            <Icon name="arrow-drop-down" size={30} />
          )}
        </TouchableOpacity>
        {clicked ? (
          <View
            style={{
              elevation: 5,
              height: 300,
              alignSelf: 'center',
              width: '100%',
              backgroundColor: '#fff',
              borderRadius: 10,
            }}>
            <TextInput
              placeholder="Buscar..."
              value={search}
              ref={searchRef}
              onChangeText={txt => {
                onSearch(txt);
                setSearch(txt);
              }}
              style={{
                width: '90%',
                height: 50,
                alignSelf: 'center',
                borderWidth: 0.5,
                borderColor: '#8e8e8e',
                borderRadius: 5,
                marginTop: 20,
                paddingLeft: 20,
              }}
            />

            <FlatList
              data={data}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: '85%',
                      alignSelf: 'center',
                      height: 50,
                      justifyContent: 'center',
                      borderBottomWidth: 0.5,
                      borderColor: '#8e8e8e',
                    }}
                    onPress={() => {
                      setSelectedClient(item.nome);
                      setClicked(!clicked);
                      onSearch('');
                      setSearch('');
                    }}>
                    <Text style={{fontWeight: '400'}}>{item.nome}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        ) : null}
      
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
  dropdownSelector: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DFDFDF',
    alignSelf: 'center',
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 15,
  },
});
