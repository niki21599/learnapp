import React, {useState} from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
// import { Video } from 'expo-video-player';
//import VideoPlayer from 'react-native-video-player';
//  import Video from 'react-native-video';


const VideoDetailScreen = ({ route }) => {
  const { video } = route.params;

  const [isEnabled, setIsEnabled] = useState(video.isComplete);


  player
  const toggleSwitch = async () => {

    video.isComplete = !video.isComplete;
    setIsEnabled(video.isComplete);  
  }

  return (
    <View style={styles.container}>
      <Text style={styles.videoTitle}>{video.title}</Text>
      {/* <VideoPlayer
        video={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
        videoWidth={1600}
        videoHeight={900}
        thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
      /> */}
      {/* <Video 
      source={{uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}} 
      ref={(ref) => {
        player = ref
      }}                                     
      onBuffer={onBuffer}                
      onError={videoError} 
      
      ></Video> */}
      {/* <VideoPlayer
        video={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
        autoplay={false}
        defaultMuted={false}
        loop={false}
        style={styles.videoPlayer}
      /> */}
      {/* <Video
      
      
        videoProps={{
          shouldPlay: true,
          resizeMode: Video.RESIZE_MODE_CONTAIN,
          source: {
            uri: "../../assets/videos/test_video.mp4",
          },
        }}
        inFullscreen={false}
        showFullscreenButton={false}
        showControlsOnLoad
        style={styles.videoPlayer}
      /> */}
      <View style={styles.completedContainer}>
        <Text>Video abgeschlossen:</Text>
        <Switch value={isEnabled} onValueChange={toggleSwitch}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  videoPlayer: {
    
  },
  completedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default VideoDetailScreen;