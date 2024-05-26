import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../styles';

const NumberButton = ({ number, onPress, disabled }) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.disabledButton]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={styles.buttonText}>{number}</Text>
  </TouchableOpacity>
);

export default NumberButton;