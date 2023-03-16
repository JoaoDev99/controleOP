import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";


export default function AdicionarOS() {
  const navigation = useNavigation();
  const [steps, setSteps] = useState([]);
  const [clickStep, setClickStep] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setClickStep(false);
    }, [clickStep]),
  );

  const remove = () => {
    steps.pop(), console.log(steps), setClickStep(true);
  };

  const RenderStep = () => {
    return (
      <FlatList
        data={steps}
        horizontal
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.stepsSelected}
              onPress={() => {
                remove();
              }}>
              <Text>{item}</Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.containerBackground}>
      <View style={styles.container}>
        <View style={styles.containerSteps}>
          <TouchableOpacity
            style={styles.steps}
            onPress={() => {
              steps.push('Compra de Tecido'),
                console.log(steps),
                setClickStep(true);
            }}>
            <Text>Compra de Tecido</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.steps}
            onPress={() => {
              steps.push('Ordem de Compra'),
                console.log(steps),
                setClickStep(true);
            }}>
            <Text>Ordem de Compra</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.steps}
            onPress={() => {
              steps.push('Ordem de Corte'),
                console.log(steps),
                setClickStep(true);
            }}>
            <Text>Ordem de Corte</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.steps}
            onPress={() => {
              steps.push('Ordem de Costura'),
                console.log(steps),
                setClickStep(true);
            }}>
            <Text>Ordem de Costura</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.steps}
            onPress={() => {
              steps.push('Vetorização'), console.log(steps), setClickStep(true);
            }}>
            <Text>Vetorização</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.steps}
            onPress={() => {
              steps.push('Envio de Imagem'),
                console.log(steps),
                setClickStep(true);
            }}>
            <Text>Envio de Imagem</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.steps}
            onPress={() => {
              steps.push('Ordem de Bordado'),
                console.log(steps),
                setClickStep(true);
            }}>
            <Text>Ordem de Bordado</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.steps}
            onPress={() => {
              steps.push('Confecção de Tela'),
                console.log(steps),
                setClickStep(true);
            }}>
            <Text>Confecção de Tela</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.steps}
            onPress={() => {
              steps.push('Ordem de Estampa'),
                console.log(steps),
                setClickStep(true);
            }}>
            <Text>Ordem de Estampa</Text>
          </TouchableOpacity>
        </View>
        {steps.length !== 0 ?
        <View style={styles.containerSteps}>
          <RenderStep />
        </View> : <View></View>}
        <TouchableOpacity style={styles.textInput} onPress={() => navigation.navigate("AddCSV")}>
        <Text>
          Seguir
        </Text>
      </TouchableOpacity>
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
  stepsSelected: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 10,
    marginBottom: 14,
    marginLeft: 10,
    padding: 8,
    paddingBottom: 14,
    paddingTop: 14,
    width: 100,
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
