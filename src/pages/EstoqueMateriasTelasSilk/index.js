import React from 'react';
import {View, Button, Alert, PermissionsAndroid} from 'react-native';

export default function App() {
  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
  
      if (
        granted['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Permissões de armazenamento concedidas');
      } else {
        console.log('Permissões de armazenamento negadas');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View>
      <Button title="Solicitar Camera" onPress={requestStoragePermission} />
    </View>
  );
}
