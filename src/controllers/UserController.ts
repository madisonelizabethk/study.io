import { Request, Response } from 'express';
import argon2 from 'argon2';
import {
  addUser,
  getUserByEmail,
  incrementProfileViews,
  getUserProfileData,
} from '../models/UserModel';
import { parseDatabaseError } from '../utils/db-utils';

async function registerUser(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as AuthRequest;

  // IMPORTANT: Hash the password
  const passwordHash = await argon2.hash(password);

  try {
    const newUser = await addUser(email, passwordHash);
    console.log(newUser);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function logIn(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as AuthRequest;

  const user = await getUserByEmail(email);

  // Check if the user account exists for that email
  if (!user) {
    res.sendStatus(404); // Not Found
    return;
  }

  // The account exists, check password
  const { passwordHash } = user;

  // If password does not match
  if (!(await argon2.verify(passwordHash, password))) {
    res.sendStatus(404); // Not found
    return;
  }

  res.sendStatus(200); // OK
}

async function getUserProfileData(req: Request, res: Response): Promise<void> {
  const { userID } = req.params as UserIdParam;

  // Get the user account
  let user = await getUserById(userID);

  if (!user) {
    res.sendStatus(404); // Not found
    return;
  }
  // Update profile views
  user = await incrementProfileViews(user);

  res.json(user); // Send back user data
}

export { registerUser, logIn, getUserProfileData };
