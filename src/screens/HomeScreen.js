import React, {useEffect, useState} from "react";
import { useNavigation } from '@react-navigation/native';
import { Text, StyleSheet, View, TouchableOpacity, Button } from "react-native"; 
import * as Progress from 'react-native-progress';
import { MultipleAnswerQuestion } from "../models/MultipleAnswerQuestion";
import { OpenAnswerQuestion } from "../models/OpenAnswerQuestion";
import { Video } from "../models/Video";
import { learningFields } from "../models/dummyData";

const HomeScreen = () => {
  const navigation = useNavigation();

  let [videos, setVideos]= useState([]);
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

    let urlForVideos = baseUrl + "/videos";

    fetch(urlForVideos)
    .then((resp) => resp.json())
    .then((data)=> {
      let tempVideos = [];
      for(let video of data){
        let learningField = learningFields.find(x => x.id == video.learningField_id); 
        tempVideos.push(new Video(video.id, video.name, learningField, video.isComplete));
      }
      setVideos(tempVideos);
    })
  })

  const calculateOverallProgress = () => {
    if(questions.length == 0)
      return 0;
    console.log(questions)
    const totalQuestions = questions.length;
    let sum = 0;
    for(let question of questions){

      sum += question.step;
    }
    const overallProgress = (sum / (totalQuestions * 3)) * 100;
    return Math.round(overallProgress);
  };

  const getNameOfVideo = () => {
    for(let video of videos){
      if(!video.isComplete){
        return video.title;
      }
    }
    return "alles abgeschlossen";
  }

  const getNameOfLearningField = () => {
    return "Lernfeld 2";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hi Niklas</Text>
      <View  style={styles.fieldContainer}>
        <View style={styles.headlineContainer}>
            <Text style={styles.fieldTitle}>Dein Gesamtfortschritt</Text>
            <Text style={styles.fieldProgressText}>{calculateOverallProgress()}%</Text>
        </View>
            <Progress.Bar width={null} height={8} progress={calculateOverallProgress() / 100} ></Progress.Bar>
        </View>

      <View style={styles.infoBox} >
      <Text style={styles.infoBoxTitle}>Deine nächste Videolektion:</Text>
      <Text style={styles.infoBoxContent}>{getNameOfVideo()}</Text>
      </View>

      <View style={styles.infoBox} >
        <Text style={styles.infoBoxTitle}>Mache weiter mit den Fragen bei: </Text>
        <Text style={styles.infoBoxContent}>{getNameOfLearningField()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'top',
    alignItems: 'left',

  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: 'white',
    padding: 12, 
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'left',
  },
  infoBoxTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoBoxContent: {
    fontSize: 16,
    
  },
  overallProgressText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 16,
    width: "100%"
  },
  fieldTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  fieldProgressText: {
    fontSize: 16,
    textAlign: "right"
  }, 
  headlineContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    gap: 16
  }
});

export default HomeScreen;

