import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Question from './components/Question';
import AnswerButton from './components/AnswerButton';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('black'); 
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple');
        console.log(response.data);  
        setQuestions(response.data.results);
      } catch (error) {
        console.error('Error fetching trivia questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
  }, [backgroundColor]);

  const handleAnswer = (selectedAnswer) => {
    setSelectedAnswer(selectedAnswer);
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;

    setFeedback(isCorrect ? 'Correct!' : 'Incorrect!');
    setBackgroundColor(isCorrect ? 'green' : 'red');  

    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setIsGameOver(true);
      }
      setSelectedAnswer(null);
      setFeedback('');
      setBackgroundColor('black');  
    }, 1000);
  };

  if (isGameOver) {
    return (
      <div className="game-over">
        <h1>Game Over!</h1>
        <p>Your final score: {score}/{questions.length}</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
  // Shuffle the answers
  const shuffledAnswers = answers.sort(() => Math.random() - 0.5);

  return (
    <div className="app">
      <h1>Trivia Game</h1>
      <h2>Category {currentQuestion.category}</h2>
      <h2>Difficulty: {currentQuestion.difficulty}</h2>
      <Question question={currentQuestion.question} />
      <div className="answer-buttons">
        {shuffledAnswers.map((answer, index) => (
          <AnswerButton
            key={index}
            answer={answer}
            onClick={() => handleAnswer(answer)}
            disabled={selectedAnswer !== null}
            selected={selectedAnswer === answer}
          />
        ))}
      </div>
      <p>Score: {score}</p>
      {feedback && <p className="feedback">{feedback}</p>} 
    </div>
  );
};

export default App;
