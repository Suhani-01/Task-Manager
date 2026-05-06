import { FaCheckSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Logo = () => {
    const navigate=useNavigate();
  return (
    <div onClick={()=> navigate("/")} className="flex cursor-pointer  w-[90%] mx-auto p-4 items-center gap-1 text-2xl">
      <div className="text-primary">
        <FaCheckSquare />
      </div>
      <div>
        <span className="text-text-primary font-bold">Task</span>
        <span className="text-primary font-bold">Manager</span>
      </div>
    </div>
  );
};

export default Logo;
