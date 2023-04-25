import {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerImage}>
      <Image  style={styles.image} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/controleop-ef45d.appspot.com/o/Logo.png?alt=media&token=5e397998-8ff7-412e-b818-005bf24225fe'}}/>

      
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingEnd: 14,
    paddingStart: 14,
  },
  containerImage: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingEnd: 14,
    paddingStart: 14,
  },
  image: {
    width: 326,
    height:200,
  },
});
