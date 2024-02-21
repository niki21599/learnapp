import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './src/screens/HomeScreen';
import VideoScreen from './src/screens/VideoScreen';
import StatisticScreen from './src/screens/StatisticScreen';
import QuestionScreen from './src/screens/QuestionScreen';
import VideoDetailScreen from './src/screens/VideoDetailScreen';
import { createNavigator } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import QuestionDetailScreen from './src/screens/QuestionDetailScreen';
import SummaryScreen from './src/screens/SummaryScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const VideoStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="VideoScreen">
      <Stack.Screen name="VideoScreen" component={VideoScreen} />
      <Stack.Screen name="VideoDetailScreen" component={VideoDetailScreen} />
    </Stack.Navigator>
  );
};

const QuestionStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="QuestionScreen">
      <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
      <Stack.Screen name="QuestionDetailScreen" component={QuestionDetailScreen} />
      <Stack.Screen name='SummaryScreen' component={SummaryScreen} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Fragen"
          component={QuestionStackNavigator}
          options={{
            tabBarLabel: 'Fragen',
            tabBarIcon: ({ color, size }) => (
              <Icon name="question-circle" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Videos"
          component={VideoStackNavigator}
          options={{
            tabBarLabel: 'Videos',
            tabBarIcon: ({ color, size }) => (
              <Icon name="play-circle" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Statistik"
          component={StatisticScreen}
          options={{
            tabBarLabel: 'Statistik',
            tabBarIcon: ({ color, size }) => (
              <Icon name="bar-chart" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
