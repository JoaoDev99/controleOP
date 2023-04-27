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
import firestore from '@react-native-firebase/firestore';
import VisualizarInsumo from '../../components/VisualizadorInsumo';

export default function EstoqueMateriasInsumos() {
  const {createInsumo} = useContext(AuthContext);

  const [btn1Clicked, setBtn1Clicked] = useState(false);
  const [btn2Clicked, setBtn2Clicked] = useState(true);

  const [fornecedor, setFornecedor] = useState('');
  const [cor, setCor] = useState('');
  const [codigo, setCodigo] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const [produto, setProduto] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const [dataInsumo, setDataInsumo] = useState([]);
  const [dataInsumoReserva, setDataReserva] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    if (busca === '') {
      setDataInsumo(dataInsumoReserva);
    } else {
      setDataInsumo(
        dataInsumoReserva.filter(item =>
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

  const parseQuantidade = quantidade => {
    return parseInt(quantidade, 10);
  };

  const getInsumos = () => {
    const unsubscribe = firestore()
      .collection('insumos')
      .orderBy('produto', 'asc')
      .onSnapshot(
        querySnapshot => {
          let d = [];
          querySnapshot.forEach(documentSnapshot => {
            const tecidos = {
              id: documentSnapshot.id,
              produto: documentSnapshot.data().produto,
              fornecedor: documentSnapshot.data().fornecedor,
              cor: documentSnapshot.data().cor,
              codigo: documentSnapshot.data().codigo,
              quantidade: parseQuantidade(documentSnapshot.data().quantidade),
              observacoes: documentSnapshot.data().observacoes,
              estoqueMinimo:
                documentSnapshot.data().estoqueMinimo != ''
                  ? parseQuantidade(documentSnapshot.data().estoqueMinimo)
                  : '',
            };
            d.push(tecidos);
          });
          setDataInsumo(d);
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
    const unsubscribe = getInsumos();
    return () => {
      unsubscribe();
    };
  }, []);

  const RenderAddInsumo = () => (
    <View style={styles.containerAdd}>
      <View>
        <Text style={[styles.inputTitle, {marginTop: 10}]}>Produto:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Digite o nome do produto"
          placeholderTextColor="#C0C0C0"
          autoCorrect={false}
          onChangeText={produto => setProduto(produto)}
          value={produto}
        />
      </View>
      <View>
        <Text style={[styles.inputTitle, {marginTop: 10}]}>Fornecedor:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Digite o nome do fornecedor"
          placeholderTextColor="#C0C0C0"
          autoCorrect={false}
          onChangeText={fornecedor => setFornecedor(fornecedor)}
          value={fornecedor}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text style={styles.inputTitle}>Cor:</Text>
          <TextInput
            style={styles.textInputCor}
            placeholder="Digite a cor"
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
          <Text style={[styles.inputTitle, {marginTop: 10}]}>
            Número de unidades:
          </Text>
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
            createInsumo(
              produto,
              fornecedor,
              cor,
              codigo,
              quantidade,
              observacoes,
            ),
            setBtn1Clicked(false),
            setBtn2Clicked(true),
            setProduto(''),
            setFornecedor(''),
            setCor(''),
            setCodigo(''),
            setQuantidade(''),
            setObservacoes(''),
          ]}>
          <Text style={{color: '#FFF'}}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const RenderPageInsumo = () => (
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
        RenderAddInsumo()
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
              data={dataInsumo}
              keyExtractor={item => item.id}
              renderItem={({item}) => <VisualizarInsumo data={item} />}
            />
          </View>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>{RenderPageInsumo()}</SafeAreaView>
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
    width: Dimensions.get('window').width / 2.5,
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