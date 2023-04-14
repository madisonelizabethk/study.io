import { Request, Response } from 'express';
import { addClassInfo, allClassData, getCourseByClassID } from '../models/ClassModel';
import { getUserById } from '../models/UserModel';

async function getAllClasses(req: Request, res: Response): Promise<void> {
  res.json(await allClassData());
}

// Create New Class Information for the student
async function createClassInfo(req: Request, res: Response): Promise<void> {
  const { isLoggedIn, authenticatedUser } = req.session;
  if (!isLoggedIn) {
    // res.sendStatus(401)
    res.redirect('/login');
    return;
  }
  const { userID } = authenticatedUser;
  const user = await getUserById(userID);
  if (!user) {
    res.redirect('/login');
    return;
  }

  const { className, classTimes, classTextbook, courseDescription, professorEmail, officeHours } =
    req.body as NewClassRequest;

  const classInfo = await addClassInfo(
    className,
    user,
    classTimes,
    classTextbook,
    courseDescription,
    professorEmail,
    officeHours
  );
  console.log(classInfo);

  res.status(201).json(classInfo);
}

// Get Class Info from the database
async function getClassInfo(req: Request, res: Response): Promise<void> {
  const { classID } = req.params as { classID: string };

  const classInfo = await getCourseByClassID(classID);

  if (!classInfo) {
    res.sendStatus(404);
    return;
  }

  res.render('classPage', { classInfo });
}

export { getAllClasses, createClassInfo, getClassInfo };
