import React from "react";

const HabitFilters = ({ filters, setFilters }) => {
  return (
    <div className="flex space-x-4">
      <select
        className="border rounded p-2"
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
      >
        <option value="">All Categories</option>
        <option value="Health">Health</option>
        <option value="Productivity">Productivity</option>
        <option value="Mindfulness">Mindfulness</option>
      </select>
      <input
        className="border rounded p-2"
        type="text"
        placeholder="Search by tag"
        value={filters.tag}
        onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
      />
    </div>
  );
};

export default HabitFilters;
