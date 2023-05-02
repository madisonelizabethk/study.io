import { Request, Response } from 'express';
import { getUserById } from '../models/UserModel';
import { allQuizData, getQuizzesByUserId, insertQuiz, getQuizById } from '../models/QuizModel';
import { allTermData, getTermByTermID } from '../models/TermModel';

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

  // res.status(201).json(quiz);
  res.redirect('/quizzes');
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
async function renderQuizCreationPage(req: Request, res: Response): Promise<void> {
  const { isLoggedIn } = req.session;
  // Check to see if a user is logged in
  if (!isLoggedIn) {
    res.redirect('/login'); // If not logged in, redirect to login page
    return;
  }
  const terms = await allTermData();

  res.render('quizPage', { terms });
}

async function renderQuizSelectionPage(req: Request, res: Response): Promise<void> {
  const quizzes = await allQuizData();

  res.render('quizSelectionPage', { quizzes });
}

async function renderTakingQuizPage(req: Request, res: Response): Promise<void> {
  const { isLoggedIn } = req.session;
  // Check to see if a user is logged in
  if (!isLoggedIn) {
    res.redirect('/login'); // If not logged in, redirect to login page
    return;
  }

  const { quizId } = req.query as { quizId: string };
  const quiz = await getQuizById(quizId);
  console.log(quiz);

  res.render('takeQuizPage', { quiz });
}

async function checkQuizAnswers(req: Request, res: Response): Promise<void> {
  const { isLoggedIn } = req.session;
  // Check to see if a user is logged in
  if (!isLoggedIn) {
    res.redirect('/login'); // If not logged in, redirect to login page
    return;
  }

  // Check if the user's answer is correct
  const { quizId } = req.params as { quizId: string };
  const quiz = await getQuizById(quizId);
  const { answers } = req.body as { answers: string[] };
  let counter = 0;
  for (let i = 0; i < quiz.terms.length; i += 1) {
    const term = quiz.terms[i];
    const answer = answers[i];

    if (term.answer !== answer) {
      console.log('Incorrect!');
    } else {
      console.log('Correct!');
      counter += 1;
    }
  }
  console.log(answers);
  console.log(quiz);

  res.render('quizResultsPage', { counter, numQuestions: quiz.terms.length });
}

export {
  addQuiz,
  getQuiz,
  renderQuizCreationPage,
  renderQuizSelectionPage,
  renderTakingQuizPage,
  checkQuizAnswers,
};
