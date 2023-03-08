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

async function getUserById(userID: string): Promise<User | null> {
  const user = await userRepository.findOne({ where: { userID } });
  return user;
}

async function getUsersByViews(minViews: number): Promise<User[]> {
  const users = await userRepository
    .createQueryBuilder('user')
    .where('profileViews >= :minViews', { minViews })
    .select(['user.email', 'user.profileViews', 'user.joinedOn', 'user.userId'])
    .getMany();

  return users;
}

async function getAllUnverifiedUsers(): Promise<User[]> {
  return userRepository.find({
    select: { email: true, userID: true },
    where: { verifiedEmail: false },
  });
}

// Test unverified users function
console.log(await getAllUnverifiedUsers());

async function getViralUsers(): Promise<User[]> {
  const viralUsers = await userRepository
    .createQueryBuilder('user')
    .where('profileViews >= :viralAmount', { viralAmount: 1000 })
    .select(['user.email', 'user.profileViews'])
    .getMany();

  return viralUsers;
}

async function resetAllProfileViews(): Promise<void> {
  await userRepository
    .createQueryBuilder()
    .update(User)
    .set({ profileViews: 0 })
    .where('unverified <> true')
    .execute();
}

async function incrementProfileViews(userData: User): Promise<User> {
  const updatedUser = userData;
  updatedUser.profileViews += 1;

  await userRepository
    .createQueryBuilder()
    .update(User)
    .set({ profileViews: updatedUser.profileViews })
    .where({ userId: updatedUser.userID })
    .execute();

  return updatedUser;
}

async function updateEmailAddress(userId: string, newEmail: string): Promise<void> {
  await userRepository
    .createQueryBuilder()
    .update(User)
    .set({ email: newEmail })
    .where({ userId })
    .execute(); // Returns a promise
}
export { addUser, getUserByEmail, getUserById, getUsersByViews, getViralUsers };
export { resetAllProfileViews, incrementProfileViews, updateEmailAddress };
