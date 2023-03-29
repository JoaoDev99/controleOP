import React from 'react';
import { View } from 'react-native';
import Multiplicker from '../../components/Multipicker';

const options = [
  { label: 'Opção 1', value: 'option1' },
  { label: 'Opção 2', value: 'option2' },
  { label: 'Opção 3', value: 'option3' },
];

const MyComponent = () => {
  return (
    <View>
      <Multiplicker options={options} />
    </View>
  );
};

export default MyComponent;