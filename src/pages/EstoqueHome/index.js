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
});
