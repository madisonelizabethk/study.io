import { Request, Response } from 'express';
import { getUserById } from '../models/UserModel';
import { insertQuiz } from '../models/QuizModel';

// Function: Add a new quiz
async function addQuiz(req: Request, res: Response): Promise<void> {
  const { isLoggedIn, authenticatedUser } = req.session;
  // Check to see if a user is logged in
  if (!isLoggedIn) {
    res.sendStatus(404);
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

  const { scores, setName } = req.body as NewQuizRequest;

  const quiz = await insertQuiz(scores, user, setName);
  console.log(quiz);

  res.status(201).json(quiz);
}

// async function getQuiz(req: Request, res: Response): Promise<void> {
//   const { quizID } = req.params as { quizID: string };

//   const quiz = await getCoursesByClassID(quizID);

//   if (!quiz) {
//     res.sendStatus(404);
//     return;
//   }

//   res.status(200).json(quiz);
// }

export { addQuiz };
