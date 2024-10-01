import { useState, useEffect } from "react";
import { Question, Quiz } from "../../types/CommonTypes";
import { QuizService } from "../../services/QuizServices";
import AxiosInstance from "../../services/AxiosInstance";
import { Link } from "react-router-dom";
import RetrieveQuestionsByID from "../questions/RetrieveQuestions";

function QuizzesList() {
  const [allQuizzes, setAllQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    fetchAllQuizzes();
  }, []);

  const fetchAllQuizzes = async () => {
    try {
      const response = await QuizService.getAllQuizzes();
      setAllQuizzes(response.data);
    } catch (error) {
      console.log("Error loading quizzes", error);
    }
  };

  return (
    <div>
      <h1>Quiz List</h1>
      <ul>
        {allQuizzes.map((quiz) => {
          //console.log("Quiz Questions IDs:", quiz.questions);

          return (
            <li key={quiz.id}>
              <p> {quiz.title}</p>
              <p>{quiz.score}</p>

              <RetrieveQuestionsByID qids={quiz.questions} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default QuizzesList;
