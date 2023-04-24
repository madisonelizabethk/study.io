import './config'; // Load environment variables
import 'express-async-errors'; // Enable default error handling for async errors
import express, { Express } from 'express';

import session from 'express-session';
import connectSqlite3 from 'connect-sqlite3';
import {
  registerUser,
  logIn,
  getUserProfileData,
  getAllUserProfiles,
  updateUserEmail,
} from './controllers/UserController';
import { createClassInfo } from './controllers/ClassController';
import { addNewTerm } from './controllers/TermController';

const app: Express = express();
app.set('view engine', 'ejs');
const { PORT, COOKIE_SECRET } = process.env;

const SQLiteStore = connectSqlite3(session);
const store = new SQLiteStore({ db: 'sessions.sqlite' });

app.use(express.static('public', { extensions: ['html'] }));

app.use(
  session({
    store,
    secret: COOKIE_SECRET,
    cookie: { maxAge: 8 * 60 * 60 * 1000 }, // 8 hours
    name: 'session',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/api/users', registerUser); // Create an account for the user
app.post('/api/login', logIn); // Log in to an account

app.get('/api/users', getAllUserProfiles);
app.get('/api/users/:targetUserID', getUserProfileData);
app.post('/api/users/:targetUserID/email', updateUserEmail);

// ClassInfo Endpoints
app.post('/api/classes', createClassInfo); // Fix me

// Term Endpoints
// app.get('api/terms', getTermsByUserID); // Fix me
// app.get('/terms/:termID', getTerm); // Fix me
app.post('/api/terms/', addNewTerm);

// Quiz Endpoints
// app.post('/api/terms/:termID/quizzes', makeQuiz); // Fix me

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
  console.log(`My database is called: ${process.env.DATABASE_NAME}`);
});

// test commit new
