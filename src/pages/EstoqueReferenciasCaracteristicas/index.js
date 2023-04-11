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
import VisualizarCaracteristicas from '../../components/VisualizadorCaracteristicas';

export default function EstoqueReferecias() {
  const {createCaracteristicaRef} = useContext(AuthContext);
  const [btn1Clicked, setBtn1Clicked] = useState(false);
  const [btn2Clicked, setBtn2Clicked] = useState(true);
  const [caracteristica, setCaraceristica] = useState('');
  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState(true);

  const getCaracteristicas = () => {
    firestore()
      .collection('caractRef')
      .orderBy('caracteristica', 'asc')
      .get()
      .then(querySnapshot => {
        let d = [];
        querySnapshot.forEach(documentSnapshot => {
          const user = {
            id: documentSnapshot.id,
            caracteristica: documentSnapshot.data().caracteristica,
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
    getCaracteristicas();
  }, [clicked]);

  const RenderAddCor = () => (
    <View style={styles.containerAdd}>
      <View>
        <Text style={styles.inputTitle}>Característica:</Text>
        <TextInput
          style={styles.textInputCor}
          placeholder="Digite a característica..."
          placeholderTextColor="#C0C0C0"
          autoCorrect={false}
          onChangeText={caracteristica => setCaraceristica(caracteristica)}
          value={caracteristica}
        />
      </View>

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.btnSeguir}
          onPress={() => [
            createCaracteristicaRef(caracteristica),
          ]}>
          <Text style={{color: '#FFF'}}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
                setClicked(clicked == false ? true : false),
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
                setClicked(clicked == false ? true : false),
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
          <View
            style={{
              maxHeight: Dimensions.get('window').width * 1.2,
              borderWidth: 1,
            }}>
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              renderItem={({item}) => <VisualizarCaracteristicas data={item} />}
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
    width: '100%',
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
