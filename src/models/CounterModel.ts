import { AppDataSource } from '../dataSource';
import { Counter } from '../entities/Counter';
import { Quiz } from '../entities/Quiz';
import { User } from '../entities/User';

const counterRepository = AppDataSource.getRepository(Counter);

// Function: All Counter Data
async function allCounterData(): Promise<Counter[]> {
  return counterRepository.find();
}

async function addCounter(
  quizzes: Quiz[],
  users: User,
  rightAnswerCounter: number,
  wrongAnswerCounter: number
): Promise<Counter> {
  let newCounter = new Counter();
  newCounter.quizzes = quizzes;
  newCounter.users = users;
  newCounter.rightAnswerCounter = rightAnswerCounter;
  newCounter.wrongAnswerCounter = wrongAnswerCounter;

  newCounter = await counterRepository.save(newCounter);

  return newCounter;
}

async function getCounterByID(counterID: string): Promise<Counter | null> {
  return counterRepository
    .createQueryBuilder('counter')
    .where({ where: { counterID } })
    .leftJoin('counter.user', 'user')
    .leftJoin('counter.quiz', 'quiz')
    .select() // Finish this
    .getOne();
}

async function getCounterByUserID(userID: string): Promise<Counter[]> {
  const counters = await counterRepository
    .createQueryBuilder('counter')
    .leftJoinAndSelect('counter.user', 'user')
    .where('user.userID = :userID', { userID })
    .select(['counter', 'user.userID', 'quiz'])
    .getMany();

  return counters;
}

// async function counterAssignedToUser
export { allCounterData, addCounter, getCounterByID, getCounterByUserID };
