import React, { useState } from "react";
import { Task } from "../types";
import { Check, Circle, Pencil, Trash2 } from "lucide-react";
import { Modal } from "./Modal";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: string) => void;
  onEditTask: (
    taskId: string,
    updates: { title: string; description: string }
  ) => void;
  onDeleteTask: (taskId: string) => void;
}

interface EditingTask {
  id: string;
  title: string;
  description: string;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
}) => {
  const [editingTask, setEditingTask] = useState<EditingTask | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const handleStartEdit = (task: Task) => {
    setEditingTask({
      id: task.id,
      title: task.title,
      description: task.description,
    });
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleSaveEdit = () => {
    if (!editingTask) return;
    console.log("Saving task:", editingTask);
    onEditTask(editingTask.id, {
      title: editingTask.title,
      description: editingTask.description,
    });
    setEditingTask(null);
  };

  const handleConfirmDelete = () => {
    if (!taskToDelete) return;
    console.log("Deleting task:", taskToDelete);
    onDeleteTask(taskToDelete);
    setTaskToDelete(null);
  };

  return (
    <>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`group p-4 glass-effect rounded-xl shadow-lg transition-all hover:shadow-xl border border-slate-200/20 dark:border-slate-700/20 ${
              task.completed
                ? "border-green-400/20 dark:border-green-500/20"
                : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => onToggleComplete(task.id)}
                className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  task.completed
                    ? "border-green-500 bg-gradient-to-r from-green-400 to-green-500 text-white"
                    : "border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500"
                }`}
              >
                {task.completed ? (
                  <Check size={14} />
                ) : (
                  <Circle
                    size={14}
                    className="opacity-0 group-hover:opacity-100"
                  />
                )}
              </button>

              <div className="flex-grow">
                {editingTask?.id === task.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editingTask.title}
                      onChange={(e) =>
                        setEditingTask({
                          ...editingTask,
                          title: e.target.value,
                        })
                      }
                      className="text-white w-full px-3 py-1 text-lg rounded-lg bg-white/50 dark:bg-slate-700/50 border border-slate-200/20 dark:border-slate-700/50 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 outline-none"
                    />
                    <textarea
                      value={editingTask.description}
                      onChange={(e) =>
                        setEditingTask({
                          ...editingTask,
                          description: e.target.value,
                        })
                      }
                      rows={4}
                      className="text-white w-full px-3 py-1 rounded-lg bg-white/50 dark:bg-slate-700/50 border border-slate-200/20 dark:border-slate-700/50 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 outline-none resize-none"
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-1 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors flex items-center gap-1"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleSaveEdit}
                        className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center gap-1"
                      >
                        Guardar cambios
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3
                      className={`text-lg font-medium ${
                        task.completed
                          ? "text-slate-400 dark:text-slate-500 line-through"
                          : "text-slate-700 dark:text-slate-200"
                      }`}
                    >
                      {task.title}
                    </h3>
                    <p
                      className={`text-sm ${
                        task.completed
                          ? "text-slate-400 dark:text-slate-500"
                          : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {task.description}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </p>
                  </>
                )}
              </div>

              {!editingTask && (
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleStartEdit(task)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => setTaskToDelete(task.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        title="Eliminar tarea"
      >
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-400">
            ¿Estás seguro de que quieres eliminar esta tarea? Esta acción no se
            puede deshacer.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setTaskToDelete(null)}
              className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
