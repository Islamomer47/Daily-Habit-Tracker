const express = require("express");
const router = express.Router();
const habitController = require("../controllers/habitController");

// Habit routes
router.post("/habits", habitController.createHabit);
router.get("/habits", habitController.getHabits);
router.get("/habits/:id", habitController.getHabitById);
router.put("/habits/:id", habitController.updateHabit);
router.delete("/habits/:id", habitController.deleteHabit);
router.get("/habits/search", habitController.searchByTag);
router.post("/habits/:id/track", habitController.tracker);
module.exports = router;
