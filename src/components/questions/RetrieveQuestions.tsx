import { useState, useEffect } from "react";
import { Question } from "../../types/CommonTypes";
import { QuestionServices } from "../../services/Questions";

function RetrieveQuestionsByID({ qids }: { qids: number[] }) {
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  //console.log(qids);

  useEffect(() => {
    fetchQuestionsByIDs();
    //console.log(quizQuestions);
  }, []);

  const fetchQuestionsByIDs = async () => {
    try {
      const questions = await QuestionServices.getQuestionsByIDs(qids);
      console.log(questions.data);
      setQuizQuestions(questions.data);
    } catch (error) {
      console.error("Error fetching questions", error);
    }
  };

  return (
    <div>
      <ol>
        {quizQuestions.map((question) => (
          <li key={question.id}>{question.prompt}</li>
        ))}
      </ol>
    </div>
  );
}

export default RetrieveQuestionsByID;
