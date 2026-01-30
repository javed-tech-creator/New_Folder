import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const user = localStorage.getItem("userData");
    if (!user) {
      localStorage.clear();
      navigate("/");
    }
  });

  return (
    <div className="flex w-full items-center justify-between h-full px-6 bg-white">
      <div className="text-xl font-semibold text-gray-800">
        Employee Management
      </div>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Header;
