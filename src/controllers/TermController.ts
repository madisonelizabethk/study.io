import { Request, Response } from 'express';
import { getTermsByUserID, allTermData, insertTerm } from '../models/TermModel';
import { getUserById } from '../models/UserModel';

// Create a new term from the user
async function addNewTerm(req: Request, res: Response): Promise<void> {
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

  const { question, answer } = req.body as NewTermRequest;

  const term = await insertTerm(question, answer);
  console.log(term);

  // res.status(201).json(term);
  res.redirect('/terms');
}

// Grab terns from the database
async function getTerm(req: Request, res: Response): Promise<void> {
  const { termID } = req.params as { termID: string };

  const term = await getTermsByUserID(termID); // Fix Me

  if (!term) {
    res.sendStatus(404); // Not found
    return;
  }

  console.log(term);

  res.status(200).json(term);
}

async function renderTerms(req: Request, res: Response): Promise<void> {
  const terms = await allTermData();

  // Don't send back raw json data
  // res.status(200).json(terms);

  // Render a beautiful page
  res.render('termsPage', { terms });
}
export { addNewTerm, getTerm, renderTerms };
