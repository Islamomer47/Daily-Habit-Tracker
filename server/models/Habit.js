const mongoose = require("mongoose");

const HabitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    enum: ["Health", "Productivity", "Mindfulness", "Other"],
  },
  tags: [String],
  frequency: {
    type: String,
    enum: ["Daily", "Weekly", "Monthly"],
    default: "Daily",
  },
  status: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assuming user authentication is implemented
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  tracking: [
    {
      date: { type: Date, default: Date.now },
      completed: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model("Habit", HabitSchema);
