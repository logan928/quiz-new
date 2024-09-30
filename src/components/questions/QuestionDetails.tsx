import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Question } from "../../types/CommonTypes";
import { QuestionServices } from "../../services/Questions";
import "./QuestionDetails.css";

function QuestionDetails() {
  const { id } = useParams<{ id: string }>();
  const [question, setQuestion] = useState<Question | null>(null);

  useEffect(() => {
    fetchQuestionByID();
  }, [id]);

  const fetchQuestionByID = async () => {
    if (id) {
      try {
        const response = await QuestionServices.getQuestionByID(Number(id));
        setQuestion(response.data);
      } catch (error) {
        console.error("Error fetching question", error);
      }
    }
  };

  if (!question) return <div>Loading....</div>;

  return (
    <div className="question-details">
      <h1>{question.prompt}</h1>
      <p>{question.question_type}</p>
      <p>{question.correct_answer}</p>
      {question.question_type === "mcq" && (
        <p>Wrong Answers: {question.wrong_answers?.join(", ")}</p>
      )}
      <p>{question.score}</p>
      <p>{question.difficulty}</p>
      <Link to="/questions" className="btn btn-secondary">
        Back to Questions
      </Link>
    </div>
  );
}

export default QuestionDetails;
