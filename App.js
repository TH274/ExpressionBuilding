// App.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';

export default function App() {
  const [numbers, setNumbers] = useState(generateRandomNumbers());
  const [expression, setExpression] = useState('');
  const [usedNumbers, setUsedNumbers] = useState(new Set());
  const [targets, setTargets] = useState([]);
  const [currentTargetIndex, setCurrentTargetIndex] = useState(0);

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
      expression += ` ${randomOperator()} ${shuffledNumbers[i]}`;
    }
    return expression;
  }

  function generateTargets(numbers) {
    const expressions = [];
    for (let i = 0; i < 5; i++) {
      const expression = generateRandomExpression(numbers);
      const result = eval(expression);
      expressions.push({ expression, result });
    }
    return expressions;
  }

  const handleNumberPress = (number, index) => {
    if (!usedNumbers.has(index)) {
      setExpression(expression + number);
      setUsedNumbers(new Set(usedNumbers).add(index));
    }
  };

  const handleOperatorPress = (operator) => {
    setExpression(expression + operator);
  };

  const handleReset = () => {
    setExpression('');
    setUsedNumbers(new Set());
  };

  const handleCheck = () => {
    try {
      const result = eval(expression);
      if (result === targets[currentTargetIndex].result) {
        Alert.alert("You Won!", `Your expression equals the target: ${targets[currentTargetIndex].result}`);
      } else {
        Alert.alert("Try Again", `Your expression equals ${result}, not the target: ${targets[currentTargetIndex].result}`);
      }
    } catch (error) {
      Alert.alert("Invalid Expression", "Your expression could not be evaluated.");
    }
  };

  const handleNextTarget = () => {
    setCurrentTargetIndex((currentTargetIndex + 1) % targets.length);
    handleReset();  // Reset the expression and used numbers when changing the target
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expression Building Game</Text>
      <Text style={styles.target}>Target: {targets[currentTargetIndex]?.result}</Text>
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
        <Button title="Next Target" onPress={handleNextTarget} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  target: {
    fontSize: 20,
    marginBottom: 20,
  },
  expressionContainer: {
    marginBottom: 20,
  },
  expression: {
    fontSize: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  operatorsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: 60,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#B0BEC5',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});
