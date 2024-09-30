import { QuestionServices } from "../../services/Questions";
import { Question } from "../../types/CommonTypes";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./QuestionForm.css";

function QuestionForm() {
  const navigate = useNavigate();

  const [questionFormData, setQuestionFormData] = useState<
    Omit<Question, "id">
  >({
    prompt: "",
    question_type: "mcq",
    correct_answer: "",
    wrong_answers: [],
    score: 0,
    difficulty: "easy",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await QuestionServices.createNewQuestion(questionFormData);
      navigate("/questions");
    } catch (error) {
      console.error("Error saving question", error);
    }
  };

  return (
    <div className="question-form">
      <h1> Add Question </h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <textarea name="prompt" value={questionFormData.prompt} required />
        </label>
        <label>
          Question Type:
          <select
            name="questionType"
            value={questionFormData.question_type}
            required
          >
            <option value={"mcq"}>MCQ</option>
            <option value={"short-answer"}>Short ANswer</option>
          </select>
        </label>
        <label>
          Correct Answer:
          <input
            type="text"
            name="correctAnswer"
            value={questionFormData.correct_answer}
            required
          />
        </label>
        {questionFormData.question_type === "mcq" && (
          <>
            <label>
              Wrong Answers:
              <input
                typeof="text"
                name="wrongAnswers"
                value={questionFormData.wrong_answers?.join(",")}
                required
              />
            </label>
          </>
        )}
        <label>
          Difficulty Level:
          <select name="difficulty" value={questionFormData.difficulty}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="difficult">Difficult</option>
          </select>
        </label>
        <label>
          Score:
          <input type="text" name="score" value={questionFormData.score} />
        </label>
        <button type="submit" className="btn btn-primary">
          Add Question
        </button>
      </form>
    </div>
  );
}

export default QuestionForm;
