import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../styles';

function HomePage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Expression Building Game</Text>
      <Button
        title="Start Game"
        onPress={() => navigation.navigate('Game')}
      />
    </View>
  );
}

export default HomePage;
