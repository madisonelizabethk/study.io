import { AppDataSource } from '../dataSource';
import { Quiz } from '../entities/Quiz';
import { User } from '../entities/User';
import { Term } from '../entities/Term';
import { Counter } from '../entities/Counter';

const quizRepository = AppDataSource.getRepository(Quiz);

// Function: All Quiz Data
async function allQuizData(): Promise<Quiz[]> {
  return quizRepository.find();
}

// Function: Add a quiz
async function addQuiz(users: User, terms: Term, scores: Counter, setName: string): Promise<Quiz> {
  const newQuiz = new Quiz();
  newQuiz.user = user;
  newQuiz.terms = terms;
  newQuiz.scores = scores;
  newQuiz.setName = setName;

  newQuiz = await quizRepository.save(newQuiz);
}

export { allQuizData, addQuiz };
