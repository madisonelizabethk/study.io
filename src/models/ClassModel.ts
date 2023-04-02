import { AppDataSource } from '../dataSource';
import { ClassInfo } from '../entities/ClassInfo';

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

// Function: Get courses by class name
async function getCoursesByClassName(className: string): Promise<ClassInfo[]> {
  await classRepository.createQueryBuilder('class').where({ className }).getMany();
}

// Function: Get courses by classID
async function getCoursesByClassID(classID: string): Promise<ClassInfo[]> {
  await classRepository.createQueryBuilder('class').where({ classID }).getMany();
}

// Function: Add a class
async function addClassInfo(
  classID: string,
  className: string,
  classTimes: number
): Promise<ClassInfo> {
  const newClass = new ClassInfo();
  newClass.classID = classID;
  newClass.className = className;
  newClass.classTimes = classTimes;

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
