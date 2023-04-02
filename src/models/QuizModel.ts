import { AppDataSource } from '../dataSource';
import { Quiz } from '../entities/Quiz';

const quizRepository = AppDataSource.getRepository(Quiz);
