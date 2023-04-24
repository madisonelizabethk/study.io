import { AppDataSource } from '../dataSource';
import { ClassInfo } from '../entities/ClassInfo';
import { User } from '../entities/User';

const classRepository = AppDataSource.getRepository(ClassInfo);

// Function: All Class Data
async function allClassData(): Promise<ClassInfo[]> {
  return classRepository.find();
}

// Function: Get courses by UserID that already exist in database
async function getCoursesByUserID(userID: string): Promise<ClassInfo[]> {
  const classinfo = await classRepository
    .createQueryBuilder('classinfo')
    .leftJoinAndSelect('classinfo.users', 'users')
    .where('users.userID = :userID', { userID })
    .getMany();

  return classinfo;
}

// Function: Get courses by professor email
// Pass email as a parameter, return array of courses
async function getCoursesByProfessorEmail(email: string): Promise<ClassInfo[]> {
  const classes = await classRepository.createQueryBuilder('class').where({ email }).getMany();

  return classes;
}

// Function: Get courses by classID
async function getCourseByClassID(classID: string): Promise<ClassInfo | null> {
  const classInfo = await classRepository.createQueryBuilder('class').where({ classID }).getOne();
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
  getCoursesByUserID,
};
