import {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {readFile} from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import XLSX from 'xlsx';
import {AuthContext} from '../../routes/AuthProvider';

export default function AdicionarClientes() {
  const {createClient} = useContext(AuthContext);

  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  const {width, height} = Dimensions.get('window');

  const handleClick = () => {
    data.map(item => {
      createClient(item.nome, item.cnpj, item.contato, item.email);
    });
  };

  const importData = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      readFile(res[0].uri, 'ascii')
        .then(res => {
          const wb = XLSX.read(res, {type: 'binary'});
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws, {header: 1});
          const temp = data.map(item => ({
            nome: item[2],
            cnpj: item[7],
            contato: item[12],
            email: item[13],
          }));

          setData(temp);
          setList(temp);
        })
        .catch(e => {
          console.log('Error: ', e);
        });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Seleçao cancelada!');
      } else {
        console.log('Erro desconhecido!' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const RenderStep = ({item}) => (
    <>
      <View>
        <View style={styles.containerSteps2}>
          <View style={styles.containerItem}>
            <Text style={styles.TextId}>CNPJ: </Text>
            <Text style={styles.TextId}>{item.cnpj}</Text>
          </View>
        </View>
        <View style={styles.containerSteps}>
          <View>
            <Text style={styles.Text}>Nome: </Text>
            <TextInput
              style={styles.textInputCor}
              value={data ? data.nome : ''}
              onChangeText={txt => setList({...list, name: txt})}>
              {item.nome}
            </TextInput>
          </View>

          <View style={styles.containerItem}>
            <View>
              <Text style={styles.Text}> Contato: </Text>
              <TextInput style={styles.textInputCont}>{item.contato}</TextInput>
            </View>
          </View>
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.containerBackground}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.btnSeguir}
            onPress={() => importData()}>
            <Text style={{color: '#FFF'}}>Adicionar com CSV</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSeguir}
            onPress={() => createClient(data)}>
            <Text style={{color: '#FFF'}}>Salvar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          keyExtractor={(item, index) => String(index)}
          renderItem={({item}) => <RenderStep item={item} />}
          contentContainerStyle={{paddingBottom: 30}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerBackground: {
    backgroundColor: '#FAFAFA',
    flex: 1,
  },
  container: {
    backgroundColor: '#FAFAFA',
    paddingEnd: 14,
    paddingStart: 14,
    paddingTop: 14,
  },
  containerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerSteps: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 2,
    marginBottom: 14,
    padding: 8,
    paddingBottom: 14,
    paddingTop: 14,
    backgroundColor: '#AED8FF',
  },
  containerSteps2: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 2,
    flex: 1,
    padding: 8,
    paddingBottom: 14,
    paddingTop: 14,
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#6EB9FF',
  },
  containerBtn: {
    padding: 8,
    paddingBottom: 14,
    paddingTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  textInput: {
    borderRadius: 5,
  },
  textInputDesc: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 2,
    padding: 8,
    paddingTop: 12,
    paddingBottom: 15,
    borderRadius: 5,
    marginBottom: 14,
    width: Dimensions.get('window').width / 1.13,
    backgroundColor: '#FFFFFF',
  },
  textInputTmn: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 2,
    marginBottom: 14,
    padding: 8,
    height: 50,
    borderRadius: 5,
    width: Dimensions.get('window').width / 7,
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
  },
  textInputQtd: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 2,
    marginBottom: 14,
    padding: 8,
    height: 50,
    borderRadius: 5,
    width: Dimensions.get('window').width / 7,
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
  },
  textInputPrz: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 2,
    marginBottom: 14,
    padding: 8,
    height: 50,
    borderRadius: 5,
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
  },
  textInputCont: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 2,
    marginBottom: 14,
    padding: 8,
    height: 50,
    borderRadius: 5,
    width: Dimensions.get('window').width / 2.5,
    backgroundColor: '#FFFFFF',
  },
  textInputCor: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 2,
    marginBottom: 14,
    padding: 8,
    height: 50,
    borderRadius: 5,
    width: Dimensions.get('window').width / 1.13,
    backgroundColor: '#FFFFFF',
  },
  TextId: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#000',
  },
  Text: {
    fontSize: 15,
    fontWeight: 'bold',
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
  },
});
