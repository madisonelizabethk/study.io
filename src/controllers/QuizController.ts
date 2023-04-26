import { Request, Response } from 'express';
import { getUserById } from '../models/UserModel';
import { allQuizData, getQuizzesByUserId, insertQuiz } from '../models/QuizModel';
import { getTermByTermID } from '../models/TermModel';

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

  const { setName, termIDs } = req.body as NewQuizRequest;

  const terms = [];
  for (const termId of termIDs) {
    const term = await getTermByTermID(termId);
    terms.push(term);
  }

  const quiz = await insertQuiz(terms, setName);
  console.log(quiz);

  res.status(201).json(quiz);
}

// Grab quizzes from the database
async function getQuiz(req: Request, res: Response): Promise<void> {
  const { quizID } = req.params as { quizID: string };

  const quiz = await getQuizzesByUserId(quizID);

  if (!quiz) {
    res.sendStatus(404); // Not found
    return;
  }

  res.status(200).json(quiz);
}

// Quiz Page
async function renderQuizzes(req: Request, res: Response): Promise<void> {
  const quizzes = await allQuizData();

  res.render('quizPage', { quizzes });
}

export { addQuiz, getQuiz, renderQuizzes };
