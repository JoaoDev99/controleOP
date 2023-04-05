import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';

export default function Product({data}) {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.containerInternoCor}>
          <Text style={styles.title}>{data.cor}</Text>
        </View>
        <View style={styles.containerInternoCodigo}>
          <Text style={styles.title}>{data.codigo}</Text>
        </View>
        <View style={styles.containerInternoFornecedor}>
          <Text style={styles.title}>{data.fornecedor}</Text>
        </View>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  containerInternoCor: {
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    padding: 10,
    flexBasis: '30%',
  },
  containerInternoCodigo: {
    borderWidth: 0.5,
    padding: 10,
    flexBasis: '20%',
  },
  containerInternoFornecedor: {
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    padding: 10,
    flexBasis: '50%',
  },
  title: {
    fontWeight: 'bold',
    color: '#696969',
  },
  buttonEdit: {
    paddingStart: 12,
    paddingEnd: 12,
    backgroundColor: '#168fff',
    paddingTop: 9,
    paddingBottom: 9,
    borderRadius: 2,
    marginLeft: 10,
  },
  
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  title: {
    color: '#696969',
  },
});
