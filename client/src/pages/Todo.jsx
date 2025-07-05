import React, { useState } from "react";
import { FaPlus, FaTrash, FaCheckCircle, FaRegCircle } from "react-icons/fa";

const Todo = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const addTask = (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: task.trim(),
      completed: false,
    };

    setTodos([newTodo, ...todos]);
    setTask("");
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTask = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">Your To-Do List</h2>

        <form onSubmit={addTask} className="flex mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow border rounded-l-full px-4 py-2 focus:outline-none"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r-full hover:bg-blue-700">
            <FaPlus />
          </button>
        </form>

        <ul className="space-y-2 max-h-80 overflow-y-auto">
          {todos.map(todo => (
            <li key={todo.id} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2 shadow">
              <div
                className={`flex items-center space-x-2 cursor-pointer ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}
                onClick={() => toggleComplete(todo.id)}
              >
                {todo.completed ? <FaCheckCircle className="text-green-500" /> : <FaRegCircle />}
                <span>{todo.text}</span>
              </div>
              <button onClick={() => deleteTask(todo.id)} className="text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No tasks yet. Add one!</p>
        )}
      </div>
    </div>
  );
};

export default Todo;
