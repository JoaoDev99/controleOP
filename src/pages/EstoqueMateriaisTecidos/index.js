import React, {useState, useContext, useEffect, useRef} from 'react';
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
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import VisualizarCores from '../../components/VisualizadorTipoTecido';
import CheckBox from '@react-native-community/checkbox';

const tipos = [
  {nome: 'Cores de Tecido'},
  {nome: 'Característica'},
  {nome: 'Peso'},
];
const tecidos = [
  {nome: 'Todos'},
  {nome: 'Brim'},
  {nome: 'Malha'},
  {nome: 'Social'},
];

export default function EstoqueMaterias() {
  const {createTecido} = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [search2, setSearch2] = useState('');
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState(tecidos);
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  const [tipoClicked, setTipoClicked] = useState(false);
  const [btn1Clicked, setBtn1Clicked] = useState(false);
  const [btn2Clicked, setBtn2Clicked] = useState(true);
  const [clicked2, setClicked2] = useState(false);
  const [selectedCorRef, setSelectedCorRef] = useState([]);
  const [clicked3, setClicked3] = useState(false);
  const [selectedTecido, setSelectedTecido] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [cor, setCor] = useState('');
  const [codigo, setCodigo] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [corData, setCorData] = useState([]);
  const [Brim, setBrim] = useState([]);
  const [Malha, setMalha] = useState([]);
  const [Social, setSocial] = useState([]);
  const [Todos, setTodos] = useState([]);
  const [corRef, setCorRef] = useState('');
  const [tipoTecido, setTipoTecido] = useState('');
  const [tecido, setTecido] = useState('');

  const [selectedItem, setSelectedItem] = useState(null);
  function CheckboxRender() {
    const items = [
      {id: 'KG', label: 'KG'},
      {id: 'M', label: 'M'},
    ];

    const handleToggleItem = item => {
      if (selectedItem === item.id) {
        // Verifica se o item já está selecionado
        setSelectedItem(null); // Se estiver selecionado, deseleciona
      } else {
        setSelectedItem(item.id); // Se não estiver selecionado, seleciona o novo item
      }
    };

    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {items.map(item => (
          <View
            key={item.id}
            style={{
              alignItems: 'center',
            }}>
            <CheckBox
              disabled={false}
              value={selectedItem === item.id}
              onValueChange={() => [handleToggleItem(item)]}
              tintColors={{true: '', false: '#000'}}
            />
            <Text style={styles.inputTitle2}>{item.label}</Text>
          </View>
        ))}
      </View>
    );
  }

  const searchRef2 = useRef();
  const onSearch2 = search => {
    if (search !== '') {
      let tempData = data2.filter(item => {
        return item.nome.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
      setData2(tempData);
    } else {
      setData2(list2);
    }
  };

  const getTipoTecido = () => {
    firestore()
      .collection('tipoTecido')
      .orderBy('nome', 'asc')
      .get()
      .then(querySnapshot => {
        let d = [];
        querySnapshot.forEach(documentSnapshot => {
          const tipoTecido = {
            nome: documentSnapshot.data().nome,
            fornecedor: documentSnapshot.data().fornecedor,
            tecido: documentSnapshot.data().tecido,
          };
          d.push(tipoTecido);
        });
        setData2(d);
        setList2(d);
        console.log(d);
      })
      .catch(e => {
        console.log('Erro, catch user' + e);
      });
  };

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
        let a = 'Brim';
        querySnapshot.forEach(documentSnapshot => {
          const fornecedor = {
            nome: documentSnapshot.data().nome,
            tecido: documentSnapshot.data().tecido,
          };
          d.push(fornecedor);
        });
        setData(d);
        setList(d);
        console.log('Buscou2');
      })
      .catch(e => {
        console.log('Erro, catch user' + e);
      });
  };

  const getCoresRef = () => {
    firestore()
      .collection('tipoTecido')
      .orderBy('nome', 'asc')
      .get()
      .then(querySnapshot => {
        let d = [];
        querySnapshot.forEach(documentSnapshot => {
          const cor = {
            nome: documentSnapshot.data().nome,
            fornecedor: documentSnapshot.data().fornecedor,
            tecido: documentSnapshot.data().tecido,
          };
          d.push(cor);
        });
        setCorRef(d);
        console.log(d);
      })
      .catch(e => {
        console.log('Erro, catch user' + e);
      });
  };

  const getCores = () => {
    const unsubscribe = firestore()
      .collection('tecidos')
      .orderBy('cor', 'asc')
      .onSnapshot(
        querySnapshot => {
          let d = [];
          let a = 'Brim';
          let b = 'Malha';
          let c = 'Social';
          querySnapshot.forEach(documentSnapshot => {
            const cor = {
              id: documentSnapshot.id,
              fornecedor: documentSnapshot.data().fornecedor,
              cor: documentSnapshot.data().cor,
              codigo: documentSnapshot.data().codigo,
              tecido: documentSnapshot.data().tecido,
              quantidade: documentSnapshot.data().quantidade,
              tipoMedida: documentSnapshot.data().tipoMedida,
              tipoTecido: documentSnapshot.data().tipoTecido,
            };
            d.push(cor);
          });
          setTodos(d);
          setBrim(d.filter(item => item.tecido.indexOf(a) > -1));
          setMalha(d.filter(item => item.tecido.indexOf(b) > -1));
          setSocial(d.filter(item => item.tecido.indexOf(c) > -1));
          console.log('Buscou');
        },
        error => {
          console.log('Erro, catch user' + error);
        },
      );

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = getCores();
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    getFornecedores(), getCoresRef(), getTipoTecido();
  }, []);

  const RenderAddCor = () => (
    <View style={styles.containerAdd}>
      {RenderTipoTecido()}
      {RenderItem()}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text style={styles.inputTitle}>Cor:</Text>
          <TextInput
            style={styles.textInputCor}
            placeholder="Digite o nome da cor"
            placeholderTextColor="#C0C0C0"
            autoCorrect={false}
            onChangeText={cor => setCor(cor)}
            value={cor}
          />
        </View>
        <View>
          <Text style={styles.inputTitle}>Código:</Text>
          <TextInput
            style={styles.textInputCodigo}
            placeholder="123..."
            placeholderTextColor="#C0C0C0"
            autoCorrect={false}
            onChangeText={cod => setCodigo(cod)}
            keyboardType="numeric"
            value={codigo}
          />
        </View>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View>
          <Text style={[styles.inputTitle, {marginTop: 10}]}>Quantidade:</Text>
          <TextInput
            style={styles.textInputQuantidade}
            placeholder="Digite a qtd."
            placeholderTextColor="#C0C0C0"
            autoCorrect={false}
            onChangeText={quantidade => setQuantidade(quantidade)}
            value={quantidade}
          />
        </View>
        <View style={{marginLeft: Dimensions.get('window').width / 20}}>
          <Text style={[styles.inputTitle, {marginBottom: 10, marginTop: 10}]}>
            Tipo de medida:
          </Text>
          <CheckboxRender />
        </View>
      </View>

      <View>
        <Text style={[styles.inputTitle, {marginTop: 10}]}>Tecido:</Text>
        <TextInput
          style={styles.textInputQuantidade}
          placeholder="Tecido"
          placeholderTextColor="#C0C0C0"
          autoCorrect={false}
          onChangeText={tecido => setTecido(tecido)}
          value={tecido}
        />
      </View>

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.btnSeguir}
          onPress={() => [
            createTecido(
              fornecedor,
              cor,
              codigo,
              tecido,
              quantidade,
              selectedItem,
              tipoTecido,
            ),
            setBtn1Clicked(false),
            setBtn2Clicked(true),
            setSelectedTecido(''),
            setCor(''),
            setCodigo(''),
            setSelectedItem(''),
            setFornecedor(''),
            setTipoTecido(''),
          ]}>
          <Text style={{color: '#FFF'}}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const RenderItem = () => (
    <View style={{zIndex: 1}}>
      <Text style={styles.inputTitle}>Fornecedor:</Text>
      <TouchableOpacity
        style={styles.dropdownSelector}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <Text style={{color: '#666'}}>
          {fornecedor == '' ? 'Selecione o fornecedor' : fornecedor}
        </Text>
        {clicked ? (
          <Icon name="arrow-drop-up" size={30} color="#666" />
        ) : (
          <Icon name="arrow-drop-down" size={30} color="#666" />
        )}
      </TouchableOpacity>
      {clicked ? (
        <View
          style={{
            elevation: 5,
            height: 200,
            alignSelf: 'center',
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: 10,
            position: 'absolute',
            zIndex: 2,
            marginTop: Dimensions.get('window').width / 4.5,
          }}>
          <TextInput
            placeholder="Buscar..."
            placeholderTextColor={'#666'}
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
              color: '#666',
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
                    setFornecedor(item.nome);
                    setClicked(!clicked);
                    onSearch('');
                    setSearch('');
                  }}>
                  <Text style={{fontWeight: '400', color: '#666'}}>
                    {item.nome}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
    </View>
  );

  const RenderTipoTecido = () => (
    <View style={{marginTop: 10, zIndex: 999}}>
      <Text style={styles.inputTitle}>Tipo do tecido:</Text>
      <TouchableOpacity
        style={styles.dropdownSelector}
        onPress={() => {
          setTipoClicked(!tipoClicked);
        }}>
        <Text style={{color: '#666'}}>
          {tipoTecido == '' ? 'Selecione o tipo de tecido' : tipoTecido}
        </Text>
        {tipoClicked ? (
          <Icon name="arrow-drop-up" size={30} color="#666" />
        ) : (
          <Icon name="arrow-drop-down" size={30} color="#666" />
        )}
      </TouchableOpacity>
      {tipoClicked ? (
        <View
          style={{
            elevation: 5,
            height: 200,
            alignSelf: 'center',
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: 10,
            position: 'absolute',
            top: Dimensions.get('window').width / 4.5,
          }}>
          <TextInput
            placeholder="Buscar..."
            placeholderTextColor={'#666'}
            value={search2}
            ref={searchRef2}
            onChangeText={txt => {
              onSearch2(txt);
              setSearch2(txt);
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
              color: '#666',
            }}
          />

          <FlatList
            data={data2}
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
                    setTipoTecido(item.nome);
                    setTipoClicked(!tipoClicked);
                    onSearch2('');
                    setSearch2('');
                  }}
                  scrollEnabled={true}>
                  <Text style={{fontWeight: '400', color: '#666'}}>
                    {item.nome}
                  </Text>
                </TouchableOpacity>
              );
            }}
            style={{flex: 1}}
          />
        </View>
      ) : null}
    </View>
  );

  const RenderItem3 = () => (
    <View>
      <Text style={styles.inputTitle}>Tecidos:</Text>
      <TouchableOpacity
        style={styles.dropdownSelector}
        onPress={() => {
          setClicked3(!clicked3);
        }}>
        <Text style={{color: '#666'}}>
          {selectedTecido == ''
            ? 'Selecione o tipo de tecido:'
            : selectedTecido}
        </Text>
        {clicked3 ? (
          <Icon name="arrow-drop-up" size={30} color="#666" />
        ) : (
          <Icon name="arrow-drop-down" size={30} color="#666" />
        )}
      </TouchableOpacity>
      {clicked3 ? (
        <View
          style={{
            elevation: 5,
            height: 160,
            alignSelf: 'center',
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: 10,
          }}>
          <FlatList
            data={data3}
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
                    color: '#666',
                  }}
                  onPress={() => {
                    setSelectedTecido(item.nome);
                    setClicked3(!clicked3);
                  }}>
                  <Text style={{fontWeight: '600', color: '#666'}}>
                    {item.nome}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : null}
    </View>
  );

  const updateCorData = () => {
    if (selectedTecido === 'Brim') {
      setCorData(Brim);
    } else if (selectedTecido === 'Malha') {
      setCorData(Malha);
    } else if (selectedTecido === 'Social') {
      setCorData(Social);
    } else if (selectedTecido === 'Todos') {
      setCorData(Todos);
    } else {
      setCorData([]); // Caso nenhum valor de tecido seja selecionado, limpe o estado corData
    }
  };

  useEffect(() => {
    updateCorData();
  }, [selectedTecido]);

  const RenderPageCor = () => (
    <View>
      <View style={styles.containerOP}>
        {btn1Clicked ? (
          <View>
            <TouchableOpacity
              style={styles.buttonOP1}
              onPress={() => [
                setBtn1Clicked(false),
                setBtn2Clicked(true),
                setSelectedTecido(''),
              ]}>
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
              onPress={() => [
                setBtn1Clicked(true),
                setBtn2Clicked(false),
                setSelectedTecido(''),
              ]}>
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
        <View>
          <RenderItem3 />

          <View
            style={{
              maxHeight: Dimensions.get('window').width * 1.2,
            }}>
            <FlatList
              data={corData}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => <VisualizarCores data={item} />}
            />
          </View>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>{RenderPageCor()}</SafeAreaView>
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
  containerTabela: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  containerInternoCor: {
    borderWidth: 0.5,
    padding: 10,
    flexBasis: '30%',
    borderTopLeftRadius: 3,
  },
  containerInternoCodigo: {
    borderWidth: 0.5,
    padding: 10,
    flexBasis: '20%',
  },
  containerInternoFornecedor: {
    borderWidth: 0.5,
    borderTopRightRadius: 3,
    padding: 10,
    flexBasis: '50%',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 14,
    padding: 8,
    paddingTop: 14,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    color: '#666',
  },
  textInputCor: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 5,
    marginTop: 5,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: Dimensions.get('window').width / 1.6,
    color: '#666',
  },
  textInputQuantidade: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 5,
    marginTop: 5,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: Dimensions.get('window').width / 3,
    color: '#666',
  },
  textInputCodigo: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 5,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: Dimensions.get('window').width / 6.7,
    color: '#666',
    paddingLeft: 11,
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
    marginBottom: 10,
    marginTop: 10,
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
  inputTitle: {
    color: '#696969',
    fontSize: 15,
  },
  inputTitle2: {
    color: '#696969',
    fontSize: 15,
  },
  title2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    elevation: 10,
  },
  title3: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    elevation: 10,
  },
  buttonOP1: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#168fff',
    height: Dimensions.get('window').height / 9.99,
    width: Dimensions.get('window').width / 2.23,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  buttonOP1F: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#63B4FF',
    height: Dimensions.get('window').height / 9.99,
    width: Dimensions.get('window').width / 2.2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  buttonOP2: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#168fff',
    height: Dimensions.get('window').height / 9.99,
    width: Dimensions.get('window').width / 2.19,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  buttonOP2F: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#63B4FF',
    height: Dimensions.get('window').height / 9.99,
    width: Dimensions.get('window').width / 2.16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
  },
});
