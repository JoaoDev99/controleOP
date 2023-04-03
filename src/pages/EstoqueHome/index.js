import {useContext} from 'react';
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

export default function EstoqueHome() {
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      
        <TouchableOpacity style={styles.containerButtons}>
          <Text style={styles.buttonTxt} onPress={() => navigation.navigate('EstoqueReferencias')}>PRODUTOS REFERÊNCIAS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerButtons2}>
          <Text style={styles.buttonTxt}>ESTOQUE MATERIAIS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerButtons3}>
          <Text style={styles.buttonTxt}>ESTOQUE PRODUTOS</Text>
        </TouchableOpacity>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  containerButtons: {
    backgroundColor: '#BDEBFF',
    borderColor: '#A8D8ED',
    borderWidth: 0.5,
    padding: 30,
  },
  containerButtons2: {
    backgroundColor: '#A3E3FF',
    borderColor: '#A8D8ED',
    borderWidth: 0.5,
    padding: 30,
  },
  containerButtons3: {
    backgroundColor: '#8ADBFF',
    borderColor: '#A8D8ED',
    borderWidth: 0.5,
    padding: 30,
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
    color: '#444444',
  },
});
