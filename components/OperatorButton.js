import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../styles';

const OperatorButton = ({ operator, onPress }) => (
  <TouchableOpacity
    style={styles.button}
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{operator}</Text>
  </TouchableOpacity>
);

export default OperatorButton;
