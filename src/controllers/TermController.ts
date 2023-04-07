import { Request, Response } from 'express';
import { allTermData, getTermsByUserID } from '../models/TermModel';

async function getTerm(req: Request, res: Response): Promise<void> {
  const { termID } = req.params as { termID: string };

  const term = await getTermsByUserID(termId);

  if (!term) {
    res.sendStatus(404); // Not found
    return;
  }

  res.status(200).json(term);
}

async function getAllTerms(req: Request, res: Response): Promise<void> {
  res.status(200).json(await getTermsFromUser());
}

export { getTerm, getAllTerms };
