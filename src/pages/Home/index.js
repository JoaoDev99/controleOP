import {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {AuthContext} from '../../routes/AuthProvider';
import {SafeAreaView} from 'react-native-safe-area-context';
import OS from '../../components/OS';
import Button from '../../components/ButtonPlus';

export default function Home() {
  const {user} = useContext(AuthContext);
  const [products, setProducts] = useState([
    {
      id: '10-2023',
      client: 'Cine Show',
      term: '20/03/2023',
      qtd: 100,
      aberta: true,
    },
    {
      id: '50-2023',
      client: '365 Supermercados',
      term: '25/03/2023',
      qtd: 150,
      aberta: true,
    },
    {
      id: '40-2023',
      client: 'Pérola',
      term: '30/03/2023',
      qtd: 120,
      aberta: false,
    },
  ]);
  const [btn1Clicked, setBtn1Clicked] = useState(false);
  const [btn2Clicked, setBtn2Clicked] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerAdd}>
        <Text style={styles.title}>Ordens de Produção</Text>
        <Button />
      </View>

      <View style={styles.containerOP}>
        {btn1Clicked ? (
          <View>
            <TouchableOpacity
              style={styles.buttonOP1}
              onPress={() => [setBtn1Clicked(false), setBtn2Clicked(true)]}>
              <Text style={styles.title2}>Abertas</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity style={styles.buttonOP1F}>
              <Text style={styles.title2}>Abertas</Text>
            </TouchableOpacity>
          </View>
        )}

        {btn2Clicked ? (
          <View>
            <TouchableOpacity
              style={styles.buttonOP2}
              onPress={() => [setBtn1Clicked(true), setBtn2Clicked(false)]}>
              <Text style={styles.title2}>Finalizadas</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity style={styles.buttonOP2F}>
              <Text style={styles.title2}>Finalizadas</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <FlatList
        styles={styles.list}
        data={products}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <OS data={item} addToCart={() => handleAddCart(item)} />
        )}
      />
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
  containerOP: {
    borderWidth: 2,
    borderColor: '#999',
    borderRadius: 1,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  containerAdd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonOP1: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#222',
    height: Dimensions.get('window').height / 9.99,
    width: Dimensions.get('window').width / 2.23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOP1F: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#d9d9d9',
    height: Dimensions.get('window').height / 9.99,
    width: Dimensions.get('window').width / 2.20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOP2: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#222',
    height: Dimensions.get('window').height / 9.99,
    width: Dimensions.get('window').width / 2.19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOP2F: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#d9d9d9',
    height: Dimensions.get('window').height / 9.99,
    width: Dimensions.get('window').width / 2.16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 20,
    color: '#696969',
  },
  title2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#696969',
  },
});
