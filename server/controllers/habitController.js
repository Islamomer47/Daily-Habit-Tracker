const Habit = require("../models/Habit");

// Create a new habit
exports.createHabit = async (req, res) => {
  try {
    const newHabit = new Habit(req.body);

    const habit = await newHabit.save();
    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all habits
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find();
    res.status(200).json(habits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single habit
exports.getHabitById = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ message: "Habit not found" });
    res.status(200).json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a habit
exports.updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!habit) return res.status(404).json({ message: "Habit not found" });
    res.status(200).json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a habit
exports.deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.id);
    if (!habit) return res.status(404).json({ message: "Habit not found" });
    res.status(200).json({ message: "Habit deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search habits by tag
exports.searchByTag = async (req, res) => {
  const { tag } = req.query;

  try {
    if (!tag) return res.status(400).json({ message: "Tag is required" });

    // Query to find habits with the specified tag
    const habits = await Habit.find({ tags: { $in: [tag] } });
    res.status(200).json(habits);
  } catch (err) {
    console.error("Error searching by tag:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//habit progress Tracker
exports.tracker = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    // Add a new tracking entry
    habit.tracking.push({ date: new Date(), completed: true });
    await habit.save();

    res.status(200).json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
