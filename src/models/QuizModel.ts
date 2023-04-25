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
async function insertQuiz(terms: Term[], setName: string): Promise<Quiz> {
  let newQuiz = new Quiz();
  newQuiz.terms = terms;
  newQuiz.setName = setName;

  newQuiz = await quizRepository.save(newQuiz);

  return newQuiz;
}

async function getQuizById(quizID: string): Promise<Quiz[]> {
  return quizRepository
    .createQueryBuilder('quiz')
    .where({ where: { quizID } })
    .leftJoin('quiz.user', 'user')
    .select() // Finish this
    .getMany();
}

async function getQuizzesByUserId(userID: string): Promise<Quiz[]> {
  const quiz = await quizRepository
    .createQueryBuilder('quiz')
    .leftJoinAndSelect('quiz.user', 'user')
    .where('user.userID = :userID', { userID })
    .select() // Finish this
    .getMany();

  return quiz;
}

async function quizAssignedToUser(quizID: string, userID: string): Promise<boolean> {
  const quizExists = await quizRepository
    .createQueryBuilder('quiz')
    .leftJoinAndSelect('quiz.user', 'quiz')
    .where('quiz.quizID = :quizID', { quizID })
    .andWhere('user.userID = :userID', { userID })
    .getExists();

  return quizExists;
}
export { allQuizData, insertQuiz, getQuizById, getQuizzesByUserId, quizAssignedToUser };
