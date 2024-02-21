import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { OpenAnswerQuestion } from '../models/OpenAnswerQuestion';
import { MultipleAnswerQuestion } from '../models/MultipleAnswerQuestion';
import Icon from 'react-native-vector-icons/FontAwesome'; 


const QuestionDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { questionsForField } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const[isMcAnswerCorrect, setIsMcAnswerCorrect] = useState(null);

  const [isAnswered, setIsAnswered] = useState(false);

  const [userAnswerMC, setUserAnswerMC] = useState([]); 

  const currentQuestion = questionsForField[currentQuestionIndex];
  const [correctAnswers, setCorrectAnswers] = useState(0);
  numberOfQuestions = 0;

    const navigateToSummary = () => {
        let totalQuestions = questionsForField.length;
        navigation.navigate('SummaryScreen', { correctAnswers, totalQuestions });
    };

  const handleAnswer = () => {        
      const isCorrect = userAnswer.toLowerCase() === currentQuestion.rightAnswer.toLowerCase();
      if(isCorrect){
        currentQuestion.step++;
        setCorrectAnswers(correctAnswers + 1);
      }else{
        currentQuestion.step++;
      }
      setIsAnswerCorrect(isCorrect);
      setIsAnswered(true);
  }

  const handleAnswerMC = () =>{
    const isCorrect = mcIsCorrect(userAnswerMC, currentQuestion.rightAnswers);
    if(isCorrect){
        currentQuestion.step++;
        setCorrectAnswers(correctAnswers + 1);
    }else{
        currentQuestion.step--;
    }
    setIsMcAnswerCorrect(isCorrect);
    setIsAnswered(true);
  }

  const mcIsCorrect = (myAnswers, rightAnswers)=> {
    for(let right of rightAnswers){
        if(!(myAnswers.includes(right))){
            return false
        }
    }
    return myAnswers.length == rightAnswers.length;
  }

  const handleSelectAnswer = (index) =>{

    if (userAnswerMC.includes(index)) {
        setUserAnswerMC((prevAnswers) => prevAnswers.filter((item) => item !== index));
      } else {
        setUserAnswerMC((prevAnswers) => [...prevAnswers, index]);
      }
  }

  const handleNextQuestion = () => {
    setUserAnswer('');
    setUserAnswerMC([]);
    setIsAnswerCorrect(null);
    setIsMcAnswerCorrect(null);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setIsAnswered(false);

    if (currentQuestionIndex + 1 === questionsForField.length) {
        navigateToSummary();
      }
  };

  if (!currentQuestion) {
    return (
      <View style={styles.container}>
        <Text>Alle Fragen wurden beantwortet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            {(isAnswerCorrect || isMcAnswerCorrect) && isAnswered && (            
                <Icon name="check-circle" size={30} color="green" />
            )}
            {(!isAnswerCorrect && !isMcAnswerCorrect) && isAnswered && (            
                      <Icon name="times-circle" size={30} color="red" />
            )}
        </View>
      {currentQuestion instanceof OpenAnswerQuestion && (
        <View>
            <TextInput
          style={[
            styles.input, 
            userAnswer == currentQuestion.rightAnswer && isAnswered ? styles.rightAnswerText: null, 
            !(userAnswer == currentQuestion.rightAnswer) && isAnswered ? styles.wrongAnswerText: null, 
        ]}
          placeholder="Antwort eingeben"
          value={userAnswer}
          onChangeText={(text) => setUserAnswer(text)}
          disabled={isAnswered}
        />
        <View style={styles.answerButtonForReal}>
            <Button title="Antwort überprüfen" onPress={handleAnswer} disabled={isAnswered} />
        </View>

      {isAnswerCorrect !== null && (
        <View style={styles.answerResultContainer}>
          <Text>{isAnswerCorrect ? 'Richtig!' : 'Falsch!'}</Text>
          {isAnswerCorrect === false && (
            <Text>Richtige Antwort(en): {currentQuestion.rightAnswer}</Text>
          )}
        </View>
      )}
        </View>
        
      )}
      {(currentQuestion instanceof MultipleAnswerQuestion) && (
        <View>
        {currentQuestion.possibleAnswers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerButton,
              userAnswerMC.includes(index) ? styles.selectedAnswer : null,
              currentQuestion.rightAnswers.includes(index) && isAnswered ? styles.rightAnswerText : null, 
              !currentQuestion.rightAnswers.includes(index) && userAnswerMC.includes(index) && isAnswered ? styles.wrongAnswerText : null, 
              currentQuestion.rightAnswers.includes(index) && !userAnswerMC.includes(index) && isAnswered ? styles.rightWrongText : null, 

            ]}
            onPress={() => handleSelectAnswer(index)}
            disabled={isAnswered}
          >
            <Text>{answer}</Text>
          </TouchableOpacity>
        ))}
        <View style={styles.answerButtonForReal}>
            <Button title='Antwort überprüfen' onPress={() => handleAnswerMC()} disabled={isAnswered} />
        </View>
      </View>
      )}
      <Button title="Nächste Frage" onPress={handleNextQuestion}  />
      <View >
        <Text style={styles.progressContainer}>{`Frage ${currentQuestionIndex + 1} von ${questionsForField.length}`}</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  questionContainer: {
    flexDirection: "row", 
    justifyContent: "space-between"
  }, 
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  rightAnswerText: {
    backgroundColor: "lightgreen"
  }, 
  wrongAnswerText: {
    backgroundColor: "#ff6347"
  }, 
  rightWrongText: {
    backgroundColor: "green"
  },
  answerButton: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 8,
  },
  answerResultContainer: {
    marginTop: 16,
  },
  selectedAnswer: {
    backgroundColor: 'lightblue',
  },
  answerButtonForReal: {
    marginBottom: 16
  }, 
  progressContainer: {
    textAlign: 'center', 
    marginTop: 8
  }
});

export default QuestionDetailScreen;