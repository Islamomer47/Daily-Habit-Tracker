import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import axios from "axios";

const HabitItem = ({ habit }) => {
  // Local state for tracking completion status and progress
  const [completed, setCompleted] = useState(habit.status);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedHabit, setUpdatedHabit] = useState(habit);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/habits/${habit._id}`)
      .then(() => window.location.reload())
      .catch((error) => console.error(error));
  };

  const handleTrack = () => {
    axios
      .post(`http://localhost:5000/api/habits/${habit._id}/track`)
      .then((response) => {
        console.log("Habit tracked:", response.data);
        // Update local state to reflect the completion
        setCompleted(true);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:5000/api/habits/${habit._id}`, updatedHabit)
      .then(() => {
        setIsEditing(false); // Close the edit form on success
        window.location.reload(); // Refresh to reflect changes
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedHabit({ ...updatedHabit, [name]: value });
  };

  return (
    <li className="bg-white p-4 rounded shadow flex flex-col items-start">
      <div className="w-full mb-4">
        <h2 className="text-lg font-semibold">{habit.name}</h2>
        <p>{habit.description}</p>
        <ProgressBar progress={completed ? 100 : 0} />
      </div>
      <div className="w-full flex justify-between">
        <button className="text-red-500" onClick={handleDelete}>
          Delete
        </button>
        {!completed && (
          <button
            onClick={handleTrack}
            className="bg-green-600 text-white p-2 rounded"
          >
            Mark as Completed
          </button>
        )}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-blue-600 text-white p-2 rounded"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      {isEditing && (
        <div className="mt-4 w-full border-t pt-4">
          <h3 className="text-xl font-bold">Edit Habit</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={updatedHabit.name}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={updatedHabit.description}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={updatedHabit.category}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Frequency</label>
            <input
              type="text"
              name="frequency"
              value={updatedHabit.frequency}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              value={updatedHabit.tags.join(", ")}
              onChange={(e) =>
                setUpdatedHabit({
                  ...updatedHabit,
                  tags: e.target.value.split(", "),
                })
              }
              className="border rounded w-full p-2"
            />
          </div>
          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white p-2 rounded"
          >
            Save Changes
          </button>
        </div>
      )}

      <div className="mt-4 w-full border-t pt-4">
        <h3 className="text-xl font-bold">{habit.name}</h3>
        <p>{habit.description}</p>
        <p>Category: {habit.category}</p>
        <p>Frequency: {habit.frequency}</p>
        <p>Tags: {habit.tags.join(", ")}</p>
      </div>
    </li>
  );
};

export default HabitItem;
