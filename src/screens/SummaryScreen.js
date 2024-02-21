import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const SummaryScreen = ({ route }) => {
  const { correctAnswers, totalQuestions } = route.params;
  const navigation = useNavigation(); 

  return (
    <View style={styles.container}>
      <Text>{`Du hast ${correctAnswers} von ${totalQuestions} Fragen richtig beantwortet.`}</Text>
      <Button title="Schließen" onPress={() => navigation.navigate('QuestionScreen')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 8,
    alignItems: 'center',
  },
});

export default SummaryScreen;