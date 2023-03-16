import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useState, useContext, useRef} from 'react';
import { AuthContext } from '../../routes/AuthProvider';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {register} = useContext(AuthContext);

  const {login} = useContext(AuthContext);

  return (
    <View style={styles.containerBackground}>
      <View style={styles.container}>
        <Text style={styles.inputTitle}>Login:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Login"
          placeholderTextColor="#313131"
          value={email}
          onChangeText={value => setEmail(value)}
          autoCapitalize='none'
          keyboardType='email-address'
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.inputTitle}>Senha:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Senha"
          placeholderTextColor="#313131"
          value={password}
          onChangeText={value => setPassword(value)}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={styles.buttonSubmit} onPress={() => register(email, password)}>
        <Text>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonSubmit} onPress={() => login(email, password)}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
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
  textInput: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 2,
    marginBottom: 14,
    padding: 8,
    paddingBottom: 14,
    paddingTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    height: 50,
    borderRadius: 5,
  },
  inputTitle: {
    color: '#696969',
  },
  buttonSubmit: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 2,
    marginBottom: 14,
    padding: 8,
    paddingBottom: 14,
    paddingTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    height: 50,
    borderRadius: 5,
    width: 100,
    marginLeft:15
  },
});
