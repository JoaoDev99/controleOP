import {useState, useContext, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";


export default function AdicionarOP() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.containerBackground}>
      <View style={styles.container}>
        
        <Text style={styles.inputTitle}>Número do Pedido:</Text>
        <TextInput style={styles.textInput} keyboardType="numeric" />

        <Text style={styles.inputTitle}>Prazo:</Text>
        <TextInput style={styles.textInput} keyboardType="numeric" />

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
  containerDate: {
    backgroundColor: '#FAFAFA',
    paddingEnd: 14,
    paddingStart: 14,
    paddingTop: 10,
    width: 200,
  },
  containerOs: {
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
  },
  steps: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 10,
    marginBottom: 14,
    marginLeft: 10,
    padding: 8,
    paddingBottom: 14,
    paddingTop: 14,
    width: 100,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    flexWrap: 'wrap',
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
  buttonDate: {},
  containerAdd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  title2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 20,
    marginLeft: 20,
  },
  dot: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 12,
    position: 'absolute',
    zIndex: 99,
    bottom: -2,
    left: -4,
  },
  dotText: {
    fontSize: 12,
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
  },
});
