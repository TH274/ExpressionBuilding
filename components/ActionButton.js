import React from 'react';
import { Button } from 'react-native';

const ActionButton = ({ title, onPress }) => {
  return <Button title={title} onPress={onPress} />;
};

export default ActionButton;