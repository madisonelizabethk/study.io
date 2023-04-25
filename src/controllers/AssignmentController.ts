// import { Request, Response } from 'express';
// import { getAssignmentsByUserID, insertAssignment } from '../models/AssignmentModel';
// import { getUserById } from '../models/UserModel';

// // Create a new term from the user
// async function addNewAssignment(req: Request, res: Response): Promise<void> {
//   const { isLoggedIn, authenticatedUser } = req.session;
//   // Check to see if user is logged in
//   if (!isLoggedIn) {
//     res.sendStatus(401);
//     res.redirect('/login'); // If not logged in, redirect to login page
//     return;
//   }

//   // Check to see what user is logging in
//   const { userID } = authenticatedUser;
//   const user = await getUserById(userID);
//   if (!user) {
//     res.redirect('/login'); // If user does not exist, redirect to login page
//     return;
//   }

//   const { assignmentName, assignmentType, className, dueDate, dueTime } =
//     req.body as NewAssignmentRequest;

//   const assignment = await insertAssignment(
//     assignmentName,
//     assignmentType,
//     className,
//     dueDate,
//     dueTime
//   );
//   console.log(assignment);

//   res.status(201).json(assignment);
// }

// // Grab terns from the database
// async function getAssignment(req: Request, res: Response): Promise<void> {
//   const { assignmentID } = req.params as { assignmentID: string };

//   const assignment = await getAssignmentsByUserID(assignmentID); // Fix Me

//   if (!assignment) {
//     res.sendStatus(404); // Not found
//     return;
//   }

//   console.log(assignment);

//   res.status(200).json(assignment);
// }

// async function getAllAssignments(req: Request, res: Response, userID: string): Promise<void> {
//   res.status(200).json(await getAssignmentsByUserID(userID));
// }
// export { addNewAssignment, getAssignment, getAllAssignments };
