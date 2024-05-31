import React from 'react';
import { TouchableOpacity } from 'react-native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const Hint = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Icon name="lightbulb-o" size={30} color="#333" />
  </TouchableOpacity>
);

export default Hint;