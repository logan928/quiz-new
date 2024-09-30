import { QuestionServices } from "../../services/Questions";
import { Question } from "../../types/CommonTypes";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import { Link } from "react-router-dom";
import "./QuestionForm.css";

function QuestionForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [questionFormData, setQuestionFormData] = useState<
    Omit<Question, "id">
  >(() => {
    const savedQuestionFormData = localStorage.getItem("formData");
    if (savedQuestionFormData) {
      return JSON.parse(savedQuestionFormData);
    }
    return {
      prompt: "",
      question_type: "mcq",
      correct_answer: "",
      wrong_answers: [],
      score: 0,
      difficulty: "easy",
    };
  });

  useEffect(() => {
    fetchQuestionByID();
  }, [id]);

  useEffect(() => {
    //save form data whenever a change is done
    localStorage.setItem("formData", JSON.stringify(questionFormData));
  }, [questionFormData]);

  const fetchQuestionByID = async () => {
    if (id) {
      try {
        const response = await QuestionServices.getQuestionByID(Number(id));
        setQuestionFormData(response.data);
      } catch (error) {
        console.error("Error fetching question", error);
      }
    }
  };

  const handleChange = async (
    event: React.ChangeEvent<
      HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
    >
  ) => {
    const { name, value } = event.target;
    setQuestionFormData({
      ...questionFormData,
      [name]: value,
    });
  };

  const handleWrongAnswersChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const wrongAnswersArray = value
      .split(",")
      .map((answer) => answer.trim())
      .filter((answer) => answer);
    setQuestionFormData({
      ...questionFormData,
      wrong_answers: wrongAnswersArray,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (id) {
        await QuestionServices.updateQuestion(Number(id), questionFormData);
      } else {
        await QuestionServices.createNewQuestion(questionFormData);
      }
      localStorage.removeItem("formData");
      navigate("/questions");
    } catch (error) {
      console.error("Error saving question", error);
    }
  };

  return (
    <div className="question-form">
      <h1> {id ? "Edit" : "Add"} Question </h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <textarea
            name="prompt"
            value={questionFormData.prompt}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Question Type:
          <select
            name="question_type"
            value={questionFormData.question_type}
            onChange={handleChange}
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
            name="correct_answer"
            value={questionFormData.correct_answer}
            onChange={handleChange}
            required
          />
        </label>
        {questionFormData.question_type === "mcq" && (
          <>
            <label>
              Wrong Answers:
              <input
                typeof="text"
                name="wrong_answers"
                value={questionFormData.wrong_answers?.join(",")}
                onChange={handleWrongAnswersChange}
                required
              />
            </label>
          </>
        )}
        <label>
          Difficulty Level:
          <select
            name="difficulty"
            value={questionFormData.difficulty}
            onChange={handleChange}
            required
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="difficult">Difficult</option>
          </select>
        </label>
        <label>
          Score:
          <input
            type="number"
            name="score"
            value={questionFormData.score}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="btn btn-primary">
          {id ? "Edit" : "Add"} Question
        </button>
      </form>
    </div>
  );
}

export default QuestionForm;
