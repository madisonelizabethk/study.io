import { parseISO } from 'date-fns';
import { AppDataSource } from '../dataSource';
import { Notification } from '../entities/Notification';
import { Reminder } from '../Reminder';

import { User } from '../entities/User';

const notificationRepository = AppDataSource.getRepository(Notification);

async function addNotification(
  sendNotificationOn: string,
  // items: string[],
  user: User
): Promise<Notification | null> {
  // Create the new user object
  let newNotification = new Notification();
  newNotification.username = user.username;
  // newNotification.items = items;
  newNotification.sendNotificationOn = parseISO(sendNotificationOn);

  newNotification = await notificationRepository.save(newNotification);

  return newNotification;
}

export { addNotification };
