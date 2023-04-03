import { AppDataSource } from '../dataSource';
import { Counter } from '../entities/Counter';

const counterRepository = AppDataSource.getRepository(Counter);

// Function: All Counter Data
async function allCounterData(): Promise<Counter[]> {
  return counterRepository.find();
}

// Function: Add a counter to a quiz
export { allCounterData };
