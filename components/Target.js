import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles';

const Target = ({ target, attempts, hint }) => (
  <View>
    <Text style={styles.target}>Target: {target}</Text>
    <Text style={styles.attempts}>Attempts: {attempts} / 3</Text>
    <Text style={styles.hint}>Hint: {hint}</Text>
  </View>
);

export default Target;
