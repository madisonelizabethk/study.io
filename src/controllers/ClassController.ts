import { Request, Response } from 'express';
import { addClassInfo, allClassData, getCoursesByClassID } from '../models/ClassModel';

async function getAllClasses(req: Request, res: Response): Promise<void> {
  res.json(await allClassData());
}

async function createClassInfo(req: Request, res: Response): Promise<void> {
  const { isLoggedIn } = req.session;
  if (!isLoggedIn) {
    // res.sendStatus(401)
    res.redirect('/login');
    return;
  }
  const { className, classTimes, classTextbook, courseDescription, inPublicDomain } =
    req.body as NewClassRequest;
  console.log(`inPublicDomain: ${inPublicDomain}`);
  console.log(`inPublicDomain after converting: ${!!inPublicDomain}`);

  const class = await addClassInfo( className, classTimes, classTextbook, courseDescription, !!inPublicDomain);
  console.log(class);

  res.status(201).json(class);
}

async function getClassInfo(req: Request, res: Response): Promise<void> {
  const { classID } = req.params as { classID: string };

  const class = await getCoursesByClassID(classID);

  if (!class) {
    res.sendStatus(404);
    return;
  }

  res.render('classPage', { class });
}

export { getAllClasses, createClassInfo, getClassInfo };
