const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();



const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses JSON body

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

mongoose.connect("mongodb+srv://ashwinm:ashwin@cluster0.vash0.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Connection Error:", err));

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


