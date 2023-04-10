import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';

export default function Product({data, addToCart}) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.price}>Nº pedido: {data.id}</Text>
        <Text style={styles.price}>Cliente: {data.client}</Text>
        <Text style={styles.price}>Entrega: {data.term}</Text>
        <Text style={styles.price}>Quantidade: {data.qtd}</Text>
      </View>

      {data.aberta == true ? (
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.buttonEdit} onPress={addToCart}>
            <Icon name="pencil" size={30} color={'#FFF'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonConclusion} onPress={addToCart}>
            <Icon name="check" size={30} color={'#FFF'} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.buttonReOpen} onPress={addToCart}>
            <Icon2 name="ios-arrow-undo" size={30} color={'#FFF'} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 2,
    marginBottom: 14,
    padding: 8,
    paddingBottom: 14,
    paddingTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    color: '#696969',
  },
  buttonEdit: {
    backgroundColor: '#168fff',
    paddingStart: 12,
    paddingEnd: 12,
    paddingTop: 9,
    paddingBottom: 9,
    borderRadius: 5
  },
  buttonConclusion: {
    backgroundColor: '#19C721',
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 9,
    paddingBottom: 9,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonReOpen: {
    backgroundColor: '#FF813D',
    paddingStart: 12,
    paddingEnd: 12,
    paddingTop: 9,
    paddingBottom: 9,
    borderRadius: 5
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  price: {
    color: '#696969',
  },
});
