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
  const [activePage, setActivePage] = useState(0);
  const [smallNavMenueVisible,setSmallNavMenueVisible]=useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setErrorMessage("Loading..")
        const API=`${import.meta.env.VITE_API_URL}/api/user/profile`;
        const res = await fetch(API, {
          method: "GET",
          credentials: "include", // 👈 MOST IMPORTANT
        });
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          console.log(data);
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
    <div onClick={()=>{
      setSmallNavMenueVisible(false)
    }} className="bg-background overflow-y-hidden relative  h-[100vh] w-full lg:flex">
      {/* left side bar */}

      {/* Navbar for smallscreen */}
      <div className="lg:hidden fixed shadow-xl w-full bg-white/40 backdrop-blur-2xl z-10000">
        
        <div className="flex lg:hidden w-full  bg-primary/20 justify-between">
          <div>
            <Logo />
          </div>

          <div onClick={(e)=>{
            setSmallNavMenueVisible((prev)=>!prev);
            e.stopPropagation();
          }} className="text-4xl cursor-pointer text-black p-4">
            <IoMdMenu />
          </div>
        </div>

        {/* navigation menues */} 
        {smallNavMenueVisible && <div className=" pb-5">
          <div className="flex flex-col gap-2 mt-7">
            {pages.map((val, index) => (
              <button
                disabled={!userData}
                className={`flex disabled:cursor-not-allowed disabled:bg-white disabled:hover:bg-white p-4 text-muted text-start hover:bg-white cursor-pointer rounded-sm mx-auto h-12 w-[90%] ${activePage == index ? "bg-white text-primary shadow" : ""} items-center gap-2`}
                onClick={() => {
                  setActivePage(index);
                }}
                key={index}
              >
                <span className="text-lg">{val.icon}</span>
                <span>{val.name}</span>
              </button>
            ))}
            <Logout />
          </div>
         
          
        </div>}
      </div>

      <div className="bg-sidebar hidden lg:flex flex-col justify-between pt-4 w-[20%]">
        {/* logo */}
        <div>
          <div>
            <Logo />
          </div>

          {/* navigation */}
          <div className="flex flex-col gap-2 mt-7">
            {pages.map((val, index) => (
              <button
                disabled={!userData}
                className={`flex disabled:cursor-not-allowed disabled:bg-white disabled:hover:bg-white p-4 text-muted text-start hover:bg-background-hover cursor-pointer rounded-sm mx-auto h-12 w-[90%] ${activePage == index ? "bg-background-hover text-primary" : ""} items-center gap-2`}
                onClick={() => {
                  setActivePage(index);
                }}
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

      {/* main content area */}

      <div className="flex-1 h-full pt-20  overflow-y-scroll overflow-x-hidden relative lg:pt-4">
        {!userData && (
          <div
            onClick={() => navigate("/login")}
            className="absolute  bg-primary/20 backdrop-blur-sm -top-4 flex items-center text-md text-shadow-text-secondary justify-center h-full w-full cursor-pointer"
          >
            {errorMessage}..!
          </div>
        )}
        {userData && (
          <ActiveComponent
            userData={userData}
            setActivePage={setActivePage}
            comp={pages[activePage].component}
          />
        )}
      </div>
    </div>
  );
};

export default MainPage;
