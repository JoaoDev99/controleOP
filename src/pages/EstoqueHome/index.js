import {useContext, useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

export default function EstoqueHome() {
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();
  const [refClicked, setRefClicked] = useState(false);
  const [estoqueClicked, setEstoqueClicked] = useState(false);
  const [produtosClicked, setProdutosClicked] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          style={styles.containerButtons}
          onPress={() => [
            setRefClicked(refClicked == true ? false : true),
            setEstoqueClicked(false),
            setProdutosClicked(false),
          ]}>
          <Text style={styles.buttonTxt}>REFERÊNCIAS</Text>
        </TouchableOpacity>

        {refClicked ? (
          <View>
            <View style={styles.containerSubButtons1}>
              <TouchableOpacity
                onPress={() => navigation.navigate('EstoqueReferenciasCores')}>
                <Text style={styles.buttonSubTxt}>Cores</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerSubButtons2}>
              <TouchableOpacity>
                <Text style={styles.buttonSubTxt}>Gramatura</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerSubButtons3}>
              <TouchableOpacity onPress={() => navigation.navigate('EstoqueReferenciasCaracteristicas')}>
                <Text style={styles.buttonSubTxt}>Características</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.containerButtons2}
          onPress={() => [
            setEstoqueClicked(estoqueClicked == true ? false : true),
            setProdutosClicked(false),
            setRefClicked(false),
          ]}>
          <Text style={styles.buttonTxt}>ESTOQUE MATERIAIS</Text>
        </TouchableOpacity>

        {estoqueClicked ? (
          <View>
            <View style={styles.containerSub2Buttons1}>
              <TouchableOpacity>
                <Text style={styles.buttonSubTxt}>AAA</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerSub2Buttons2}>
              <TouchableOpacity>
                <Text style={styles.buttonSubTxt}>BBB</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerSub2Buttons3}>
              <TouchableOpacity>
                <Text style={styles.buttonSubTxt}>CCC</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.containerButtons3}
          onPress={() => [
            setProdutosClicked(produtosClicked == true ? false : true),
            setEstoqueClicked(false),
            setRefClicked(false),
          ]}>
          <Text style={styles.buttonTxt}>ESTOQUE PRODUTOS</Text>
        </TouchableOpacity>

        {produtosClicked ? (
          <View>
            <View style={styles.containerSub3Buttons1}>
              <TouchableOpacity>
                <Text style={styles.buttonSubTxt}>AAA</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerSub3Buttons2}>
              <TouchableOpacity>
                <Text style={styles.buttonSubTxt}>BBB</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerSub3Buttons3}>
              <TouchableOpacity>
                <Text style={styles.buttonSubTxt}>CCC</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  containerButtons: {
    backgroundColor: '#BDE6FC',
    borderColor: '#A8D8ED',
    borderWidth: 1,
    padding: 30,
  },
  containerSubButtons1: {
    backgroundColor: '#9CD9FB',
    padding: 20,
  },
  containerSubButtons2: {
    backgroundColor: '#8CD3FA',
    padding: 20,
  },
  containerSubButtons3: {
    backgroundColor: '#7CCDF9',
    padding: 20,
  },
  containerButtons2: {
    backgroundColor: '#5BC0F8',
    borderColor: '#A8D8ED',
    borderWidth: 1,
    padding: 30,
  },
  containerSub2Buttons1: {
    backgroundColor: '#3AB3F7',
    padding: 20,
  },
  containerSub2Buttons2: {
    backgroundColor: '#1AA7F5',
    padding: 20,
  },
  containerSub2Buttons3: {
    backgroundColor: '#0A96E3',
    padding: 20,
  },
  containerButtons3: {
    backgroundColor: '#008CDA',
    borderColor: '#A8D8ED',
    borderWidth: 0.5,
    padding: 30,
  },
  containerSub3Buttons1: {
    backgroundColor: '#0081C9',
    padding: 20,
  },
  containerSub3Buttons2: {
    backgroundColor: '#0076B8',
    padding: 20,
  },
  containerSub3Buttons3: {
    backgroundColor: '#006BA7',
    padding: 20,
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
  buttonTxt: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222222',
  },
  buttonSubTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    paddingLeft: 35,
  },
});
