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
import VisualizarCores from '../../components/VisualizadorCor';
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

export default function EstoqueReferecias() {
  const {createColorRef} = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [btn1Clicked, setBtn1Clicked] = useState(false);
  const [btn2Clicked, setBtn2Clicked] = useState(true);
  const [clicked2, setClicked2] = useState(false);
  const [data2, setData2] = useState(tipos);
  const [selectedTipo, setSelectedTipo] = useState('');
  const [clicked3, setClicked3] = useState(false);
  const [data3, setData3] = useState(tecidos);
  const [selectedTecido, setSelectedTecido] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [cor, setCor] = useState('');
  const [codigo, setCodigo] = useState('');
  const [corData, setCorData] = useState([]);
  const [Brim, setBrim] = useState([]);
  const [Malha, setMalha] = useState([]);
  const [Social, setSocial] = useState([]);
  const [Todos, setTodos] = useState([]);
  const [outroTecido, setOutroTecido] = useState([]);
  const [isOutrosChecked, setIsOutrosChecked] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]);
  function CheckboxRender() {
    const items = [
      {id: 'Brim', label: 'Brim'},
      {id: 'Malha', label: 'Malha'},
      {id: 'Social', label: 'Social'},
    ];

    const handleToggleItem = item => {
      const index = selectedItems.indexOf(item.id);

      if (index >= 0) {
        setSelectedItems(selectedItems.filter(id => id !== item.id));
      } else {
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
              onValueChange={() => [handleToggleItem(item)]}
              tintColors={{true: '', false: '#000'}}
            />
            <Text style={styles.inputTitle2}>{item.label}</Text>
          </View>
        ))}
        <CheckboxOutroRender />
      </View>
    );
  }

  function CheckboxOutroRender() {
    const handleCheckBoxChange = newValue => {
      // Lógica para lidar com a alteração de valor do checkbox
      setIsOutrosChecked(newValue);
    };

    return (
      <View
        style={{
          marginTop: 10,
          alignItems: 'center',
        }}>
        <CheckBox
          value={isOutrosChecked}
          onValueChange={handleCheckBoxChange}
          tintColors={{true: '', false: '#000'}}
        />
        <Text style={styles.inputTitle2}>
          {isOutrosChecked ? 'Outros' : 'Outros'}
        </Text>
      </View>
    );
  }

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

  const getCores = () => {
    const unsubscribe = firestore()
      .collection('corRef')
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
              cor: documentSnapshot.data().cor,
              codigo: documentSnapshot.data().codigo,
              fornecedor: documentSnapshot.data().fornecedor,
              tecido: documentSnapshot.data().tecido,
            };
            d.push(cor);
          });
          setTodos(d);
          setBrim(d.filter(item => item.tecido.indexOf(a) > -1));
          setMalha(d.filter(item => item.tecido.indexOf(b) > -1));
          setSocial(d.filter(item => item.tecido.indexOf(c) > -1));
          console.log('Buscou')
        },
        error => {
          console.log('Erro, catch user' + error);
        },
      );

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = getCores();
    return (
      () => {
        unsubscribe();
      } 
    );
  }, []);

  useEffect(() =>{
getFornecedores();
  }, []);

  const RenderAddCor = () => (
    <View style={styles.containerAdd}>
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
      <View style={{marginTop: 10}}>
        <Text style={styles.inputTitle}>Tecido:</Text>
        <CheckboxRender />
      </View>

      {isOutrosChecked ? (
        <View>
          <TextInput
            style={styles.textInputCor}
            placeholder="Digite o tecido"
            placeholderTextColor="#C0C0C0"
            autoCorrect={false}
            //onChangeText={tecido => setOutro(tecido)}
            //value={10}
          />
        </View>
      ) : null}

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.btnSeguir}
          onPress={() => [
            createColorRef(fornecedor, cor, codigo, selectedItems),
            setBtn1Clicked(false),
            setBtn2Clicked(true),
            setSelectedTecido(''),
            setCor(''),
            setCodigo(''),
            setSelectedItems([]),
            setFornecedor('')
          ]}>
          <Text style={{color: '#FFF'}}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const RenderItem = () => (
    <View>
      <Text style={styles.inputTitle}>Fornecedor:</Text>
      <TouchableOpacity
        style={styles.dropdownSelector}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <Text style={{color: '#666'}}>
          {fornecedor == '' ? 'Empresa' : fornecedor}
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

  const RenderTipos = () => (
    <View>
      <Text style={styles.inputTitle}>Tipo:</Text>
      <TouchableOpacity
        style={styles.dropdownSelector}
        onPress={() => {
          setClicked2(!clicked2);
        }}>
        <Text style={{color: '#666'}}>
          {selectedTipo == ''
            ? 'Selecione o que deseja gerenciar:'
            : selectedTipo}
        </Text>
        {clicked2 ? (
          <Icon name="arrow-drop-up" size={30} color="#666" />
        ) : (
          <Icon name="arrow-drop-down" size={30} color="#666" />
        )}
      </TouchableOpacity>
      {clicked2 ? (
        <View
          style={{
            elevation: 5,
            height: 160,
            alignSelf: 'center',
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: 10,
            position: 'relative',
            zIndex: 1,
          }}>
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
                    color: '#666',
                  }}
                  onPress={() => {
                    setSelectedTipo(item.nome);
                    setClicked2(!clicked2);
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
            position: 'relative',
            zIndex: 1,
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

          <View style={{height: Dimensions.get('window').width / 1}}>
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
    <SafeAreaView style={styles.container}>
      <View>{RenderTipos()}</View>
      {selectedTipo == 'Cores de Tecido' ? RenderPageCor() : null}
      {selectedTipo == 'Característica' ? (
        <View>
          <Text style={{color: '#666'}}>Caracteristica</Text>
        </View>
      ) : null}
      {selectedTipo == 'Peso' ? (
        <View>
          <Text style={{color: '#666'}}>Peso</Text>
        </View>
      ) : null}
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
    marginTop: 10,
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
    marginTop: 10,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: Dimensions.get('window').width / 1.6,
    color: '#666',
  },
  textInputCodigo: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 5,
    marginTop: 10,
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