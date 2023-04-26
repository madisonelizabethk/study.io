import { parseISO } from 'date-fns';
import { AppDataSource } from '../dataSource';
import { Notification } from '../entities/Notification';

import { User } from '../entities/User';

const notificationRepository = AppDataSource.getRepository(Notification);

async function addNotification(
  sendNotificationOn: string,
  user: User
): Promise<Notification | null> {
  // Create the new user object
  let newNotification = new Notification();
  newNotification.user = user;
  newNotification.sendNotificationOn = parseISO(sendNotificationOn);

  newNotification = await notificationRepository.save(newNotification);

  return newNotification;
}

export { addNotification };
