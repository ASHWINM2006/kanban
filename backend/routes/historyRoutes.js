const express = require('express');
const History = require('../models/History');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


router.get('/', authMiddleware, async (req, res) => {
  const history = await History.find().sort({ timestamp: -1 });
  res.json(history);
});


router.delete('/', authMiddleware, async (req, res) => {
  await History.deleteMany({});
  res.json({ message: 'History cleared' });
});

module.exports = router;
