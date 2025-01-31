import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import TaskHistory from "./TaskHistory";
import "./KanbanBoard.css";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({ backlog: [], todo: [], inProgress: [], done: [] });
  const [history, setHistory] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5001/Tasks");
      const data = await response.json();
      setTasks({
        backlog: data.filter(task => task.status === "backlog"),
        todo: data.filter(task => task.status === "todo"),
        inProgress: data.filter(task => task.status === "inProgress"),
        done: data.filter(task => task.status === "done"),
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    try {
      const response = await fetch("https://kanban-2-3zoi.onrender.com/Tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTask, status: "backlog" }),
      });
      if (response.ok) {
        fetchTasks();
        setNewTask("");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await fetch(`https://kanban-2-3zoi.onrender.com/Tasks/${taskId}`, { method: "DELETE" });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleDrop = async (e, newStatus) => {
    const taskId = e.dataTransfer.getData("taskId");
    try {
      await fetch(`https://kanban-2-3zoi.onrender.com/Tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
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
              {tasks[column].map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={() => handleDeleteTask(task._id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <TaskHistory history={history} onClearHistory={() => setHistory([])} />
    </div>
  );
};

export default KanbanBoard;
