import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import QuestionList from "./components/questions/QuestionList";
import QuestionDetails from "./components/questions/QuestionDetails";
import QuestionForm from "./components/questions/QuestionForm";
import QuizzesList from "./components/quiz/QuizzesList";
import PlayQuiz from "./components/quiz/PlayQuizNew";

function App() {
  return (
    <>
      <Routes>
        <Route path="/questions" element={<QuestionList />} />
        <Route path="/questions/:id" element={<QuestionDetails />} />
        <Route path="/questions/new" element={<QuestionForm />} />
        <Route path="/questions/edit/:id" element={<QuestionForm />} />
        <Route path="/quiz" element={<QuizzesList />} />
        <Route path="/play" element={<PlayQuiz quizId={4} />} />
      </Routes>
    </>
  );
}

export default App;
