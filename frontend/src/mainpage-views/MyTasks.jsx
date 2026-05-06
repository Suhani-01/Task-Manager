import { useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import { LuServerOff } from "react-icons/lu";
import TaskTable from "../components/TaskTable";
import EditTask from "../components/EditTask";

const tabs = ["All Tasks", "Pending", "Completed", "Overdue"];

const MyTasks = ({ setActivePage }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [activeAction, setActiveAction] = useState();
  const [activeEditAction, setActiveEditAction] = useState();

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      console.log("I am running");
      let API = `${import.meta.env.VITE_API_URL}/api/task`;

      if (activeTab === 1) {
        API += "?status=pending";
      } else if (activeTab === 2) {
        API += "?status=completed";
      } else if (activeTab === 3) {
        API += "?status=overdue";
      }
      // activeTab === 0 → no query → all tasks

      const res = await fetch(API, {
        credentials: "include",
        method: "GET",
      });

      const data = await res.json();
      console.log(data);
      setLoading(false);
      setTasks(data);
    };

    fetchTasks();
  }, [activeTab]);

  return (
    <div
      onClick={() => setActiveAction()}
      className="px-3 sm:px-8 relative flex flex-col gap-7"
    >
      {activeEditAction && (
        <div className="absolute w-full left-0 h-full bg-white/20 backdrop-blur-xs top-0 z-10000 ">
          <EditTask
            setActiveEditAction={setActiveEditAction}
            task={activeEditAction}
          />
        </div>
      )}
      {errorMessage && (
        <div className="bg-warning-light absolute flex gap-3 top-4 left-[40%] items-center text-center rounded-2xl text-warning animate-bounce absoluute p-3 px-4">
          <LuServerOff />
          {errorMessage}
        </div>
      )}

      {/* heading */}
      {errorMessage && (
        <div className="bg-warning-light absolute flex gap-3 top-4 left-[40%] items-center text-center rounded-2xl text-warning animate-bounce absoluute p-3 px-4">
          <LuServerOff />
          {errorMessage}
        </div>
      )}
      <div className="my-4 flex justify-between">
        <div>
          <h1>My Tasks</h1>
          <p className="text-sm">Manage and track all your tasks</p>
        </div>

        <div
          onClick={() => {
            console.log("I am clicked");
            setActivePage(2);
          }}
          className="flex h-fit cursor-pointer hover:bg-primary-hover bg-primary text-white px-4 py-2 rounded-sm gap-1 items-center"
        >
          <span className="text-xl">
            <IoIosAdd />
          </span>
          <span className="text-sm pr-2">Add Task</span>
        </div>
      </div>

      {/* options */}
      <div className="px-3 sm:px-8 text-sm flex shadow-xl rounded-xl py-4 bg-white">
        {tabs.map((t, index) => (
          <div
            onClick={() => setActiveTab(index)}
            key={index}
            className={`p-2 sm:px-4 cursor-pointer ${activeTab == index ? "text-primary-hover border-b-2" : ""} `}
          >
            {t}
          </div>
        ))}
      </div>

      {/* tasks */}
      <TaskTable
        tasks={tasks}
        setTasks={setTasks}
        setActiveEditAction={setActiveEditAction}
        setErrorMessage={setErrorMessage}
        loading={loading}
        activeAction={activeAction}
        setActiveAction={setActiveAction}
      />
    </div>
  );
};

export default MyTasks;
