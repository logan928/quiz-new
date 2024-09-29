import AxiosInstance from "./AxiosInstance";
import { Question } from "../types/CommonTypes";

//CRUD Operations
export const QuestionServices = {
  //View all questions
  getAllQuestions: () => AxiosInstance.get<Question[]>("/questions"),
  //View single question
  getQuestionByID: (id: number) =>
    AxiosInstance.get<Question>(`/questions/${id}`),
  //Create a new question
  createNewQuestion: (data: Omit<Question, "id">) =>
    AxiosInstance.post("/questions", data),
  //Update a question
  updateQuestion: (id: number, data: Partial<Question>) =>
    AxiosInstance.put(`/questions/${id}`, data),
  //Delete a question
  deleteQuestion: (id: number) => AxiosInstance.delete(`/questions/${id}`),
};
