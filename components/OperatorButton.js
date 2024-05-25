import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const OperatorButton = ({ operator, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => onPress(operator)}>
      <Text style={styles.buttonText}>{operator}</Text>
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
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default OperatorButton;