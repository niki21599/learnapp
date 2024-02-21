import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {learningFields} from "../models/dummyData"
import { Video } from "../models/Video";

const VideoScreen = () => {
  const navigation = useNavigation();

  const [videos, setVideos] = useState([]);
  const baseUrl = "https://app-project-etdz.onrender.com";
  useEffect(() => {
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

  }, [])



  const thumbnail = require('../../assets/thumbnail.png')
  const videosByLearningField = {};
  videos.forEach(video =>{
    const learningFieldName = video.learningField.name;
    if (!videosByLearningField[learningFieldName]) {
      videosByLearningField[learningFieldName] = [];
    }
    videosByLearningField[learningFieldName].push(video);
  })
  const groupedVideos = Object.entries(videosByLearningField).map(([learningField, videos]) => ({
    learningField,
    videos,
  }));



    return (
      <View style={styles.container}>
      <FlatList
        data={groupedVideos}
        keyExtractor={(item) => item.learningField}
        renderItem={({ item }) => (
          <View style={styles.learningFieldContainer}>
            <Text style={styles.learningFieldTitle}>{item.learningField}</Text>
            <FlatList
              horizontal
              data={item.videos}
              keyExtractor={(video) => video.title}
              renderItem={({ item: video }) => (
                <TouchableOpacity
                  style={styles.videoContainer}
                  onPress={() => navigation.navigate('VideoDetailScreen', { video })}
                >
                  <Image
                    source={thumbnail}
                    style={styles.thumbnail}
                    resizeMode="cover"
                  />
                  <Text style={styles.videoTitle}>{video.title}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      />
    </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  learningFieldContainer: {
    marginBottom: 16,
  },
  learningFieldTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  videoContainer: {
    marginRight: 16,
  },
  thumbnail: {
    width: 120,
    height: 80,
    borderRadius: 8,
  },
  videoTitle: {
    marginTop: 8,
  },
});  

export default VideoScreen;
