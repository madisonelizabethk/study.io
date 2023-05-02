import { AppDataSource } from '../dataSource';
import { Quiz } from '../entities/Quiz';
import { Term } from '../entities/Term';

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

async function getQuizById(quizId: string): Promise<Quiz | null> {
  return await quizRepository
    .createQueryBuilder('quiz')
    .leftJoin('quiz.users', 'users')
    .leftJoin('quiz.terms', 'terms')
    .leftJoin('quiz.scores', 'scores')
    .where('quizId = :quizId', { quizId })
    .select(['quiz', 'terms', 'scores', 'users.userID', 'users.username'])
    .getOne();
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
