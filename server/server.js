const express = require("express");
const connectDB = require("./config/database");
const habitRoutes = require("./routes/habitRoutes");
require("dotenv").config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api", habitRoutes);

// Start server
const PORT = process.env.PORT || 5001; // Change to a different port like 5001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
