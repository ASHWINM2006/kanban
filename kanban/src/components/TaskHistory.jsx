import React from "react";
import PropTypes from "prop-types";
import './TaskHistory.css';

const TaskHistory = ({ history, onClearHistory }) => (
  <div className="task-history">
    <h3>History</h3>
    <ul>
      {history.map((entry, index) => (
        <li key={index}>{entry}</li>
      ))}
    </ul>
    <button onClick={onClearHistory}>Clear History</button>
  </div>
);

TaskHistory.propTypes = {
  history: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClearHistory: PropTypes.func.isRequired,
};

export default TaskHistory;
