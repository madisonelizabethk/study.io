import { Request, Response } from 'express';
import argon2 from 'argon2';
import { addMinutes, isBefore, parseISO, formatDistanceToNow } from 'date-fns';
import {
  addUser,
  getUserByEmail,
  getUserById,
  incrementProfileViews,
  allUserData,
  resetAllProfileViews,
  getUserProfileData,
  updateEmailAddress,
} from '../models/UserModel';
import { parseDatabaseError } from '../utils/db-utils';

async function getAllUserProfiles(req: Request, res: Response): Promise<Void> {
  res.json(await allUserData());
}

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
  console.log(req.session);

  const now = new Date();
  // Notes: We need to convert the date string back into a Date() object
  // 'parseISO()' does the conversion

  const logInTimeout = parseISO(req.session.logInTimeout);
  // Notes: If the client has a timeout set and it has not expired
  if (logInTimeout && isBefore(now, logInTimeout)) {
    // Notes: This will create a human friendly duration message
    const timeRemaining = formatDistanceToNow(logInTimeout);
    const message = `You have ${timeRemaining} remaining.`;
    // Notes: Reject their request
    res.status(429).send(message); // Too Many Requests

    return;
  }

  const { email, password } = req.body as AuthRequest;

  const user = await getUserByEmail(email);
  if (!user){
    res.sendStatus(404) // Not found, email doesn't exist
    return;
  }

  const { passwordHash } = user;
  if (!(await argon2.verify(passwordHash, password))) {
    // Notes: If they haven't attempted to log in yet
    if (!req.session.logInAttempts) {
      req.session.logInAttempts = 1; // Set attempts to 1
    } else {
      req.session.logInAttempts += 1; // Otherwise increment their attempts
    }
  // Notes: If the client has failed five times then we will add a 3 min timeout
  if (req.session.logInAttempts >= 5) {
    const threeMinutesLater = addMinutes(now, 3).toISOString(); // Must convert to string
    req.session.logInTimeout = threeMinutesLater;
    req.session.logInAttempts = 0; // Reset attempts
  }

  res.sendStatus(404); // Not found, user with email/pass does not exist
  return;

}

// Clear session before setting their authenticated session data
await req.session.clearSession();

// Add whatever data we want to session
req.session.authenticatedUser = {
  userID: user.userID,
  email: user.email;
};
  req.session.isLoggedIn = true;

  res.sendStatus(200);
}
async function getUserProfileData(req: Request, res: Response): Promise<void> {
  const { targetUserID } = req.params as UserIdParam;

  // Get the user account
  let user = await getUserById(targetUserID);

  if (!user) {
    res.sendStatus(404); // Not found
    return;
  }
  // Update profile views
  user = await incrementProfileViews(user);

  res.json(user); // Send back user data
}

async function resetProfileViews(req: Request, res: Response): Promise<void> {
  await resetAllProfileViews();
  res.sendStatus(200);
}

async function updateUserEmail(req: Request, res: Response): Promise<void> {
  const { targetUserID } = req.params as UserIdParam;

  // Notes: Access the data from `req.session`
  const { isLoggedIn, authenticatedUser } = req.session;

  // Notes: Need to make sure client is logged in and trying to modify
  // their own user account
  if(!isLoggedIn || authenticatedUser.userID !== targetUserID) {
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

export {
  registerUser,
  logIn,
  getUserProfileData,
  getAllUserProfiles,
  resetProfileViews,
  updateUserEmail
};
