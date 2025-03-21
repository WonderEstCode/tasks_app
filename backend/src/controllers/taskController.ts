import { Request, Response } from "express";
import { readTasks, writeTasks } from "../utils/database.js";
import { Task, CreateTaskDTO, UpdateTaskDTO } from "../types/task.js";
import { v4 as uuidv4 } from "uuid";

export class TaskController {
  public async getAllTasks(_req: Request, res: Response): Promise<Response> {
    try {
      const tasks = await readTasks();

      const sortedTasks = tasks.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });

      return res.status(200).json(sortedTasks);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error retrieving tasks: ${error}` });
    }
  }

  public async getTaskById(req: Request, res: Response): Promise<Response> {
    try {
      const tasks = await readTasks();
      const task = tasks.find((t) => t.id === req.params.id);

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      return res.status(200).json(task);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error retrieving task: ${error}` });
    }
  }

  public async createTask(req: Request, res: Response): Promise<Response> {
    try {
      const { title, description }: CreateTaskDTO = req.body;

      if (!title) {
        return res.status(400).json({ message: "Title is required" });
      }

      const tasks = await readTasks();
      const newTask: Task = {
        id: uuidv4(),
        title,
        description: description || "",
        completed: false,
        createdAt: new Date().toISOString(),
      };

      tasks.push(newTask);
      await writeTasks(tasks);

      return res.status(201).json(newTask);
    } catch (error) {
      return res.status(500).json({ message: `Error creating task: ${error}` });
    }
  }

  public async updateTask(req: Request, res: Response): Promise<Response> {
    try {
      const { title, description, completed }: UpdateTaskDTO = req.body;
      const tasks = await readTasks();
      const taskIndex = tasks.findIndex((t) => t.id === req.params.id);

      if (taskIndex === -1) {
        return res.status(404).json({ message: "Task not found" });
      }

      tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: title || tasks[taskIndex].title,
        description:
          description !== undefined
            ? description
            : tasks[taskIndex].description,
        completed:
          completed !== undefined ? completed : tasks[taskIndex].completed,
        updatedAt: new Date().toISOString(),
      };

      await writeTasks(tasks);
      return res.status(200).json(tasks[taskIndex]);
    } catch (error) {
      return res.status(500).json({ message: `Error updating task: ${error}` });
    }
  }

  public async deleteTask(req: Request, res: Response): Promise<Response> {
    try {
      const tasks = await readTasks();
      const taskIndex = tasks.findIndex((t) => t.id === req.params.id);

      if (taskIndex === -1) {
        return res.status(404).json({ message: "Task not found" });
      }

      tasks.splice(taskIndex, 1);
      await writeTasks(tasks);

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: `Error deleting task: ${error}` });
    }
  }
}
