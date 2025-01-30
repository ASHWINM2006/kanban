import React, { useState } from "react";
import PropTypes from "prop-types";

const TaskCard = ({ task, column, onDragStart, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`task-card ${isExpanded ? "expanded" : ""}`}
      draggable
      onDragStart={(e) => onDragStart(e, task, column)}
      onClick={handleExpand} // Click to toggle expanded view
    >
      <span className="task-text">{task}</span>
      <button className="delete-btn" onClick={() => onDelete(task)}>Delete</button>

      {isExpanded && (
        <div className="task-details">
          <p>Additional details about the task go here. This is the expanded view.</p>
        </div>
      )}
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.string.isRequired,
  column: PropTypes.string.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskCard;
