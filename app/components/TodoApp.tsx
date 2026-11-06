"use client";

import { useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const initialTasks: Task[] = [
  { id: 1, title: "Learn Next.js", completed: true },
  { id: 2, title: "Build a to-do app", completed: false },
  { id: 3, title: "Deploy it", completed: false },
];

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTitle, setNewTitle] = useState("");

  function addTask(e: React.FormEvent) {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title) return;

    setTasks([...tasks, { id: Date.now(), title, completed: false }]);
    setNewTitle("");
  }

  function toggleTask(id: number) {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  return (
    <div className="mx-auto mt-16 max-w-md rounded-xl border p-6 shadow-sm">
      <h1 className="mb-4 text-2xl font-bold">My Tasks</h1>

      <form onSubmit={addTask} className="mb-4 flex gap-2">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 rounded border px-3 py-2"
        />
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet. Add one above!</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between rounded border px-3 py-2"
            >
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span className={task.completed ? "text-gray-400 line-through" : ""}>
                  {task.title}
                </span>
              </label>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 text-sm text-gray-500">
        {tasks.filter((t) => !t.completed).length} remaining
      </p>
    </div>
  );
}