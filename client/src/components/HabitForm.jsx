import React, { useState } from "react";
import axios from "axios";

const HabitForm = () => {
  const [habit, setHabit] = useState({
    name: "",
    description: "",
    category: "",
    tags: "",
    frequency: "Daily",
    status: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHabit({ ...habit, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/habits", {
        ...habit,
        tags: habit.tags.split(",").map((tag) => tag.trim()),
      })
      .then(() => (window.location.href = "/"))
      .catch((error) => console.error("Error:", error.response));
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Add a New Habit</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Habit Name</label>
          <input
            type="text"
            name="name"
            value={habit.name}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={habit.description}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            name="category"
            value={habit.category}
            onChange={handleChange}
            className="border rounded w-full p-2"
          >
            <option value="">Select Category</option>
            <option value="Health">Health</option>
            <option value="Productivity">Productivity</option>
            <option value="Mindfulness">Mindfulness</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Tags (comma separated)
          </label>
          <input
            type="text"
            name="tags"
            value={habit.tags}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Frequency</label>
          <select
            name="frequency"
            value={habit.frequency}
            onChange={handleChange}
            className="border rounded w-full p-2"
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>
        <button type="submit" className="bg-purple-600 text-white p-2 rounded">
          Add Habit
        </button>
      </form>
    </div>
  );
};

export default HabitForm;
