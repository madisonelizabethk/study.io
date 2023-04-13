// import { Request, Response } from 'express';
// import { getCoursesByClassID } from '../models/ClassModel';
// import { getUserbyId } from '../models/UserModel';

// async function getQuiz(req: Request, res: Response): Promise<void> {
//   const { quizID } = req.params as { quizID: string };

//   const quiz = await getCoursesByClassID(quizID);

//   if (!quiz) {
//     res.sendStatus(404);
//     return;
//   }

//   res.status(200).json(quiz);
// }

// async function createQuiz(req: Request, res: Response): Promise<void> {
//   const { termID } = req.params as { termID: string };
//   const { authenticatedUser, isLoggedIn } = req.session;
//   if (!isLoggedIn) {
//     res.sendStatus(401);
//     return;
//   }

//   const class = await getCoursesByClassID(classID);
//   const user = await getUserbyId(authenticatedUser.userID);

//   if (!class || !user) {
//     res.sendStatus(404);
//     return;
//   }

// }

// export { getQuiz };
