import {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/controleop-ef45d.appspot.com/o/Logo.png?alt=media&token=de3d08fd-a7cf-451a-8e8b-f707c2ffca98',
          }}
        />
        <View style={{ marginTop: 40}}>
          <TouchableOpacity style={styles.containerButtons}>
            <Text style={styles.buttonTxt}>ADMINISTRATIVO</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.containerButtons}>
            <Text style={styles.buttonTxt}>COMERCIAL</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.containerButtons}>
            <Text style={styles.buttonTxt}>FINANCEIRO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerImage: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    
  },
  image: {
    width: 326,
    height: 200,
  },
  containerButtons: {
    backgroundColor: '#2088c3',
    borderColor: '#2088c3',
    borderWidth: 1,
    padding: 30,
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonTxt: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center'
  },
});
