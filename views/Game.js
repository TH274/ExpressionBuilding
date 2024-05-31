import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import styles from '../styles';
import NumberButton from '../components/NumberButton';
import OperatorButton from '../components/OperatorButton';
import ActionButton from '../components/ActionButton';
import ExpressionInput from '../components/ExpressionInput';
import Target from '../components/Target';
import Hint from '../components/Hint';

function Game({ navigation }) {
  const [numbers, setNumbers] = useState(generateRandomNumbers());
  const [expression, setExpression] = useState('');
  const [usedNumbers, setUsedNumbers] = useState(new Set());
  const [targets, setTargets] = useState([]);
  const [currentTargetIndex, setCurrentTargetIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [lastInput, setLastInput] = useState(null);
  const [showNextTargetButton, setShowNextTargetButton] = useState(false);
  const [hint, setHint] = useState('');
  const [hintCount, setHintCount] = useState(0);
  const [gameLost, setGameLost] = useState(false);
  const [winStreak, setWinStreak] = useState(0);

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
      return;
    }

    setExpression(expression + number);
    setUsedNumbers(new Set(usedNumbers).add(index));
    setLastInput('number');
  };

  const handleOperatorPress = (operator) => {
    if (lastInput === 'operator' || expression === '') {
      return;
    }

    setExpression(expression + operator);
    setLastInput('operator');
  };

  const handleReset = () => {
    setExpression('');
    setUsedNumbers(new Set());
    setLastInput(null);
    setGameLost(false);
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
        setWinStreak(winStreak + 1);
      } else {
        if (attempts < 2) {
          Alert.alert("Try Again", `Your expression equals ${result}, not the target: ${targets[currentTargetIndex].result}`);
        } else if (attempts === 2) {
          setGameLost(true);
          setWinStreak(0);
          Alert.alert("Game Over", `You lose! The correct expression was ${targets[currentTargetIndex]?.expression}`, [
            { text: "OK", onPress: () => navigation.navigate('Home', { winStreak}) }
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
    setHint('');
    setAttempts(0);
    setShowNextTargetButton(false);
  };

  const handleHint = () => {
    if (hintCount < 2) {
      const targetExpression = targets[currentTargetIndex]?.expression;
      const partialHint = targetExpression ? targetExpression.split(' ').slice(0, 3).join(' ') : '';
      setHint(partialHint);
      setHintCount(prev => prev + 1);
    } else {
      Alert.alert("No more hints", "You have used all available hints.");
    }
  };

  return (
    <View style={styles.container}>
    <View style={styles.HintContainer}>
      <Text style={styles.hintCountText}>{2 - hintCount}</Text>
      <Hint title="Hint" onPress={handleHint} disabled={hintCount >= 2}/>
    </View>
    <View style={styles.streakContainer}>
       <Text style={styles.streakText}>Win Streak: {winStreak}</Text>
    </View>
      <Target target={targets[currentTargetIndex]?.result} attempts={attempts} hint={hint} />
      <ExpressionInput expression={expression} />
      <View style={styles.buttonsContainer}>
        {numbers.map((number, index) => (
          <NumberButton
            key={index}
            number={number}
            onPress={() => handleNumberPress(number, index)}
            disabled={usedNumbers.has(index)}
          />
        ))}
      </View>
      <View style={styles.operatorsContainer}>
        {['+', '-', '*', '/'].map((operator, index) => (
          <OperatorButton
            key={index}
            operator={operator}
            onPress={() => handleOperatorPress(operator)}
          />
        ))}
      </View>
      <View style={styles.actionButtonsContainer}>
        <ActionButton title="Reset" onPress={handleReset} />
        <ActionButton title="Check" onPress={handleCheck} />
      </View>
       <View style={styles.resultContainer}>
              <Text style={styles.resultText}>Test result: {targets[currentTargetIndex]?.expression}</Text>
            </View>
    </View>
  );
}

export default Game;
