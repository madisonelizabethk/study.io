import { Request, Response } from 'express';
import { addUser } from '../models/UserModel';

async function registerUser(req:Request, res: Response): Promise<void> {
  const { email, password } = req.body as NewUserRequest;

  const newUser = await addUser(email, password);
  console.log('\nAdded new user: ');
  console.log(newUser);

  res.sendStatus(201); // 201 created
}

function addUser(email: string, passwordHash: string) : User {
  // Create a new user object and set the properties
  let newUser = new User();
  newUser.email = email;
  newUser.passwordHash = passwordHash;

  // Save it in the database
  newUser = userRepository.save(newUser);

  // Return the created user
  return newUser;
}

export { registerUser, addUser };

