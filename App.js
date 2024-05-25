import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	Alert,
	TouchableOpacity,
} from "react-native";
import NumberButton from "./components/NumberButton";
import OperatorButton from "./components/OperatorButton";
import Target from "./components/Target";
import ExpressionInput from "./components/ExpressionInput";
import ActionButton from "./components/ActionButton";

export default function App() {
	const [numbers, setNumbers] = useState(generateRandomNumbers());
	const [expression, setExpression] = useState("");
	const [usedNumbers, setUsedNumbers] = useState(new Set());
	const [targets, setTargets] = useState([]);
	const [currentTargetIndex, setCurrentTargetIndex] = useState(0);
	const [attempts, setAttempts] = useState(0);

	useEffect(() => {
		setTargets(generateTargets(numbers));
	}, [numbers]);

	function generateRandomNumbers() {
		return Array.from({ length: 4 }, () => Math.floor(Math.random() * 99) + 1);
	}

	function generateRandomExpression(numbers) {
		const shuffledNumbers = [...numbers].sort(() => Math.random() - 0.5);
		const operators = ["+", "-", "*", "/"];
		const randomOperator = () =>
			operators[Math.floor(Math.random() * operators.length)];

		let expression = `${shuffledNumbers[0]}`;
		for (let i = 1; i < shuffledNumbers.length; i++) {
			const operator = randomOperator();
			const number = shuffledNumbers[i];

			if (operator === "/") {
				// Ensure the division results in an integer
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

			// Ensure the result is an integer
			if (Number.isInteger(result)) {
				expressions.push({ expression, result });
			}
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
		setExpression("");
		setUsedNumbers(new Set());
		setAttempts(0); // Reset attempts when resetting the expression
	};

	const handleCheck = () => {
		if (attempts >= 3) {
			Alert.alert(
				"No more attempts",
				"You have reached the maximum number of attempts."
			);
			return;
		}

		try {
			const result = eval(expression);
			if (result === targets[currentTargetIndex].result) {
				Alert.alert(
					"You Won!",
					`Your expression equals the target: ${targets[currentTargetIndex].result}`
				);
			} else {
				Alert.alert(
					"Try Again",
					`Your expression equals ${result}, not the target: ${targets[currentTargetIndex].result}`
				);
			}
			setAttempts(attempts + 1);
		} catch (error) {
			Alert.alert(
				"Invalid Expression",
				"Your expression could not be evaluated."
			);
		}
	};

	const handleNextTarget = () => {
		const newNumbers = generateRandomNumbers();
		setNumbers(newNumbers);
		setCurrentTargetIndex((currentTargetIndex + 1) % 5); // Reset index to stay within bounds
		handleReset(); // Reset the expression, used numbers, and attempts when changing the target
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Expression Building Game</Text>
			<Target target={targets[currentTargetIndex]?.result} />
			<Text style={styles.attempts}>Attempts: {attempts} / 3</Text>
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
				{["+", "-", "*", "/"].map((operator, index) => (
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
				<ActionButton title="Next Target" onPress={handleNextTarget} />
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f0f8ff",
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#333",
	},
	target: {
		fontSize: 22,
		marginBottom: 10,
		color: "#333",
	},
	attempts: {
		fontSize: 18,
		marginBottom: 20,
		color: "#666",
	},
	expressionContainer: {
		flexDirection: "row",
		marginBottom: 20,
		padding: 10,
		backgroundColor: "#fff",
		borderRadius: 10,
		elevation: 2,
	},
	expression: {
		fontSize: 24,
		color: "#333",
	},
	buttonsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		marginBottom: 20,
	},
	button: {
		padding: 15,
		margin: 5,
		backgroundColor: "#87ceeb",
		borderRadius: 10,
		elevation: 2,
	},
	disabledButton: {
		backgroundColor: "#b0c4de",
	},
	buttonText: {
		fontSize: 18,
		color: "#fff",
	},
	operatorsContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginBottom: 20,
	},
	actionButtonsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "80%",
	},
});
