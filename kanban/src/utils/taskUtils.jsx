// frontend/src/utils/taskUtils.js

// Add a new task to the backlog
export const addTask = (tasks, newTask) => {
  return {
    ...tasks,
    backlog: [...tasks.backlog, newTask],
  };
};

// Delete a task from the specified column
export const deleteTask = (tasks, taskToDelete) => {
  const updatedTasks = { ...tasks };
  for (let column in updatedTasks) {
    updatedTasks[column] = updatedTasks[column].filter((task) => task !== taskToDelete);
  }
  return updatedTasks;
};

// Move a task from one column to another
export const moveTask = (tasks, task, sourceColumn, targetColumn) => {
  // Remove the task from the source column
  const updatedSourceColumn = tasks[sourceColumn].filter((t) => t !== task);

  // Add the task to the target column
  const updatedTargetColumn = [...tasks[targetColumn], task];

  // Update the tasks state
  return {
    ...tasks,
    [sourceColumn]: updatedSourceColumn,
    [targetColumn]: updatedTargetColumn,
  };
};

// Add an entry to the task history
export const addHistory = (history, action) => {
  const newHistory = [...history, action];
  return newHistory;
};
