import './config'; // Load environment variables
import 'express-async-errors'; // Enable default error handling for async errors
import express, { Express } from 'express';
import { registerUser, login } from './controllers/UserController';

const app: Express = express();
app.use(express.json());

const { PORT } = process.env;

app.post('/api/users', registerUser); // Create an account for the user
app.post('/api/users/:userId/email', login); // Log in account

app.listen(PORT, () => {
  console.log('Listening at http://localhost:${PORT}');
})

export { registerUser, login }
