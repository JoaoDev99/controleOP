import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";

export default function ButtonPlus() {
  const navigation = useNavigation();
  return (
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.buttonEdit} onPress={() => navigation.navigate("AddOP")}>
          <Icon name="plus" size={30} color={'#FFF'} />
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  buttonEdit: {
    paddingStart: 12,
    paddingEnd: 12,
    backgroundColor: '#168fff',
    paddingTop: 9,
    paddingBottom: 9,
    borderRadius: 2,
    marginLeft: 10,
  }, 
});
