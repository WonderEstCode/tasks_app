export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export type TaskUpdateData = Partial<Omit<Task, 'id' | 'createdAt'>>;