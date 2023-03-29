import React, { useState } from 'react';
import { View, Text, Picker } from 'react-native';

const MultPicker = () => {
    const [selectedValue, setSelectedValue] = useState('default');
    
    return (
      <View>
        <Text>Selecione uma opção:</Text>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
          mode={'dropdown'}
          multiple={true}
        >
          <Picker.Item label="Opção 1" value="opcao1" />
          <Picker.Item label="Opção 2" value="opcao2" />
          <Picker.Item label="Opção 3" value="opcao3" />
          <Picker.Item label="Opção 4" value="opcao4" />
        </Picker>
        <Text>Opção selecionada: {selectedValue}</Text>
      </View>
    );
  };