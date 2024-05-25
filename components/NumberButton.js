import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const NumberButton = ({ number, onPress, disabled }) => {
  return (
    <TouchableOpacity
      key={number}
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={() => onPress(number)}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{number}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    margin: 5,
    backgroundColor: 'blue',
    borderRadius: 10,
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: '#b0c4de',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default NumberButton;