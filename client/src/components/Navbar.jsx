import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-purple-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Daily Habit Tracker</h1>
        <div>
          <a href="/" className="text-white mx-4">
            Home
          </a>
          <a href="/add-habit" className="text-white mx-4">
            Add Habit
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
