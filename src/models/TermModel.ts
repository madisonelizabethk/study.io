import { AppDataSource } from '../dataSource';
import { Term } from '../entities/Term';

const termRepository = AppDataSource.getRepository(Term);

// Function: Get terms from user
async function getTermsFromUser(termID: string, question: string): Promise<User | null> {
  const terms = await termRepository.createQueryBuilder('terms').where().getMany();
}
