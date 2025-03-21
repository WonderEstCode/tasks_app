import { useState, useEffect, useCallback } from "react";
import { Task, TaskUpdateData } from "./types";
import { TaskList } from "./components/TaskList";
import { TaskForm } from "./components/TaskForm";
import { CheckSquare, Plus, ClipboardList, X } from "lucide-react";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const API_URL = "http://localhost:4000/api/tasks";

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setTasks(data);
      setError(null);
    } catch {
      setError(
        "No se pudieron cargar las tareas. Por favor, intenta de nuevo más tarde."
      );
    } finally {
      setIsLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async (taskData: TaskUpdateData) => {
    try {
      const newTask: Omit<Task, "id" | "createdAt"> = {
        title: taskData.title!,
        description: taskData.description || "",
        completed: false,
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const createdTask = await response.json();
      setTasks((prevTasks) => [createdTask, ...prevTasks]);
    } catch {
      setError(
        "No se pudo crear la tarea. Por favor, intenta de nuevo más tarde."
      );
    }
  };

  const handleToggleComplete = async (taskId: string) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;

      const response = await fetch(`${API_URL}/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !task.completed }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === taskId ? updatedTask : t))
      );
    } catch {
      setError(
        "No se pudo actualizar la tarea. Por favor, intenta de nuevo más tarde."
      );
    }
  };

  const handleEditTask = async (
    taskId: string,
    updates: { title: string; description: string }
  ) => {
    try {
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch {
      setError(
        "No se pudo editar la tarea. Por favor, intenta de nuevo más tarde."
      );
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch {
      setError(
        "No se pudo eliminar la tarea. Por favor, intenta de nuevo más tarde."
      );
    }
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="relative mb-6">
        <ClipboardList size={80} className="text-blue-500 animate-pulse" />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-bounce">
          <Plus size={20} className="text-white" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-2">
        ¡Comienza tu día con propósito!
      </h3>
      <p className="text-slate-600 dark:text-slate-400 max-w-md mb-6">
        Cada tarea completada es un paso hacia tus metas. Añade tu primera tarea
        y empieza a construir tu camino hacia el éxito.
      </p>
      {isMobile ? (
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all"
        >
          <span className="flex items-center gap-2">
            <Plus size={20} />
            Añadir nueva tarea
          </span>
        </button>
      ) : (
        <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <span>Usa el formulario para añadir tu primera tarea</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="flex h-screen">
        {!isMobile && (
          <div className="w-96 flex-shrink-0">
            <TaskForm
              onSubmit={handleAddTask}
              isMobile={isMobile}
              isOpen={true}
            />
          </div>
        )}

        <div className="flex-grow overflow-auto">
          <div className="max-w-3xl mx-auto px-4 py-8">
            <header className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20">
                  <CheckSquare size={32} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-white bg-clip-text text-transparent">
                    Mis Tareas
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400">
                    Gestiona tus tareas de forma simple y efectiva
                  </p>
                </div>
              </div>

              {isMobile && (
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all"
                >
                  <Plus size={24} />
                </button>
              )}
            </header>

            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex justify-between items-center">
                <span>{error}</span>
                <button
                  onClick={() => setError(null)}
                  className="ml-4 text-red-700 hover:text-red-900"
                  aria-label="Cerrar mensaje de error"
                >
                  <X size={20} />
                </button>
              </div>
            )}

            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : tasks.length > 0 ? (
              <TaskList
                tasks={tasks}
                onToggleComplete={handleToggleComplete}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>

        {isMobile && (
          <TaskForm
            onSubmit={handleAddTask}
            isMobile={isMobile}
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
