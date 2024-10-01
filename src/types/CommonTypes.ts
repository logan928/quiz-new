//Type for question
export interface Question {
  id: number;
  question_type: "mcq" | "short_answer";
  prompt: string;
  correct_answer: string;
  wrong_answers?: string[];
  score: number;
  difficulty: "easy" | "medium" | "difficult";
}

export interface Quiz {
  id: number;
  title: string;
  score: number;
  questions: number[];
}
