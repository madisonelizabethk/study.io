import { AppDataSource } from '../dataSource';
import { Term } from '../entities/Term';
import { User } from '../entities/User';

const termRepository = AppDataSource.getRepository(Term);

// Function: All Term Data
async function allTermData(): Promise<Term[]> {
  return termRepository.find();
}

// Function: Get terms from database by userID
async function getTermsByUserID(userID: string): Promise<Term[]> {
  const terms = await termRepository
    .createQueryBuilder('terms')
    .leftJoinAndSelect('terms.users', 'users')
    .where('users.userID = :userID', { userID })
    .getMany();

  return terms;
}

async function insertTerm(question: string, answer: string): Promise<Term> {
  let newTerm = new Term();
  newTerm.question = question;
  newTerm.quizzes = [];
  newTerm.answer = answer;

  newTerm = await termRepository.save(newTerm);

  return newTerm;
}

export { allTermData, getTermsByUserID, insertTerm };
