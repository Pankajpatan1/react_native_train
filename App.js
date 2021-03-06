import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Button
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const App = () => {

  const questions = [
    {
      questionText: 'What is the capital of France?',
      answerOptions: [
        { answerText: 'New York', isCorrect: false },
        { answerText: 'London', isCorrect: false },
        { answerText: 'Paris', isCorrect: true },
        { answerText: 'Dublin', isCorrect: false },
      ],
    },
    {
      questionText: 'Who is CEO of Tesla?',
      answerOptions: [
        { answerText: 'Jeff Bezos', isCorrect: false },
        { answerText: 'Elon Musk', isCorrect: true },
        { answerText: 'Bill Gates', isCorrect: false },
        { answerText: 'Tony Stark', isCorrect: false },
      ],
    },
    {
      questionText: 'The iPhone was created by which company?',
      answerOptions: [
        { answerText: 'Apple', isCorrect: true },
        { answerText: 'Intel', isCorrect: false },
        { answerText: 'Amazon', isCorrect: false },
        { answerText: 'Microsoft', isCorrect: false },
      ],
    },
    {
      questionText: 'How many Harry Potter books are there?',
      answerOptions: [
        { answerText: '1', isCorrect: false },
        { answerText: '4', isCorrect: false },
        { answerText: '6', isCorrect: false },
        { answerText: '7', isCorrect: true },
      ],
    },
  ];





  const HomeScreen = ({navigation}) =>{
    return (
      <View style={styles.container}>  
      <View style={styles.card}>
       <View style={{flex:1 ,justifyContent:"center" , alignItems:"center"}}>
       <Text style={{fontSize:24 , color:"#ffffff" , marginBottom:15}}>
          Lets Start The quiz!
        </Text>
        <Button
        title ="Start"
        onPress={() => navigation.navigate('Quiz')}
        />
       </View>
      </View>
      </View>
    )
  }

  const QuizScreen = ({navigation}) =>{

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswerOptionClick = (isCorrect) => {
      if (isCorrect) {
        setScore(score + 1);
      }
  
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
    };
    return(
      <View style={styles.card}>
      {showScore ? (
        <View style={styles.score}>
          <Text style={{fontSize:30 , color:"#ffffff"}}>
          You scored {score} out of {questions.length}
          </Text>
        </View>
      ) : (
        <View style={{flex:1}}>
        <View style={styles.questionSection}>
          <View style={styles.questionCount}>
            <Text style={styles.questionCountText}>
              Question {currentQuestion + 1} / {questions.length}
            </Text>
          </View>
          <View >
          <Text style={styles.questionText}>{questions[currentQuestion].questionText}</Text>
          </View>
        </View>
        <View style={styles.answerSection}> 
          {questions[currentQuestion].answerOptions.map((answerOption ,id)=>  (
            <TouchableOpacity key ={id} style={styles.button} onPress = {()=>handleAnswerOptionClick(answerOption.isCorrect)}>
               <Text style={styles.optionText}> {answerOption.answerText}</Text>
            </TouchableOpacity>
          ))}
           </View>
        </View>
      )}
    </View>
    )
  }

  const Stack = createNativeStackNavigator();

  return (
     <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#7cc6fe',
  },
  card: {
    backgroundColor: '#252d4a',
    width: 400,
    minHeight: 300,
    borderRadius: 15,
    padding: 20,
    flex: 1 / 2
  },
  score: {
    flex: 1,
    justifyContent: 'center',
    alignItems : "center",
  },
  questionSection: {
    flex:1/3
  },
  questionCount: {
    marginBottom:20
  },
  questionCountText: {
    fontSize:28 ,
    color : '#ffffff'
  } ,
  questionText :{
    marginBottom:12 ,
    color :'#ffffff',
    fontSize : 24
  } ,
  answerSection :{
    flex : 1/2 ,
  
  } ,
  button : {
    backgroundColor: "#252d4a",
    borderRadius: 15 ,
    paddingHorizontal : 15 ,
    paddingVertical : 15 ,
    justifyContent: "flex-start" ,
    flexDirection :"row",
    borderWidth : 5 ,
    borderColor : "#234668",
    marginBottom : 12
  },
  optionText :{
    color:"#ffffff",
    fontSize : 12 ,
  }
});


export default App
