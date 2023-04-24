import { Request, Response } from 'express';
import argon2 from 'argon2';
import {
  addUser,
  getUserByEmail,
  getUserById,
  allUserData,
  updateEmailAddress,
} from '../models/UserModel';
import { parseDatabaseError } from '../utils/db-utils';
import { sendEmail } from '../services/emailService';

async function getAllUserProfiles(req: Request, res: Response): Promise<void> {
  res.json(await allUserData());
}

async function registerUser(req: Request, res: Response): Promise<void> {
  const { username, firstName, lastName, classification, email, password } =
    req.body as NewUserRequest;

  // IMPORTANT: Hash the password
  const passwordHash = await argon2.hash(password);

  try {
    const newUser = await addUser(
      username,
      firstName,
      lastName,
      classification,
      email,
      passwordHash
    );
    console.log(newUser);

    await sendEmail(email, 'Welcome!', `Thank you for joining my application!`);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function logIn(req: Request, res: Response): Promise<void> {
  console.log(req.session);

  // Notes: We need to convert the date string back into a Date() object
  // 'parseISO()' does the conversion

  const { email, password } = req.body as AuthRequest;

  const user = await getUserByEmail(email);
  if (!user) {
    res.sendStatus(404); // Not found, email doesn't exist
    return;
  }

  const { passwordHash } = user;
  if (!(await argon2.verify(passwordHash, password))) {
    res.sendStatus(404); // Not found, user with email/pass does not exist
    return;
  }

  // Clear session before setting their authenticated session data
  await req.session.clearSession();

  // Add whatever data we want to session
  req.session.authenticatedUser = {
    userID: user.userID,
    email: user.email,
  };
  req.session.isLoggedIn = true;

  res.sendStatus(200);
}

async function getUserProfileData(req: Request, res: Response): Promise<void> {
  const { targetUserID } = req.params as UserIdParam;

  // Get the user account
  const user = await getUserById(targetUserID);

  if (!user) {
    res.sendStatus(404); // Not found
    return;
  }

  res.json(user); // Send back user data
}

async function updateUserEmail(req: Request, res: Response): Promise<void> {
  const { targetUserID } = req.params as UserIdParam;

  // Notes: Access the data from `req.session`
  const { isLoggedIn, authenticatedUser } = req.session;

  // Notes: Need to make sure client is logged in and trying to modify
  // their own user account
  if (!isLoggedIn || authenticatedUser.userID !== targetUserID) {
    res.sendStatus(403); // Forbidden
    return;
  }

  const { email } = req.body as { email: string };

  // Get user account
  const user = await getUserById(targetUserID);

  if (!user) {
    res.sendStatus(404); // Not found
    return;
  }

  // Now update their email address
  try {
    await updateEmailAddress(targetUserID, email);
  } catch (err) {
    // Email was taken, need to send error message
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
    return;
  }

  res.sendStatus(200);
}

export { registerUser, logIn, getUserProfileData, getAllUserProfiles, updateUserEmail };
