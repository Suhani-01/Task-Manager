import React from "react";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom"; 

/**
 * Navigation Bar Component
 * Dynamically updates UI based on the user's login status
 * shows Dashboard option if logged in else LogIn and Create Account
 */
const Navbar = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center md:px-5">
      {/* App Logo/Home Link */}
      <div>
        <Logo />
      </div>

      {/* Conditional Navigation Logic */}
      {isLoggedIn ? (
        /* Authenticated View: Show link to the dashboard */
        <div className="flex px-4 md:px-0 items-center gap-1">
           <button
            onClick={() => navigate("/tasks")}
            className=" w-fit border border-primary text-primary cursor-pointer px-4 py-1 rounded-lg"
          >
            Dashboard
          </button>
        </div>
      ) : (
        /* Guest View: Show Login and Account Creation options */
        <div className="flex px-4 md:px-0 gap-4">
          <button
            onClick={() => navigate("/login")}
            className="text-black hover:text-primary cursor-pointer px-4 py-1"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/getStarted")}
            className="bg-primary w-fit cursor-pointer hover:bg-primary-hover text-white px-4 py-1 rounded-lg"
          >
            Get Started
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;