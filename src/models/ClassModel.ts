import { AppDataSource } from '../dataSource';
import { ClassInfo } from '../entities/ClassInfo';
import { User } from '../entities/User';

const classRepository = AppDataSource.getRepository(ClassInfo);

// Function: All Class Data
async function allClassData(): Promise<ClassInfo[]> {
  return classRepository.find();
}

// Function: Get courses by UserID that already exist in database
async function getClassInfoByClassId(classId: string): Promise<ClassInfo | null> {
  const classInfo = await classRepository
    .createQueryBuilder('classInfo')
    .leftJoinAndSelect('classInfo.users', 'users')
    .where('classId = :classId', { classId })
    .getOne();

  return classInfo;
}

// Get Class Roster for Assignment
async function getUsersByClassId(classId: string): Promise<User[]> {
  const classInfo = await classRepository.findOne({
    where: { classId },
    relations: ['users'],
  });

  return classInfo.users;
}

// Function: Get courses by professor email
// Pass email as a parameter, return array of courses
async function getCoursesByProfessorEmail(email: string): Promise<ClassInfo[]> {
  const classes = await classRepository.createQueryBuilder('class').where({ email }).getMany();

  return classes;
}

// Function: Get courses by classId
async function getCourseByClassID(classId: string): Promise<ClassInfo | null> {
  const classInfo = await classRepository
    .createQueryBuilder('class')
    .leftJoinAndSelect('class.assignments', 'assignments')
    .leftJoinAndSelect('class.users', 'users')
    .where({ classId })
    .getOne();
  return classInfo;
}

// Function: Get courses by class name
async function getCoursesByClassName(className: string): Promise<ClassInfo[]> {
  const classes = await classRepository.createQueryBuilder('class').where({ className }).getMany();
  return classes;
}

// Function: Add a class
async function addClassInfo(
  className: string,
  user: User,
  classTimes: number,
  classTextbook: string,
  courseDescription: string,
  professorEmail: string,
  officeHours: string
): Promise<ClassInfo> {
  let newClass = new ClassInfo();
  newClass.className = className;
  newClass.users = [user];
  newClass.classTimes = classTimes;
  newClass.classTextbook = classTextbook;
  newClass.courseDescription = courseDescription;
  newClass.professorEmail = professorEmail;
  newClass.officeHours = officeHours;

  newClass = await classRepository.save(newClass);

  return newClass;
}
export {
  getCoursesByProfessorEmail,
  getCourseByClassID,
  addClassInfo,
  allClassData,
  getCoursesByClassName,
  getUsersByClassId,
  getClassInfoByClassId,
};
