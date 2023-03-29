import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const MultiplickerOption = ({ option, isSelected, onSelect }) => {
  return (
    <TouchableOpacity onPress={onSelect}>
      <View>
        <Text>{option.label}</Text>
        {isSelected && <Text>Selecionado</Text>}
      </View>
    </TouchableOpacity>
  );
};

const Multiplicker = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleOption = (option) => {
    const index = selectedOptions.indexOf(option.value);
    if (index === -1) {
      setSelectedOptions([...selectedOptions, option.value]);
    } else {
      const newOptions = [...selectedOptions];
      newOptions.splice(index, 1);
      setSelectedOptions(newOptions);
    }
  };

  const getSelectedOptions = () => {
    return selectedOptions;
  };

  return (
    <View>
      {options.map((option) => (
        <MultiplickerOption
          key={option.value}
          option={option}
          isSelected={selectedOptions.indexOf(option.value) !== -1}
          onSelect={() => toggleOption(option)}
        />
      ))}
    </View>
  );
};

export default Multiplicker;