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
    fontSize: 35,
    marginBottom: 10,
    color: '#333',
  },
  attempts: {
    fontSize: 25,
    marginBottom: 20,
    color: '#666',
  },
  hint: {
    fontSize: 25,
    marginBottom: 23,
    color: '#999',
  },
  expressionContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  expression: {
    fontSize: 25,
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    backgroundColor: '#87ceeb',
    borderRadius: 10,
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: '#b0c4de',
  },
  buttonText: {
    fontSize: 28,
    color: '#fff',
  },
  operatorsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
    width: '90%',
  },
  actionButtonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  resultContainer: {
    marginTop: 20,
    },
  resultText: {
    fontSize: 18,
    color: '#333',
    },
  HintContainer: {
     position: 'absolute',
     top: 8,
     right: 12,
     flexDirection: 'row',
   },
   hintCountText: {
     fontSize: 22,
     color: '#333',
     margin: 3,
     marginRight: 8,
   },
   streakContainer: {
   position: 'absolute',
   top: 12,
   left: 12,
   },
     lastWinStreak: {
       fontSize: 20,
       marginBottom: 10,
       color: '#666',
     },
});




export default styles;
