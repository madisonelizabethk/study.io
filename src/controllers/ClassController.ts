import { Request, Response } from 'express';
import { allClassData } from '../models/ClassModel';

async function getAllClasses(req: Request, res: Response): Promise<void> {
  res.json(await allClassData());
}

async function addClass(req: Request, res: Reponse): Promise<void> {}

export { getAllClasses, addClass };
