import React from 'react';
import { Button, View } from 'react-native';
import styles from '../styles';

const ActionButton = ({ title, onPress }) => (
  <View style={styles.actionButtonContainer}>
    <Button title={title} onPress={onPress} />
  </View>
);

export default ActionButton;