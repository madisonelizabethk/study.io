import { parseISO, startOfDay, endOfDay } from 'date-fns';
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

async function getNotificationsDueToday(): Promise<Notification[]> {
  const today = new Date();
  const notification = await notificationRepository
    .createQueryBuilder('notification')
    .leftJoinAndSelect('notification.assignment', 'assignment')
    .leftJoinAndSelect('assignment.classInfo', 'classInfo')
    .leftJoinAndSelect('classInfo.users', 'users')
    .select(['notification', 'assignment', 'users.email', 'classInfo.className'])
    .where('notification.sendNotificationOn <= :endOfToday', { endOfToday: endOfDay(today) })
    .andWhere('notification.sendNotificationOn > :startOfToday', {
      startOfToday: startOfDay(today),
    })
    .getMany();
  // let newNotification = new Notification();
  // if (isToday(sendNotificationOn)) {
  //   // const newNotification = Notification;
  //   // newNotification.notificationId = notificationId;
  //   // newNotification.sendNotificationOn = sendNotificationOn;
  //   // newNotification.assignment = assignment;
  //   return notification;
  // }
  return notification;
}

console.log('\nAll notifications due today:');
console.log(JSON.stringify(await getNotificationsDueToday(), null, 4));
console.log('\n\n');
export { addNotification, getNotificationsDueToday };
