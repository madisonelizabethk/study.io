import { parseISO } from 'date-fns';
import { AppDataSource } from '../dataSource';
import { Notification } from '../entities/Notification';
import { Assignment } from '../entities/Assignment';

const notificationRepository = AppDataSource.getRepository(Notification);

async function addNotification(
  sendNotificationOn: string,
  // items: string[],
  assignment: Assignment
): Promise<Notification | null> {
  // Create the new user object
  let newNotification = new Notification();
  newNotification.assignment = assignment;
  newNotification.sendNotificationOn = parseISO(sendNotificationOn);

  newNotification = await notificationRepository.save(newNotification);

  return newNotification;
}

export { addNotification };
