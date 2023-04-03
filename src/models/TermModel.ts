import { AppDataSource } from '../dataSource';
import { Term } from '../entities/Term';
import { Quiz } from '../entities/Quiz';
import { User } from '../entities/User';

const termRepository = AppDataSource.getRepository(Term);

// Function: All Term Data
async function allTermData(): Promise<Term[]> {
  return termRepository.find();
}

// Function: Get terms from user
// Fix this function
async function getTermsFromUser(termID: string, question: string): Promise<User | null> {
  const terms = await termRepository.createQueryBuilder('terms').where().getMany();
}

// Function: Add a Term
async function addTerm(question: string, scores: Quiz, user: User, answer: string): Promise<Term> {
  const newTerm = new Term();
  newTerm.question = question;
  newTerm.scores = scores;
  newTerm.user = user;
  newTerm.answer = answer;

  newTerm = await termRepository.save(newTerm);
}

export { allTermData, getTermsFromUser, addTerm };
