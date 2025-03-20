import { promises as fs } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Task } from '../types/task.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '../../data/tasks.json');

export const readTasks = async (): Promise<Task[]> => {
  try {
    const data = await fs.readFile(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      await writeTasks([]);
      return [];
    }
    throw error;
  }
};

export const writeTasks = async (tasks: Task[]): Promise<void> => {
  try {
    await fs.mkdir(dirname(dbPath), { recursive: true });
    await fs.writeFile(dbPath, JSON.stringify(tasks, null, 2));
  } catch (error) {
    throw new Error('Error writing to database');
  }
};