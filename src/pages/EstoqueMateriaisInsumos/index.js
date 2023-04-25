import React, {useState, useContext, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import {AuthContext} from '../../routes/AuthProvider';
import {SafeAreaView} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import VisualizarCores from '../../components/VisualizadorTecido';
import CheckBox from '@react-native-community/checkbox';

export default function EstoqueMateriasInsumos() {
  const {createTecido} = useContext(AuthContext);

  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  const [search2, setSearch2] = useState('');
  const [data2, setData2] = useState([]);
  const [list2, setList2] = useState([]);

  const [btn1Clicked, setBtn1Clicked] = useState(false);
  const [btn2Clicked, setBtn2Clicked] = useState(true);

  const [fornecedor, setFornecedor] = useState('');
  const [cor, setCor] = useState('');
  const [codigo, setCodigo] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [tipoTecido, setTipoTecido] = useState('');
  const [tecido, setTecido] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const [displayList, setDisplayList] = useState(false);
  const [displayList2, setDisplayList2] = useState(false);

  const [dataTecido, setDataTecido] = useState([]);
  const [dataTecidoReserva, setDataReserva] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    if (busca === '') {
      setDataTecido(dataTecidoReserva);
    } else {
      setDataTecido(
        dataTecidoReserva.filter(item =>
          busca
            .split(' ')
            .every(
              word =>
                item.fornecedor.toLowerCase().indexOf(word.toLowerCase()) >
                  -1 ||
                item.cor.toLowerCase().indexOf(word.toLowerCase()) > -1 ||
                item.tecido.toLowerCase().indexOf(word.toLowerCase()) > -1 ||
                item.tipoTecido.toLowerCase().indexOf(word.toLowerCase()) > -1,
            ),
        ),
      );
    }
  }, [busca]);

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

  const parseQuantidade = quantidade => {
    return parseInt(quantidade, 10);
  };

  const getTecidos = () => {
    const unsubscribe = firestore()
      .collection('tecidos')
      .orderBy('fornecedor', 'asc')
      .onSnapshot(
        querySnapshot => {
          let d = [];
          querySnapshot.forEach(documentSnapshot => {
            const tecidos = {
              id: documentSnapshot.id,
              fornecedor: documentSnapshot.data().fornecedor,
              cor: documentSnapshot.data().cor,
              codigo: documentSnapshot.data().codigo,
              tecido: documentSnapshot.data().tecido,
              quantidade: parseQuantidade(documentSnapshot.data().quantidade),
              tipoMedida: documentSnapshot.data().tipoMedida,
              tipoTecido: documentSnapshot.data().tipoTecido,
              estoqueMinimo:
                documentSnapshot.data().estoqueMinimo != ''
                  ? parseQuantidade(documentSnapshot.data().estoqueMinimo)
                  : '',
            };
            d.push(tecidos);
          });
          setDataTecido(d);
          setDataReserva(d);
          console.log('Buscou');
        },
        error => {
          console.log('Erro, catch user' + error);
        },
      );

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = getTecidos();
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    getFornecedores(), getTipoTecido();
  }, []);

  const RenderAddCor = () => (
    <View style={styles.containerAdd}>
      {RenderItem()}
      {RenderTipoTecido()}
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
            keyboardType="numeric"
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
        <Text style={[styles.inputTitle, {marginTop: 10}]}>Observações:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Adicione observações caso necessário"
          placeholderTextColor="#C0C0C0"
          autoCorrect={false}
          onChangeText={observacoes => setObservacoes(observacoes)}
          value={observacoes}
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
              observacoes,
            ),
            setBtn1Clicked(false),
            setBtn2Clicked(true),
            setFornecedor(''),
            setCor(''),
            setCodigo(''),
            setSelectedItem(''),
            setTipoTecido(''),
            setObservacoes(''),
          ]}>
          <Text style={{color: '#FFF'}}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const RenderItem = () => (
    <View style={{zIndex: 99}}>
      <Text style={styles.inputTitle}>Fornecedor:</Text>

      <TextInput
        placeholder="Selecione fornecedor"
        placeholderTextColor={'#666'}
        value={search}
        ref={searchRef}
        onChangeText={t => setSearch(t)}
        onFocus={() => {
          setDisplayList(true);
        }}
        style={styles.textInput}
      />

      {displayList && (
        <View
          style={{
            elevation: 5,
            height: 200,
            alignSelf: 'center',
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: 10,
            zIndex: 2,
          }}>
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
                    zIndex: 1,
                  }}
                  onPress={() => {
                    setFornecedor(item.nome);
                    setDisplayList(false);
                    onSearch('');
                    setSearch(item.nome);
                  }}>
                  <Text style={{fontWeight: '400', color: '#666'}}>
                    {item.nome}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );

  useEffect(() => {
    if (search === '') {
      setData(list);
    } else {
      setData(
        list.filter(
          item => item.nome.toLowerCase().indexOf(search.toLowerCase()) > -1,
        ),
      );
    }
  }, [search]);

  const RenderTipoTecido = () => (
    <View style={{marginTop: 10, zIndex: 1}}>
      <Text style={styles.inputTitle}>Tipo do tecido:</Text>
      <TextInput
        placeholder="Selecione o tipo de tecido"
        placeholderTextColor={'#666'}
        value={search2}
        ref={searchRef2}
        onChangeText={t => setSearch2(t)}
        onFocus={() => {
          setDisplayList2(true);
        }}
        style={styles.textInput}
      />

      {displayList2 ? (
        <View
          style={{
            elevation: 5,
            height: 200,
            alignSelf: 'center',
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: 10,
            // position: 'absolute',
            // top: Dimensions.get('window').width / 4.5,
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
                  }}
                  onPress={() => {
                    setTipoTecido(item.nome);
                    setDisplayList2(false);
                    onSearch2('');
                    setSearch2(item.nome);
                    setTecido(item.tecido);
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

  useEffect(() => {
    if (search2 === '') {
      setData2(list2);
    } else {
      setData2(
        list2.filter(
          item => item.nome.toLowerCase().indexOf(search2.toLowerCase()) > -1,
        ),
      );
    }
  }, [search2]);

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
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Pesquisar"
            placeholderTextColor={'#999'}
            value={busca}
            onChangeText={t => setBusca(t)}
          />
          <View
            style={{
              maxHeight: Dimensions.get('window').width * 1.3,
            }}>
            <FlatList
              data={dataTecido}
              keyExtractor={item => item.id}
              renderItem={({item}) => <VisualizarCores data={item} />}
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
    color: '#000',
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
