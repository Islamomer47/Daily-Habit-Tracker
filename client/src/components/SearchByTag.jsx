import React, { useState } from "react";
import axios from "axios";

const SearchByTag = () => {
  const [tag, setTag] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:5000/api/habits/search?tag=${tag}`)
      .then((response) => setResults(response.data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSearch} className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Search by Tag</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Tag</label>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <button type="submit" className="bg-purple-600 text-white p-2 rounded">
          Search
        </button>
      </form>
      <div>
        {results.map((habit) => (
          <div key={habit._id} className="p-4 border-b">
            <h3 className="text-xl font-bold">{habit.name}</h3>
            <p>{habit.description}</p>
            <p>Category: {habit.category}</p>
            <p>Frequency: {habit.frequency}</p>
            <p>Tags: {habit.tags.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchByTag;
