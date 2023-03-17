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
              <Text style={styles.Text}>{item}</Text>
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
            <Text style={styles.Text}>Compra de Tecido</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.steps}
            onPress={() => {
              steps.push('Ordem de Compra'),
                console.log(steps),
                setClickStep(true);
            }}>
            <Text style={styles.Text}>Ordem de Compra</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.steps}
            onPress={() => {
              steps.push('Ordem de Corte'),
                console.log(steps),
                setClickStep(true);
            }}>
            <Text style={styles.Text}>Ordem de Corte</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.steps}
            onPress={() => {
              steps.push('Ordem de Costura'),
                console.log(steps),
                setClickStep(true);
            }}>
            <Text style={styles.Text}>Ordem de Costura</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.steps}
            onPress={() => {
              steps.push('Vetorização'), console.log(steps), setClickStep(true);
            }}>
            <Text style={styles.Text}>Vetorização</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.steps}
            onPress={() => {
              steps.push('Envio de Imagem'),
                console.log(steps),
                setClickStep(true);
            }}>
            <Text style={styles.Text}>Envio de Imagem</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.steps}
            onPress={() => {
              steps.push('Ordem de Bordado'),
                console.log(steps),
                setClickStep(true);
            }}>
            <Text style={styles.Text}>Ordem de Bordado</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.steps}
            onPress={() => {
              steps.push('Confecção de Tela'),
                console.log(steps),
                setClickStep(true);
            }}>
            <Text style={styles.Text}>Confecção de Tela</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.steps}
            onPress={() => {
              steps.push('Ordem de Estampa'),
                console.log(steps),
                setClickStep(true);
            }}>
            <Text style={styles.Text}>Ordem de Estampa</Text>
          </TouchableOpacity>
        </View>
        {steps.length !== 0 ?
        <View style={styles.containerSteps}>
          <RenderStep />
        </View> : <View></View>}
        <TouchableOpacity style={styles.textInput} onPress={() => navigation.navigate("AddCSV")}>
        <Text style={styles.Text}>
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

  
  steps: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 10,
    marginBottom: 14,
    marginLeft: 5,
    marginRight: 5,
    padding: 8,
    alignItems: 'center',
    flexBasis: '30%'
  },
  stepsSelected: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 10,
    marginBottom: 14,
    marginLeft: 10,
    padding: 8,
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
  Text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
});
