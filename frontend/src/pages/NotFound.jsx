import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full bg-white text-gray-800 min-h-screen flex flex-col items-center justify-center">
    

      {/* Main Content */}
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404 Not Found</h1>
        <p className="text-gray-600 mb-6">
          Your visited page not found. You may go home page.
        </p>
        <Link
          to="/"
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition"
        >
          Back to home page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
