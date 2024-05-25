import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

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

function Game({ navigation }) {
  const [numbers, setNumbers] = useState(generateRandomNumbers());
  const [expression, setExpression] = useState('');
  const [usedNumbers, setUsedNumbers] = useState(new Set());
  const [targets, setTargets] = useState([]);
  const [currentTargetIndex, setCurrentTargetIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [lastInput, setLastInput] = useState(null); // Track the last input
  const [showNextTargetButton, setShowNextTargetButton] = useState(false);
  const [hint, setHint] = useState('');
  const [gameLost, setGameLost] = useState(false); // New state for tracking game loss

  useEffect(() => {
    setTargets(generateTargets(numbers));
  }, [numbers]);

  function generateRandomNumbers() {
    return Array.from({ length: 4 }, () => Math.floor(Math.random() * 99) + 1);
  }

  function generateRandomExpression(numbers) {
    const shuffledNumbers = [...numbers].sort(() => Math.random() - 0.5);
    const operators = ['+', '-', '*', '/'];
    const randomOperator = () => operators[Math.floor(Math.random() * operators.length)];

    let expression = `${shuffledNumbers[0]}`;
    for (let i = 1; i < shuffledNumbers.length; i++) {
      const operator = randomOperator();
      const number = shuffledNumbers[i];

      if (operator === '/') {
        expression += ` / ${number}`;
      } else {
        expression += ` ${operator} ${number}`;
      }
    }
    return expression;
  }

  function generateTargets(numbers) {
    const expressions = [];
    while (expressions.length < 5) {
      const expression = generateRandomExpression(numbers);
      let result = eval(expression);

      if (Number.isInteger(result)) {
        expressions.push({ expression, result });
      }
    }
    return expressions;
  }

  const handleNumberPress = (number, index) => {
    if (lastInput === 'number' || usedNumbers.has(index)) {
      return; // Prevent entering two numbers consecutively
    }

    setExpression(expression + number);
    setUsedNumbers(new Set(usedNumbers).add(index));
    setLastInput('number');
  };

  const handleOperatorPress = (operator) => {
    if (lastInput === 'operator' || expression === '') {
      return; // Prevent entering two operators consecutively or starting with an operator
    }

    setExpression(expression + operator);
    setLastInput('operator');
  };

  const handleReset = () => {
    setExpression('');
    setUsedNumbers(new Set());
    setLastInput(null);
    setHint('');
    setGameLost(false); // Reset game loss state
  };

const handleCheck = () => {
  try {
    const result = eval(expression);
    if (result === targets[currentTargetIndex].result) {
      Alert.alert(
        "You Won!",
        `Your expression equals the target: ${targets[currentTargetIndex].result}`,
        [
          {
            text: "Next Target",
            onPress: handleNextTarget
          }
        ]
      );
      setShowNextTargetButton(true);
    } else {
      if (attempts < 2) {
        Alert.alert("Try Again", `Your expression equals ${result}, not the target: ${targets[currentTargetIndex].result}`);
      } else if (attempts === 2) {
        setGameLost(true);
        Alert.alert("Game Over", `You lose! The correct expression was ${targets[currentTargetIndex]?.expression}`, [
          { text: "OK", onPress: () => navigation.navigate('Home') }
        ]);
      }
      setAttempts(prev => prev + 1);
    }
  } catch (error) {
    Alert.alert("Invalid Expression", "Your expression could not be evaluated.");
  }
};

  const handleNextTarget = () => {
    const newNumbers = generateRandomNumbers();
    setNumbers(newNumbers);
    setCurrentTargetIndex((currentTargetIndex + 1) % 5);
    handleReset();
    setAttempts(0);
    setShowNextTargetButton(false);
  };

  const handleHint = () => {
    const targetExpression = targets[currentTargetIndex]?.expression;
    const partialHint = targetExpression ? targetExpression.split(' ').slice(0, 3).join(' ') : '';
    setHint(partialHint);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expression Building Game</Text>
      <Text style={styles.target}>Target: {targets[currentTargetIndex]?.result}</Text>
      <Text style={styles.attempts}>Attempts: {attempts} / 3</Text>
      <Text style={styles.hint}>Hint: {hint}</Text>
      <View style={styles.expressionContainer}>
        <Text style={styles.expression}>{expression}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        {numbers.map((number, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, usedNumbers.has(index) && styles.disabledButton]}
            onPress={() => handleNumberPress(number, index)}
            disabled={usedNumbers.has(index)}
          >
            <Text style={styles.buttonText}>{number}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.operatorsContainer}>
        {['+', '-', '*', '/'].map((operator, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => handleOperatorPress(operator)}
          >
            <Text style={styles.buttonText}>{operator}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.actionButtonsContainer}>
        <Button title="Reset" onPress={handleReset} />
        <Button title="Check" onPress={handleCheck} />
        <Button title="Hint" onPress={handleHint} />
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Game" component={Game} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  target: {
    fontSize: 22,
    marginBottom: 10,
    color: '#333',
  },
  attempts: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
  },
  hint: {
    fontSize: 18,
    marginBottom: 20,
    color: '#999',
  },
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
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    padding: 15,
    margin: 5,
    backgroundColor: '#87ceeb',
    borderRadius: 10,
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: '#b0c4de',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  operatorsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});
