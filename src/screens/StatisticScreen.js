import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { learningFields } from '../models/dummyData'; 
import { MultipleAnswerQuestion } from '../models/MultipleAnswerQuestion';
import { OpenAnswerQuestion } from '../models/OpenAnswerQuestion';

const StatisticScreen = () => {
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

  const calculateOverallProgress = () => {
    if(questions.length == 0)
      return 0;
    
    const totalQuestions = questions.length;
    let sum = 0;
    for(let question of questions){
      sum += question.step;
    }    
    const overallProgress = (sum / (totalQuestions * 3)) * 100;
    return Math.round(overallProgress);
  };

  const calculateFieldProgress = (learningField) => {
    if(questions.length == 0)
      return 1;
    
    let fieldQuestions = questions.filter((question) => question.learningField.id == learningField.id);
    if(fieldQuestions.length == 0)
      return 1;
    else{
      let sum = 0;
      for(let question of fieldQuestions){
        sum += question.step;
      }   
      const fieldProgress = (sum / (fieldQuestions.length * 3)) * 100;
      return Math.round(fieldProgress);
    }
    
  };

  return (
    <View style={styles.container}>
      <View  style={styles.fieldContainer}>
      <View style={styles.headlineContainer}>
      <Text style={styles.fieldTitle}>Gesamtfortschritt</Text>
          <Text style={styles.fieldProgressText}>{calculateOverallProgress()}%</Text>
      </View>
          <Progress.Bar width={null} height={8} progress={calculateOverallProgress() / 100} ></Progress.Bar>
        </View>
      {learningFields.map((learningField) => (
        <View key={learningField.name} style={styles.fieldContainer}>
          <View style={styles.headlineContainer}>
            <Text style={styles.fieldTitle}>{learningField.name}</Text>
            <Text style={styles.fieldProgressText}>{calculateFieldProgress(learningField)}%</Text>
          </View>
          <Progress.Bar width={null} height={8} progress={calculateFieldProgress(learningField) / 100} ></Progress.Bar>
          
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  overallProgressText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  fieldProgressText: {
    fontSize: 16,
    textAlign: "right"
  }, 
  progressBar: {
    width: "100%"
  }, 
  headlineContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between'
  }
  
});

export default StatisticScreen;
