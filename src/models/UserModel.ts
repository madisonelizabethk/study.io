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

async function getAllUnverifiedUsers(): Promise<User[]>{
  return userRepository.find({
    select: { email: true, userId: true },
    where: {verifiedEmail: false},
  });
}

async function getUserByEmail(email: string): Promise<User | null>{
  const user = await userRepository.findOne({ where: {email }});
  return user;
}

async function getViralUsers(): Promise<User[]> {
  const viralUsers = await userRepository

}

export { addUser };
