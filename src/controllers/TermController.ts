import { Request, Response } from 'express';
import { allTermData, getTermsByUserID, addTerm } from '../models/TermModel';

async function createTerm(req: Request, res: Response): Promise<void> {
  const { isLoggedIn } = req.session;
  if (!isLoggedIn) {
    res.sendStatus(401);
    res.redirect('/login');
    return;
  }

  const { question, answer, inPublicDomain } = req.body as NewTermRequest;
  console.log(`inPublicDomain: ${inPublicDomain}`);
  console.log(`inPublicDomain after converting: ${!!inPublicDomain}`);

  const term = await addTerm(question, answer, !!inPublicDomain);
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
export { getTerm, getAllTerms };
