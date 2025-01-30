const express = require('express');
const Task = require('../models/Task');
const History = require('../models/History');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});


router.post('/', authMiddleware, async (req, res) => {
  const { title, status } = req.body;
  const newTask = new Task({ title, status });
  await newTask.save();

  const history = new History({ message: `Added task "${title}" to ${status}` });
  await history.save();

  res.status(201).json(newTask);
});


router.put('/:id', authMiddleware, async (req, res) => {
  const { status } = req.body;
  const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });

  const history = new History({ message: `Moved task "${task.title}" to ${status}` });
  await history.save();

  res.json(task);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  const history = new History({ message: `Deleted task "${task.title}"` });
  await history.save();

  res.json({ message: 'Task deleted' });
});

module.exports = router;
