import { FaCheckSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/**
 * Reusable Logo
 */
const Logo = () => {
    const navigate = useNavigate();
    
  return (
    <div 
      onClick={() => navigate("/")} 
      className="flex cursor-pointer w-[90%] mx-auto p-4 items-center gap-1 text-2xl"
    >
      {/* Icon */}
      <div className="text-primary">
        <FaCheckSquare />
      </div>

      {/* Name of Brand */}
      <div>
        <span className="text-text-primary font-bold">Task</span>
        <span className="text-primary font-bold">Manager</span>
      </div>
    </div>
  );
};

export default Logo;