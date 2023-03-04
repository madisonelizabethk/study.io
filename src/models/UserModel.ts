import { AppDataSource } from '../datsSource';
import { User } from '../entities/User';

const userRepository = AppDataSource.getRepository(User);

async function addUser (email: string, passwordHash: string): Promise<User>{

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
  return await userRepository.findOne({ where: { email } })
}

async function getUserById(userId: string): Promise<User | null> {
  const user = await userRepository.findOne({ where: { userId } });
  return user;
}

async function getUsersByViews(minViews: number): Promise<User[]>{
  const users = await userRepository
     .createQueryBuilder('user')
     .where('profileViews >= :minViews', { minViews })
     .select(['user.email', 'user.profileViews', 'user.joinedOn', 'user.userId'])
     .getMany();

  return users;
}

export { addUser, getUserByEmail, getUserById, getUsersByViews };
