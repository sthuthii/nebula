'use client'

import { useState } from "react";
import Navbar from "../Navbar";

export default function Journal() {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState("");

  const addEntry = () => {
    if (!text.trim()) return;
    const newEntry = {
      text,
      date: new Date().toLocaleString(), // Get current date & time
    };
    setEntries([newEntry, ...entries]); // Newest entry on top
    setText("");
  };

  const deleteEntry = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-blue-300 dark:from-gray-900 dark:to-gray-800 transition-all">
      <Navbar />
      <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 mt-10 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
          ✍️ My Journal
        </h2>
        <textarea
          className="w-full p-4 border-2 border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none bg-gray-100 dark:bg-gray-800 dark:text-white transition"
          placeholder="Write your thoughts..."
          rows="5"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          onClick={addEntry}
          className="w-full mt-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-all"
        >
          Save Entry 📖
        </button>
        <div className="mt-6 space-y-4">
          {entries.map((entry, index) => (
            <div
              key={index}
              className="p-4 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg shadow-md relative group"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                📅 {entry.date}
              </p>
              <p className="text-gray-800 dark:text-gray-200">{entry.text}</p>
              <button
                onClick={() => deleteEntry(index)}
                className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
