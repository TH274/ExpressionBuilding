import { StyleSheet } from 'react-native';

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
  actionButtonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default styles;
