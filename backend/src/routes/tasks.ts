import express from 'express';
import { TaskController } from '../controllers/taskController.ts';
import { validateTask, validateTaskId } from '../middleware/validateTask.ts';

export const router = express.Router();
const taskController = new TaskController();

router.get('/', (req, res) => taskController.getAllTasks(req, res));
router.get('/:id', validateTaskId, (req, res) => taskController.getTaskById(req, res));
router.post('/', validateTask, (req, res) => taskController.createTask(req, res));
router.put('/:id', [validateTaskId, validateTask], (req, res) => taskController.updateTask(req, res));
router.delete('/:id', validateTaskId, (req, res) => taskController.deleteTask(req, res));
