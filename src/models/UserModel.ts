import { AppDataSource } from '../dataSource';
import { User } from '../entities/User';

const userRepository = AppDataSource.getRepository(User);

async function addUser(email: string, passwordHash: string): Promise<User> {
  // Create a new user object and set the properties
  let newUser = new User();
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

async function getUserbyId(userID: string): Promise<User | null> {
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

export { addUser, getUserByEmail, getUserbyId, allUserData, updateEmailAddress };
