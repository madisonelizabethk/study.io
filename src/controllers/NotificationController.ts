import { Request, Response } from 'express';
import { addNotification } from '../models/NotificationModel';
import { allAssignmentData, getAssignmentById } from '../models/AssignmentModel';

async function createNotification(req: Request, res: Response): Promise<void> {
  if (!req.session.isLoggedIn) {
    res.sendStatus(401); // 401 Unauthorized
    return;
  }

  const { sendNotificationOn, assignmentId } = req.body as CreateNotificationBody;
  const assignment = await getAssignmentById(assignmentId);

  const notification = await addNotification(sendNotificationOn, assignment);

  // res.sendStatus(201);
  res.json(notification);
}

// renderCreateAssignmentPage
async function renderNotificationPage(req: Request, res: Response): Promise<void> {
  const assignments = await allAssignmentData();

  res.render('notificationPage', { assignments });
}

export { createNotification, renderNotificationPage };
