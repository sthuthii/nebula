'use client'

import { useState } from "react";
import Navbar from "../Navbar";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");

  const addTask = () => {
    if (!task.trim()) return;
    const newTask = {
      id: Date.now(),
      text: task,
      dateAdded: new Date().toLocaleDateString(),
      dueDate,
      completed: false
    };
    setTasks([newTask, ...tasks]);
    setTask("");
    setDueDate("");
  };

  const toggleCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 to-purple-300 dark:from-gray-900 dark:to-gray-800 transition-all">
      <Navbar />
      <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 mt-10 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
          ✅ My To-Do List
        </h2>
        <div className="flex flex-col space-y-3">
          <input
            type="text"
            className="p-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-gray-100 dark:bg-gray-800 dark:text-white transition"
            placeholder="New Task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <input
            type="date"
            className="p-2 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white transition"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-all"
          >
            ➕ Add
          </button>
        </div>
        <ul className="mt-6 space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-4 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg shadow-md flex justify-between items-center group transition-all"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompletion(task.id)}
                  className="w-5 h-5 accent-purple-600 cursor-pointer"
                />
                <div>
                  <p className={`text-lg ${task.completed ? "line-through text-gray-400" : ""}`}>
                    {task.text}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Added: {task.dateAdded} {task.dueDate && ` | Due: ${task.dueDate}`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
