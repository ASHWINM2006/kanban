const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ["backlog", "todo", "inProgress", "done"], default: "backlog" }
});

module.exports = mongoose.model('Task', TaskSchema);
