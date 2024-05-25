import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Target = ({ target }) => {
  return (
    <Text style={styles.target}>Target: {target?.result}</Text>
  );
};

const styles = StyleSheet.create({
  target: {
    fontSize: 22,
    marginBottom: 10,
    color: '#333',
  },
});

export default Target;