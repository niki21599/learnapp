import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { learningFields } from '../models/dummyData'; 
import { MultipleAnswerQuestion } from '../models/MultipleAnswerQuestion';
import { OpenAnswerQuestion } from '../models/OpenAnswerQuestion';

const QuestionScreen = () => {
  const navigation = useNavigation();

  let [questions, setQuestions] = useState([]);

  const baseUrl = "https://app-project-etdz.onrender.com";

  useEffect(() => {
    let urlOfMultipleChoiceQuestions = baseUrl + "/questions";

    fetch(urlOfMultipleChoiceQuestions)
    .then((resp) => resp.json())
    .then((data)=> {
      let tempQuestions = []; 
      for(let question of data){
        let learningField = learningFields.find(x => x.id == question.learningField_id)

        if(question.type == 1){
          tempQuestions.push(new MultipleAnswerQuestion(question.id, question.question, question.possibleAnswers, question.rightAnswers, learningField, question.step));
        }else if(question.type == 2){
          tempQuestions.push(new OpenAnswerQuestion(question.id, question.question, question.rightAnswer, learningField, question.step));
        }
      }
      setQuestions(tempQuestions);
    });
  }, []);

  const getQuestionsFilteredQuestions = (learningField) =>{
     
    let filteredQuestions = questions.filter((question) => question.learningField === learningField);
    let sortedQuestions = [...filteredQuestions].sort((a, b) => a.step - b.step);
    sortedQuestions = sortedQuestions.slice(0, 10);
    return sortedQuestions;
  }

  getSortedQuestions = () => {
    let sortedQuestions = [...questions].sort((a, b) => a.step - b.step);
    sortedQuestions = sortedQuestions.slice(0, 10);
    return sortedQuestions;
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Jetzt wiederholen"
          onPress={() => {
            navigation.navigate('QuestionDetailScreen', { questionsForField: getSortedQuestions() });
          }}
        />
      </View>
      <FlatList
        data={learningFields}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.learningFieldContainer}
            onPress={() => navigation.navigate('QuestionDetailScreen', { questionsForField: getQuestionsFilteredQuestions(item) })}
          >
            <Text style={styles.learningFieldTitle}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    marginBottom: 16
  },
  learningFieldContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  learningFieldTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuestionScreen;
