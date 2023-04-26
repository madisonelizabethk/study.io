import { Request, Response } from 'express';
import { addClassInfo, allClassData, getCourseByClassID } from '../models/ClassModel';
import { getUserById } from '../models/UserModel';

async function getAllClasses(req: Request, res: Response): Promise<void> {
  res.json(await allClassData());
}

// Create New Class Information for the student
async function createClassInfo(req: Request, res: Response): Promise<void> {
  const { isLoggedIn, authenticatedUser } = req.session;
  // Check to see if a user is logged in
  if (!isLoggedIn) {
    // res.sendStatus(401)
    res.redirect('/login'); // If not logged in, redirect to login
    return;
  }

  // Check to see what user is logging in
  const { userID } = authenticatedUser;
  const user = await getUserById(userID);
  if (!user) {
    res.redirect('/login'); // If user does not exist, redirect to login page
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

  res.status(200).json(classInfo);
}

// Classes Page
async function renderClasses(req: Request, res: Response): Promise<void> {
  const classes = await allClassData();

  res.render('classPage', { classes });
}

export { getAllClasses, createClassInfo, getClassInfo, renderClasses };
