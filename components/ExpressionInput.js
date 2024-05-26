import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles';

const ExpressionInput = ({ expression }) => (
  <View style={styles.expressionContainer}>
    <Text style={styles.expression}>{expression}</Text>
  </View>
);

export default ExpressionInput;