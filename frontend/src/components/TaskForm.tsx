import React, { useState } from "react";
import { TaskUpdateData } from "../types";
import { Plus, X, AlertCircle } from "lucide-react";

interface TaskFormProps {
  onSubmit: (taskData: TaskUpdateData) => void;
  isMobile: boolean;
  isOpen: boolean;
  onClose?: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  isMobile,
  isOpen,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: {
      title?: string;
      description?: string;
    } = {};

    // Validar título
    if (!title.trim()) {
      newErrors.title = "El título es requerido";
    } else if (title.length > 100) {
      newErrors.title = `El título excede los 100 caracteres (${title.length}/100)`;
    }

    // Validar descripción
    if (description.length > 200) {
      newErrors.description = `La descripción excede los 200 caracteres (${description.length}/200)`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      completed: false,
    });

    setTitle("");
    setDescription("");
    setErrors({});

    if (isMobile && onClose) {
      onClose();
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);

    // Reset error when user starts typing
    if (errors.title) {
      setErrors((prev) => ({ ...prev, title: undefined }));
    }
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setDescription(value);

    // Reset error when user starts typing
    if (errors.description) {
      setErrors((prev) => ({ ...prev, description: undefined }));
    }
  };

  if (isMobile && !isOpen) return null;

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="¿Qué necesitas hacer?"
          maxLength={100}
          className={`w-full px-4 py-3 text-lg rounded-xl bg-white/50 dark:bg-slate-700/50 border ${
            errors.title
              ? "border-orange-400 dark:border-orange-500 focus:border-orange-500 dark:focus:border-orange-400 focus:ring-orange-200 dark:focus:ring-orange-900"
              : "border-slate-200/20 dark:border-slate-700/50 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-900"
          } focus:ring-2 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500 text-slate-700 dark:text-slate-200`}
        />
        {errors.title && (
          <div className="flex items-center gap-1 text-orange-500 text-sm pl-1">
            <AlertCircle size={16} />
            <span>{errors.title}</span>
          </div>
        )}
        <div className="text-right text-xs text-slate-400 dark:text-slate-500">
          {title.length}/100 caracteres
        </div>
      </div>

      <div className="space-y-1">
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Añade una descripción (opcional)"
          maxLength={200}
          rows={4}
          className={`w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-slate-700/50 border ${
            errors.description
              ? "border-red-400 dark:border-red-500 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-200 dark:focus:ring-red-900"
              : "border-slate-200/20 dark:border-slate-700/50 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-200 dark:focus:ring-blue-900"
          } focus:ring-2 outline-none transition-all placeholder-slate-400 dark:placeholder-slate-500 text-slate-700 dark:text-slate-200 resize-none textarea-scrollbar`}
        />
        {errors.description && (
          <div className="flex items-center gap-1 text-red-500 text-sm pl-1">
            <AlertCircle size={16} />
            <span>{errors.description}</span>
          </div>
        )}
        <div className="text-right text-xs text-slate-400 dark:text-slate-500">
          {description.length}/200 caracteres
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
      >
        <Plus size={20} />
        Añadir tarea
      </button>
    </form>
  );

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-white dark:bg-slate-900">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200">
              Nueva tarea
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X size={24} />
            </button>
          </div>
          {formContent}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-effect h-screen p-6 border-r border-slate-200/20">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200">
          Nueva tarea
        </h2>
      </div>
      {formContent}
    </div>
  );
};
