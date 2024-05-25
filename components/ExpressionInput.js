import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const ExpressionInput = ({ expression }) => {
  return (
    <View style={styles.expressionContainer}>
      <Text style={styles.expression}>{expression}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  expressionContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  expression: {
    fontSize: 24,
    color: '#333',
  },
});

export default ExpressionInput;
