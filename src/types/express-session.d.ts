import 'express-session';

declare module 'express-session' {
  export interface Session {
    clearSession(): Promise<void>; // Do not change

    // Notes: Example app's custom session properties
    authenticatedUser: {
      userID: string;
      email: string;
    };
    isLoggedIn: boolean;
    logInAttempts: number;
    logInTimeout: string;
  }
}
