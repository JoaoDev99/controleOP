import {useState, useContext, useEffect} from 'react';
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

export default function EstoqueHome() {
  const {user} = useContext(AuthContext);

  const [btn1Clicked, setBtn1Clicked] = useState(false);
  const [btn2Clicked, setBtn2Clicked] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Tecidos</Text>
        <Button />
      
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
    width: Dimensions.get('window').width / 2.2,
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
