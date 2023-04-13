import { AppDataSource } from '../dataSource';
import { ClassInfo } from '../entities/ClassInfo';
import { User } from '../entities/User';

const classRepository = AppDataSource.getRepository(ClassInfo);

// Function: All Class Data
async function allClassData(): Promise<ClassInfo[]> {
  return classRepository.find();
}

// Function: Get courses by professor email
// Pass email as a parameter, return array of courses
async function getCoursesByProfessorEmail(email: string): Promise<ClassInfo[]> {
  const classes = await classRepository.createQueryBuilder('class').where({ email }).getMany();

  return classes;
}

// Function: Get courses by classID
async function getCoursesByClassID(classID: string): Promise<void> {
  await classRepository.createQueryBuilder('class').where({ classID }).getOne();
}

// Function: Get courses by class name
async function getCoursesByClassName(className: string): Promise<void> {
  await classRepository.createQueryBuilder('class').where({ className }).getMany();
}

// Function: Add a class
async function addClassInfo(
  className: string,
  users: User[],
  classTimes: number,
  classTextbook: string,
  courseDescription: string,
  professorEmail: string,
  officeHours: string
): Promise<ClassInfo> {
  let newClass = new ClassInfo();
  newClass.className = className;
  newClass.users = users;
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
  getCoursesByClassID,
  addClassInfo,
  allClassData,
  getCoursesByClassName,
};
