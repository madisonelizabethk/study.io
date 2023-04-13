import { Request, Response } from 'express';
import { getTermsByUserID, addTerm } from '../models/TermModel';
import { getUserById } from '../models/UserModel';

async function createTerm(req: Request, res: Response): Promise<void> {
  const { isLoggedIn, authenticatedUser } = req.session;
  if (!isLoggedIn) {
    res.sendStatus(401);
    res.redirect('/login');
    return;
  }
  const { userID } = authenticatedUser;
  const user = await getUserById(userID);
  if (!user) {
    res.redirect('/login');
    return;
  }

  const { question, answer } = req.body as NewTermRequest;

  const term = await addTerm(question, user, answer);
  console.log(term);

  res.sendStatus(201).json(term);
}

async function getTerm(req: Request, res: Response): Promise<void> {
  const { termID } = req.params as { termID: string };

  const term = await getTermsByUserID(termID);

  if (!term) {
    res.sendStatus(404); // Not found
    return;
  }

  console.log(term);

  res.status(200).json(term);
}

async function getAllTerms(req: Request, res: Response, userID: string): Promise<void> {
  res.status(200).json(await getTermsByUserID(userID));
}
export { createTerm, getTerm, getAllTerms };
