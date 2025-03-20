import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { router as tasksRouter } from './routes/tasks.ts';
import { errorHandler } from './middleware/errorHandler.ts';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    message: 'Welcome to the Tasks API',
    endpoints: {
      tasks: {
        GET: '/api/tasks - Get all tasks',
        POST: '/api/tasks - Create a new task',
        GET_ONE: '/api/tasks/:id - Get a specific task',
        PUT: '/api/tasks/:id - Update a task',
        DELETE: '/api/tasks/:id - Delete a task'
      }
    }
  });
});

app.use('/api/tasks', tasksRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});