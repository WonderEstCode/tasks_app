import express, { Request, Response } from "express";
import {
  validateTask,
  validateTaskId,
  validateTaskUpdate,
} from "../middleware/validateTask.js";
import { TaskController } from "../controllers/taskController.js";

export const router = express.Router();
const taskController = new TaskController();

router.get("/", (req, res) => taskController.getAllTasks(req, res));
router.get(
  "/:id",
  validateTaskId,
  (req: express.Request<{ id: string }>, res: express.Response) =>
    taskController.getTaskById(req, res)
);
router.post("/", validateTask, (req: Request, res: Response) =>
  taskController.createTask(req, res)
);
router.put(
  "/:id",
  validateTaskId,
  validateTaskUpdate,
  (req: Request, res: Response) => taskController.updateTask(req, res)
);
router.delete("/:id", validateTaskId, (req: Request, res: Response) =>
  taskController.deleteTask(req, res)
);
