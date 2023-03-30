import {useState, useContext, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {readFile} from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import XLSX from 'xlsx';

export default function AdicionarOP() {
  const [data, setData] = useState([]);

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
            item: item[0],
            descricao: item[1],
            tamanho: item[2],
            cor: item[3],
            quantidade: item[4],
            valorUnitario: item[5],
            valorTotal: item[6],
            prazo: item[7],
          }));

          setData(temp);
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

  const RenderItem = ({item}) => (
    <View>
      <View style={styles.containerSteps2}>
        <View style={styles.containerItem}>
          <Text style={styles.TextId}>Id: </Text>
          <Text style={styles.TextId}>{item.item}</Text>
        </View>
      </View>
      <View style={styles.containerSteps}>
        <View>
          <Text style={styles.Text}>Descrição: </Text>
          <TextInput
            multiline={true}
            numberOfLines={1}
            style={styles.textInputDesc}>
            {item.descricao}
          </TextInput>
        </View>

        <View style={styles.containerItem}>
          <View style={{flexBasis: '33.33%'}}>
            <Text style={styles.Text}>Tamanho: </Text>
            <TextInput style={styles.textInputTmn}>{item.tamanho}</TextInput>
          </View>
          <View style={{flexBasis: '33.33%'}}>
            <Text style={styles.Text}>Quantidade: </Text>
            <TextInput style={styles.textInputQtd}>{item.quantidade}</TextInput>
          </View>
          <View style={{flexBasis: '33.33%'}}>
            <Text style={styles.Text}>Prazo: </Text>
            <TextInput style={styles.textInputPrz}>{item.prazo}</TextInput>
          </View>
        </View>

        <View>
          <Text style={styles.Text}>Cor: </Text>
          <TextInput style={styles.textInputCor}>{item.cor}</TextInput>
        </View>

        <View style={styles.containerItem}>
          <View style={{flexBasis: '50%'}}>
            <Text style={styles.Text}>Valor Unitário: </Text>
            <TextInput style={styles.textInputVlr}>
              {item.valorUnitario}
            </TextInput>
          </View>
          <View style={{flexBasis: '50%'}}>
            <Text style={styles.Text}>Valor Total: </Text>
            <TextInput style={styles.textInputVlr}>{item.valorTotal}</TextInput>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.containerBackground}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.btnSeguir}
            onPress={() => importData()}>
            <Text style={{color: '#FFF'}}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          keyExtractor={(item, index) => String(index)}
          renderItem={({item}) => <RenderItem item={item} />}
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
  textInputVlr: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 2,
    marginBottom: 14,
    padding: 8,
    height: 50,
    borderRadius: 5,
    width: Dimensions.get('window').width / 4,
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
    fontSize: 30,
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
    flexBasis: '30%',
  },
});
