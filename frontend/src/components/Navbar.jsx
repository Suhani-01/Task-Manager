import React from "react";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom"; 


const Navbar = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center px-5">
      <div>
        <Logo />
      </div>

      {isLoggedIn ? (
        <div className="flex items-center gap-1">
         
           <button
            onClick={() => navigate("/tasks")}
            className=" w-fit border border-primary text-primary cursor-pointer px-4 py-1 rounded-lg"
          >
            Dashboard
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
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
