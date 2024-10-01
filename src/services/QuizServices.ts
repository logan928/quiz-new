import AxiosInstance from "./AxiosInstance";
import { Quiz } from "../types/CommonTypes";

export const QuizService = {
  //View quiz list
  getAllQuizzes: () => AxiosInstance.get<Quiz[]>("/quiz"),
  //View quiz by id
  getQuizByID: (id: number) => AxiosInstance.get<Quiz>(`/quiz/${id}`),
  //Edit quiz
  updateQuiz: (id: number, data: Partial<Quiz>) =>
    AxiosInstance.put(`/quiz/${id}`, data),
  //Create new quiz
  createNewQuiz: (data: Omit<Quiz, "id">) => AxiosInstance.post("/quiz", data),
  //Delete quiz
  deleteQuiz: (id: number) => AxiosInstance.delete(`/quiz/${id}`),
};
