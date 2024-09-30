import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import QuestionList from "./components/questions/QuestionList";
import QuestionDetails from "./components/questions/QuestionDetails";
import QuestionForm from "./components/questions/QuestionForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/questions" element={<QuestionList />} />
        <Route path="/questions/:id" element={<QuestionDetails />} />
        <Route path="/questions/new" element={<QuestionForm />} />
      </Routes>
    </>
  );
}

export default App;
