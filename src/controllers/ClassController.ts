import { Request, Response } from 'express';

// async function getClassInfo

async function getClassName(req: Request, res: Response): Promise<void> {
  const { studentID } = req.body;

  let class = await(getClassInfo);

  if (!class) {
    res.sendStatus(404); // Class Name Not found
    return;
  }

  res.json(class); // Send back user data
}

export { getClassName };
