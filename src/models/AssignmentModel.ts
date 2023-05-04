import { AppDataSource } from '../dataSource';
import { Assignment } from '../entities/Assignment';
import { ClassInfo } from '../entities/ClassInfo';

const assignmentRepository = AppDataSource.getRepository(Assignment);

// Function: All Assignment Data
async function allAssignmentData(): Promise<Assignment[]> {
  return assignmentRepository.find({ relations: ['classInfo'] });
}

// Function: Get assignments from database by userID
async function getAssignmentsByUserId(userId: string): Promise<Assignment[]> {
  const assignments = await assignmentRepository
    .createQueryBuilder('assignments')
    .leftJoinAndSelect('assignments.users', 'users')
    .where('users.userId = :userId', { userId })
    .getMany();

  return assignments;
}

// Function : Get assignments by assignment ID
async function getAssignmentById(assignmentId: string): Promise<Assignment | null> {
  const assignment = await assignmentRepository.findOne({
    where: { assignmentId },
    relations: ['classInfo'],
  });

  return assignment;
}

async function insertAssignment(
  assignmentName: string,
  assignmentType: string,
  dueDate: Date,
  classInfo: ClassInfo
): Promise<Assignment> {
  let newAssignment = new Assignment();
  newAssignment.assignmentName = assignmentName;
  newAssignment.assignmentType = assignmentType;
  newAssignment.dueDate = dueDate;
  newAssignment.classInfo = classInfo;

  newAssignment = await assignmentRepository.save(newAssignment);

  return newAssignment;
}

export { allAssignmentData, getAssignmentsByUserId, insertAssignment, getAssignmentById };
