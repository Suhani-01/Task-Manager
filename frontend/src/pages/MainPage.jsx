import { useEffect, useState } from "react";
import { IoMdHome, IoIosAddCircleOutline } from "react-icons/io";
import Dashboard from "../mainpage-views/Dashboard";
import MyTasks from "../mainpage-views/MyTasks";
import Profile from "../mainpage-views/Profile";
import { MdOutlineTask } from "react-icons/md";
import AddTask from "../mainpage-views/AddTask";
import { FaUser, FaRegCheckCircle } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
import ActiveComponent from "../components/ActiveComponent";
import Pending from "../mainpage-views/Pending";
import Logout from "../components/Logout";

/**
 * Page Configuration
 * Each object maps a label and icon to a specific React component.
 * index 0: Dashboard, index 2: AddTask, etc.
 */
const pages = [
  { icon: <IoMdHome />, name: "Dashboard", component: Dashboard },
  { icon: <MdOutlineTask />, name: "My Tasks", component: MyTasks },
  { icon: <IoIosAddCircleOutline />, name: "Add Task", component: AddTask },
  { icon: <FaRegCheckCircle />, name: "Pending", component: Pending },
  { icon: <FaUser />, name: "Profile", component: Profile },
];

const MainPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState();
  const [activePage, setActivePage] = useState(0); // Controls which component from 'pages' is rendered
  const [smallNavMenueVisible, setSmallNavMenueVisible] = useState(false);

  /**
   * Authentication Check
   * Fetches the user profile on load. If it fails, the app overlays 
   * a login redirect message over the content area.
   */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setErrorMessage("Loading..");
        const API = `${import.meta.env.VITE_API_URL}/api/user/profile`;
        const res = await fetch(API, {
          method: "GET",
          credentials: "include", // Required for session-based auth (cookies)
        });
        const data = await res.json();
        
        if (res.ok) {
          setUserData(data);
        } else {
          setErrorMessage(data.message || "Server Issue");
        }
      } catch {
        setErrorMessage("Something went wrong");
      }
    };
    fetchUser();
  }, []);

  return (
    <div 
      onClick={() => setSmallNavMenueVisible(false)} // Global click handler to close mobile menu
      className="bg-background overflow-y-hidden relative h-[100vh] w-full lg:flex"
    >
      
      {/* --- Mobile Header (Hidden on Large Screens) --- */}
      <div className="lg:hidden fixed shadow-xl w-full bg-white/40 backdrop-blur-2xl z-[10000]">
        <div className="flex lg:hidden w-full bg-primary/20 justify-between">
          <Logo />
          <div 
            onClick={(e) => {
              setSmallNavMenueVisible((prev) => !prev);
              e.stopPropagation(); // Prevents the parent div from immediately closing the menu
            }} 
            className="text-4xl cursor-pointer text-black p-4"
          >
            <IoMdMenu />
          </div>
        </div>

        {/* Mobile Navigation Dropdown */} 
        {smallNavMenueVisible && (
          <div className="pb-5">
            <div className="flex flex-col gap-2 mt-7">
              {pages.map((val, index) => (
                <button
                  disabled={!userData}
                  className={`flex disabled:cursor-not-allowed p-4 text-muted hover:bg-white cursor-pointer rounded-sm mx-auto h-12 w-[90%] ${activePage === index ? "bg-white text-primary shadow" : ""} items-center gap-2`}
                  onClick={() => setActivePage(index)}
                  key={index}
                >
                  <span className="text-lg">{val.icon}</span>
                  <span>{val.name}</span>
                </button>
              ))}
              <Logout />
            </div>
          </div>
        )}
      </div>

      {/* --- Desktop Sidebar (Hidden on Small Screens) --- */}
      <div className="bg-sidebar hidden lg:flex flex-col justify-between pt-4 w-[20%]">
        <div>
          <Logo />
          <div className="flex flex-col gap-2 mt-7">
            {pages.map((val, index) => (
              <button
                disabled={!userData}
                className={`flex disabled:cursor-not-allowed p-4 text-muted hover:bg-background-hover cursor-pointer rounded-sm mx-auto h-12 w-[90%] ${activePage === index ? "bg-background-hover text-primary" : ""} items-center gap-2 transition-all`}
                onClick={() => setActivePage(index)}
                key={index}
              >
                <span className="text-lg">{val.icon}</span>
                <span>{val.name}</span>
              </button>
            ))}
          </div>
        </div>
        <Logout />
      </div>

      {/* --- Main Content Area --- */}
      <div className="flex-1 h-full pt-20 overflow-y-scroll overflow-x-hidden relative lg:pt-4">
        
        {/* Authentication Overlay: Blocks access if userData is missing */}
        {!userData && (
          <div
            onClick={() => navigate("/login")}
            className="absolute z-50 bg-primary/20 backdrop-blur-sm -top-4 flex items-center text-md justify-center h-full w-full cursor-pointer"
          >
            {errorMessage}..! (Click to Login)
          </div>
        )}

        {/* Dynamic View Loader */}
        {userData && (
          <ActiveComponent
            userData={userData}
            setActivePage={setActivePage}
            comp={pages[activePage].component} // Passes the component class to the wrapper
          />
        )}
      </div>
    </div>
  );
};

export default MainPage;