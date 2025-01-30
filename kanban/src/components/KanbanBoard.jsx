import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import TaskHistory from "./TaskHistory";
import { addTask, deleteTask, moveTask, addHistory } from "../utils/taskUtils";
import "./KanbanBoard.css";

const KanbanBoard = () => {
  const initialTasks = JSON.parse(localStorage.getItem("tasks")) || {
    backlog: ["Design wireframes", "Research APIs"],
    todo: ["Build UI components"],
    inProgress: ["Implement API logic"],
    done: ["Test API endpoints"],
  };

  const initialHistory = JSON.parse(localStorage.getItem("history")) || [];

  const [tasks, setTasks] = useState(initialTasks);
  const [history, setHistory] = useState(initialHistory);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("history", JSON.stringify(history));
  }, [tasks, history]);

  const handleAddTask = () => {
    if (!newTask.trim()) return; 

    
    console.log("Adding task:", newTask);

    const updatedTasks = { ...tasks }; 
    updatedTasks.backlog.push(newTask); 
    setTasks(updatedTasks); 

 
    const updatedHistory = addHistory(history, `Added task "${newTask}" to Backlog`);
    setHistory(updatedHistory);

    
    setNewTask("");
  };

  const handleDeleteTask = (task) => {
    const updatedTasks = deleteTask(tasks, task);
    setTasks(updatedTasks);

    const updatedHistory = addHistory(history, `Deleted task "${task}"`);
    setHistory(updatedHistory);
  };

  const handleDrop = (e, column) => {
    const task = e.dataTransfer.getData("task");
    const sourceColumn = e.dataTransfer.getData("sourceColumn");

    const updatedTasks = moveTask(tasks, task, sourceColumn, column);
    setTasks(updatedTasks);

    const updatedHistory = addHistory(
      history,
      `Moved task "${task}" from ${sourceColumn} to ${column}`
    );
    setHistory(updatedHistory);
  };

  const handleDragStart = (e, task, column) => {
    e.dataTransfer.setData("task", task);
    e.dataTransfer.setData("sourceColumn", column);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="kanban-board">
      <div className="add-task">
        <textarea
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          rows="4"
        />
        <button className="btn-add-task" onClick={handleAddTask}>
          Add Task
        </button>
      </div>

      <div className="kanban-columns">
        {["backlog", "todo", "inProgress", "done"].map((column) => (
          <div
            key={column}
            className="kanban-column"
            onDrop={(e) => handleDrop(e, column)}
            onDragOver={(e) => e.preventDefault()}
          >
            <h2 className="column-title">{column.charAt(0).toUpperCase() + column.slice(1)}</h2>
            <div className="task-list">
              {tasks[column].map((task, index) => (
                <TaskCard
                  key={index}
                  task={task}
                  column={column}
                  onDragStart={handleDragStart}
                  onDelete={handleDeleteTask}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <TaskHistory history={history} onClearHistory={handleClearHistory} />
    </div>
  );
};

export default KanbanBoard;
