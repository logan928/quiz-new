// src/components/PlayQuiz.tsx
import React, { useState, useEffect } from "react";
import { Question } from "../../types/CommonTypes";
import { QuestionServices } from "../../services/Questions";
import "./PlayQuiz.css";

interface PlayQuizProps {
  quizId: number;
}

const PlayQuiz: React.FC<PlayQuizProps> = ({ quizId }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Timer state
  const [timeLeft, setTimeLeft] = useState<number>(15); // 15 seconds

  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  // Load questions
  useEffect(() => {
    async function loadQuestions() {
      try {
        const quizQuestionsAll = await QuestionServices.getAllQuestions();
        const allQuestions = quizQuestionsAll.data;

        const quizQuestionIds = [1, 2, 4, 5, 6, 7, 8]; // Todo:  retrieve these from the quiz object
        const filteredQuestions = allQuestions.filter((q) =>
          quizQuestionIds.includes(parseInt(q.id))
        );
        setQuestions(filteredQuestions);
      } catch (error) {
        console.error("Error loading quiz data:", error);
      }
    }
    loadQuestions();
  }, [quizId]);

  // Timer logic
  useEffect(() => {
    if (questions.length === 0 || isQuizFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          handleNextQuestion();
          return 15; //
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup
  }, [currentQuestionIndex, questions.length, isQuizFinished]);

  // Shuffle answers, but only when the question changes
  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      setShuffledAnswers(
        shuffleAnswers(
          currentQuestion.correct_answer,
          currentQuestion.wrong_answers
        )
      );
    }
  }, [currentQuestionIndex, questions]); // Re-shuffle only when the current question changes

  // Handle Answer Selection
  const handleAnswerSelection = (selectedAnswer: string) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore(score + currentQuestion.score);
    }

    setSelectedAnswers([...selectedAnswers, selectedAnswer]);
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(15); // Reset timer for the new question
    } else {
      setIsQuizFinished(true); // End quiz
    }
  };

  // Shuffle answers function
  const shuffleAnswers = (correctAnswer: string, wrongAnswers: string[]) => {
    const answers = [...wrongAnswers, correctAnswer];
    return answers.sort(() => Math.random() - 0.5);
  };

  if (isQuizFinished) {
    return (
      <div>
        <h2>Quiz Finished!</h2>
        <p>Your score: {score}</p>
        <p>
          You answered {selectedAnswers.length} out of {questions.length}{" "}
          questions.
        </p>
      </div>
    );
  }

  if (questions.length === 0) {
    return <p>Loading questions...</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h2 className="quiz-question">
        Question {currentQuestionIndex + 1} of {questions.length}
      </h2>
      <p>{currentQuestion.prompt}</p>
      <div>
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            className="answer-button"
            onClick={() => handleAnswerSelection(answer)}
          >
            {answer}
          </button>
        ))}
      </div>
      <div className="timer-score">
        <p className="timer">Score: {score}</p>
        <p>Time left: {timeLeft} seconds</p> {/* Display the timer */}
      </div>
    </div>
  );
};

export default PlayQuiz;
