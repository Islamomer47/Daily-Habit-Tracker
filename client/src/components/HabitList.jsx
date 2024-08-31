import React, { useEffect, useState } from "react";
import HabitItem from "./HabitItem";
import HabitFilters from "./HabitFilters";
import axios from "axios";

const HabitList = () => {
  const [habits, setHabits] = useState([]);
  const [filters, setFilters] = useState({ category: "", tag: "" });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/habits")
      .then((response) => {
        console.log(response.data); // Log response data
        const fetchedHabits = response.data;
        setHabits(Array.isArray(fetchedHabits) ? fetchedHabits : []);
      })
      .catch((error) => {
        console.error(error);
        setHabits([]); // Fallback to an empty array on error
      });
  }, []);

  const filteredHabits = habits.filter((habit) => {
    return (
      (!filters.category || habit.category === filters.category) &&
      (!filters.tag || habit.tags.includes(filters.tag))
    );
  });

  return (
    <div className="container mx-auto mt-8">
      <HabitFilters filters={filters} setFilters={setFilters} />
      <ul className="mt-4 space-y-4">
        {filteredHabits.map((habit) => (
          <HabitItem key={habit._id} habit={habit} />
        ))}
      </ul>
    </div>
  );
};

export default HabitList;
