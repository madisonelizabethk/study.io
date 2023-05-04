import { Request, Response } from 'express';

async function createNotification(req: Request, res: Response): Promise<void> {
  if (!req.session.isLoggedIn) {
    res.sendStatus(401); // 401 Unauthorized
    return;
  }

  const { authenticatedUser } = req.session;
  const user = await getUserById(authenticatedUser.userID);

  const { sendNotificationOn } = req.body as CreateNotificationBody;
  const notification = await createNotification(sendNotificationOn, assignment);

  res.sendStatus(201);
}

export { createNotification };
