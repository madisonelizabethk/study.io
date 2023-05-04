import { Request, Response } from 'express';
import { getAssignmentsByUserId, insertAssignment } from '../models/AssignmentModel';
import { getUserById } from '../models/UserModel';
import { allClassData, getClassInfoByClassId } from '../models/ClassModel';

// Create a new assignment  from the user
async function addNewAssignment(req: Request, res: Response): Promise<void> {
  const { isLoggedIn, authenticatedUser } = req.session;
  // Check to see if user is logged in
  if (!isLoggedIn) {
    res.sendStatus(401);
    res.redirect('/login'); // If not logged in, redirect to login page
    return;
  }

  // Check to see what user is logging in
  const { userID } = authenticatedUser;
  const user = await getUserById(userID);
  if (!user) {
    res.redirect('/login'); // If user does not exist, redirect to login page
    return;
  }

  const { assignmentName, assignmentType, dueDate, classId } = req.body as NewAssignmentRequest;
  const classInfo = await getClassInfoByClassId(classId);

  const assignment = await insertAssignment(assignmentName, assignmentType, dueDate, classInfo);
  console.log(assignment);

  console.log(req.body);

  // res.status(201).send('Assignment Added!😊');
  res.redirect(`/courses/${classId}`);
}

// Grab assignment from the database
async function getAssignment(req: Request, res: Response): Promise<void> {
  const { assignmentId } = req.params as { assignmentId: string };

  const assignment = await getAssignmentsByUserId(assignmentId); // Fix Me

  if (!assignment) {
    res.sendStatus(404); // Not found
    return;
  }

  console.log(assignment);

  res.status(200).json(assignment);
}
// renderCreateAssignmentPage
async function renderCreateAssignmentPage(req: Request, res: Response): Promise<void> {
  const classes = await allClassData();

  res.render('createAssignmentPage', { classes });
}

// async function getAllAssignments(req: Request, res: Response, userID: string): Promise<void> {
//   res.status(200).json(await getAssignmentsByUserId(userID));
// }

export { addNewAssignment, getAssignment, renderCreateAssignmentPage };
