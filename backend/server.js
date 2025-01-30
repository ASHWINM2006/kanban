require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const historyRoutes = require('./routes/historyRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI || "mongodb+srv://ashwin2006:ashwin@kanbandb.3sxur.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error(err));


app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/history', historyRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
