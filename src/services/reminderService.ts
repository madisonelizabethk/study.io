import { getNotificationsDueToday } from '../models/NotificationModel';
import { Notification } from '../entities/Notification';
import { sendEmail } from './emailService';
// import { User } from '../entities/User';
// import { Assignment } from '../entities/Assignment';

// Formatting the emails
async function sendReminders(notifications: Notification[]): Promise<void> {
  console.log(JSON.stringify(notifications, null, 4));
  for (const notification of notifications) {
    const { assignment } = notification;
    const { assignmentName, assignmentType, dueDate, classInfo } = assignment;
    const { className, users } = classInfo;

    for (const user of users) {
      const subject = `Reminder for ${dueDate.toLocaleDateString()}`;
      const message = `Due Today: \n Assignment: ${assignmentName} \n Assignment Type: ${assignmentType} \n Class Name: ${className} \n`;

      await sendEmail(user.email, subject, message);
    }
  }
}

// Sending Email
async function sendTheReminder(): Promise<void> {
  const notifications = await getNotificationsDueToday();
  await sendReminders(notifications);
}

export { sendTheReminder };
