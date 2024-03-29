// import { addWeeks } from 'date-fns';
import { AppDataSource } from '../dataSource';
import { User } from '../entities/User';

const userRepository = AppDataSource.getRepository(User);

async function addUser(
  username: string,
  firstName: string,
  lastName: string,
  classification: string,
  email: string,
  passwordHash: string
): Promise<User> {
  // Create a new user object and set the properties
  let newUser = new User();
  newUser.username = username;
  newUser.firstName = firstName;
  newUser.lastName = lastName;
  newUser.classification = classification;
  newUser.email = email;
  newUser.passwordHash = passwordHash;

  // Save it in the database
  newUser = await userRepository.save(newUser);

  // Return the created user
  return newUser;
}

async function getUserByEmail(email: string): Promise<User | null> {
  return userRepository.findOne({ where: { email } });
}

async function allUserData(): Promise<User[]> {
  return userRepository.find();
}

async function getUserById(userID: string): Promise<User | null> {
  const user = await userRepository.findOne({ where: { userID } });
  return user;
}

async function updateEmailAddress(userID: string, newEmail: string): Promise<void> {
  await userRepository
    .createQueryBuilder()
    .update(User)
    .set({ email: newEmail })
    .where({ userID })
    .execute();
}

// async function getRemindersDueInOneWeek(): Promise<User[]> {
//   const today = new Date();
//   const oneWeekFromToday = addWeeks(today, 2);

//   const users = await userRepository
//     .createQueryBuilder('user')
//     .leftJoinAndSelect('user.reminders', 'reminders')
//     .select(['user.userId', 'user.email', 'user.username', 'reminders'])
//     .where('reminders.sendNotificationOn <= :oneWeekFromToday', { oneWeekFromToday })
//     .andWhere('reminders.sendNotificationOn > :today', { today })
//     .getMany();

//   return users;
// }

export {
  addUser,
  getUserByEmail,
  getUserById,
  allUserData,
  updateEmailAddress,
  // getRemindersDueInOneWeek,
};
