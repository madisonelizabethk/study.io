import './config'; // Load environment variables
import 'express-async-errors'; // Enable default error handling for async errors
import express, { Express } from 'express';

import session from 'express-session';
import connectSqlite3 from 'connect-sqlite3';
import { scheduleJob } from 'node-schedule';
import {
  registerUser,
  logIn,
  getUserProfileData,
  getAllUserProfiles,
  updateUserEmail,
} from './controllers/UserController';
import { createClassInfo, renderClasses, renderClassPage } from './controllers/ClassController';
import { addNewTerm, renderTerms } from './controllers/TermController';
import {
  addQuiz,
  renderQuizSelectionPage,
  renderQuizCreationPage,
  renderTakingQuizPage,
  checkQuizAnswers,
} from './controllers/QuizController';
import { addNewAssignment, renderCreateAssignmentPage } from './controllers/AssignmentController';
import { createNotification, renderNotificationPage } from './controllers/NotificationController';
import { sendTheReminder } from './services/reminderService';

scheduleJob('0 0 9 * * *', sendTheReminder);

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
app.get('/classes', renderClasses); // View Created Classes

// Term Endpoints
// app.get('api/terms', getTermsByUserID); // Fix me
// app.get('/terms/:termID', getTerm); // Fix me
app.post('/api/terms', addNewTerm);
app.get('/terms', renderTerms); // View Existing Terms

// Quiz Endpoints
app.post('/api/quizzes', addQuiz); // Add quiz
app.get('/addQuiz', renderQuizCreationPage); // View Created Quizzes
app.get('/quizzes', renderQuizSelectionPage); // User views their quiz options
app.get('/quizzes/takeQuiz', renderTakingQuizPage); // Get the user's quiz of choice
app.post('/quizzes/:quizId', checkQuizAnswers); // Check User's answers
// app.get('/results', renderQuizResults) // Show results from Quiz

// Reminder Endpoint
// app.post('/api/notifications', _____);
// app.post('/api/notifications');
app.get('/notification', renderNotificationPage);
app.post('/notification', createNotification);

// Assignment Endpoint
app.get('/addAssignment', renderCreateAssignmentPage);
app.post('/api/assignment', addNewAssignment);
app.get('/courses/:classId', renderClassPage);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
  console.log(`My database is called: ${process.env.DATABASE_NAME}`);
});
