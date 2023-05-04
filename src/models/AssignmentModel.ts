import { AppDataSource } from '../dataSource';
import { Assignment } from '../entities/Assignment';

const assignmentRepository = AppDataSource.getRepository(Assignment);

// Function: All Assignment Data
async function allAssignmentData(): Promise<Assignment[]> {
  return assignmentRepository.find();
}

// Function: Get assignments from database by userID
async function getAssignmentsByUserID(userID: string): Promise<Assignment[]> {
  const assignments = await assignmentRepository
    .createQueryBuilder('assignments')
    .leftJoinAndSelect('assignments.users', 'users')
    .where('users.userID = :userID', { userID })
    .getMany();

  return assignments;
}

async function insertAssignment(
  assignmentName: string,
  assignmentType: string,
  dueDate: Date
): Promise<Assignment> {
  let newAssignment = new Assignment();
  // newAssignment.quizzes = [];
  newAssignment.assignmentName = assignmentName;
  newAssignment.assignmentType = assignmentType;
  newAssignment.dueDate = dueDate;

  newAssignment = await assignmentRepository.save(newAssignment);

  return newAssignment;
}

export { allAssignmentData, getAssignmentsByUserID, insertAssignment };
