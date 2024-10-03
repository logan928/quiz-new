// src/components/PlayQuiz.tsx
import React, { useState, useEffect } from "react";
import { Question } from "../../types/CommonTypes";
import { QuestionServices } from "../../services/Questions";

interface PlayQuizProps {
  quizId: number;
}

const PlayQuiz: React.FC<PlayQuizProps> = ({ quizId }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Load questions based on the quizId
  useEffect(() => {
    async function loadQuestions() {
      try {
        const quizResponse = await QuestionServices.getAllQuestions();
        const allQuestions = quizResponse.data;

        // Hardcode
        const quizQuestionIds = [1, 2, 4, 5, 6, 7, 8]; // get this from fetch
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

  // Handle Answer Selection
  const handleAnswerSelection = (selectedAnswer: string) => {
    const currentQuestion = questions[currentQuestionIndex];

    // Check if the answer is correct and update the score
    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore(score + currentQuestion.score);
    }

    // Save selected answer
    setSelectedAnswers([...selectedAnswers, selectedAnswer]);

    // Move to next question or finish quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizFinished(true); // End of quiz
    }
  };

  // Shuffle answers to display them randomly
  const shuffleAnswers = (correctAnswer: string, wrongAnswers: string[]) => {
    const answers = [...wrongAnswers, correctAnswer];
    return answers.sort(() => Math.random() - 0.5);
  };

  // Render question or result
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
  const shuffledAnswers = shuffleAnswers(
    currentQuestion.correct_answer,
    currentQuestion.wrong_answers
  );

  return (
    <div>
      <h2>
        Question {currentQuestionIndex + 1} of {questions.length}
      </h2>
      <p>{currentQuestion.prompt}</p>

      <div>
        {shuffledAnswers.map((answer, index) => (
          <button key={index} onClick={() => handleAnswerSelection(answer)}>
            {answer}
          </button>
        ))}
      </div>

      <p>Score: {score}</p>
    </div>
  );
};

export default PlayQuiz;
