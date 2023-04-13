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
import { getAllClasses } from './controllers/ClassController';
import { getTermsByUserID } from './models/TermModel';
import { getTerm, createTerm } from './controllers/TermController';

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

app.get('/api/classes', getAllClasses);

app.get('api/terms', getTermsByUserID);
app.get('/terms/:termID', getTerm);
app.post('/api/terms', createTerm);

// Add endpoints for terms
// controller get terms/create terms
// html page for creating terms (make sure user is logged in)

app.listen(PORT, () => {
  console.log('Listening at http://localhost:${PORT}');
});
