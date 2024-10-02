import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { QuestionServices } from "../../services/Questions";
import { Question } from "../../types/CommonTypes";
import "./QuestionList.css";

function QuestionList() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  const fetchAllQuestions = async () => {
    try {
      const response = await QuestionServices.getAllQuestions();
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await QuestionServices.deleteQuestion(id);
      setQuestions(
        questions.filter((question) => question.id !== id.toString())
      );
    } catch (error) {
      console.error("Error deleting question", error);
    }
  };

  return (
    <div className="question-list">
      <h1> Questons List</h1>
      <Link to="/questions/new" className="btn btn-primary">
        Add Question
      </Link>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <h3>{question.prompt}</h3>
            <p> {question.question_type}</p>
            <p> {question.difficulty}</p>
            <p> {question.score}</p>

            <div className="question-actions">
              <Link
                to={`/questions/${question.id}`}
                className="btn btn-secondary"
              >
                View
              </Link>
              <Link
                to={`/questions/edit/${question.id}`}
                className="btn btn-secondary"
              >
                Edit Question
              </Link>
              <button
                onClick={() => handleDelete(Number(question.id))}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;
