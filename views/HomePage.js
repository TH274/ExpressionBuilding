import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../styles';



function HomePage({ navigation, route }) {
  const { winStreak } = route.params || { winStreak: 0 };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expression Building Game</Text>
      <Text style={styles.lastWinStreak}>Last Win Streak: {winStreak}</Text>
      <Button
        title="Start Game"
        onPress={() => navigation.navigate('Game')}
      />
    </View>
  );
}

export default HomePage;
