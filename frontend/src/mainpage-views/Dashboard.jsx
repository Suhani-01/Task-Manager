import { IoIosAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import { IoCalendarClearOutline } from "react-icons/io5";
import Stats from "../components/Stats";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useUpdateTaskStatus from "../hooks/useUpdateTaskStatus";

const tabs = ["All Tasks", "Pending", "Completed", "Overdue"];
const Dashboard = ({ userData, setActivePage }) => {
  //active tab
  const [activeTab, setActiveTab] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const updateStatus = useUpdateTaskStatus(setTasks, setErrorMessage);

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
    <div className="px-5 sm:px-8 flex realtive flex-col gap-7">
      {/* heading */}
      <div className="my-4 flex  justify-between">
        <div>
          <h1>Dashboard</h1>
          <p className="text-sm">Welcome back , {userData?.name} !👋</p>
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
          <span className=" hidden sm:block text-sm pr-2">Add Task</span>
        </div>
      </div>

      {/* error message */}
      {errorMessage && (
        <div className="absolute h-17 flex text-center items-center justify-center w-full">
          <span className="bg-warning-light animate-pulse text-warning rounded px-5 py-2">
            {errorMessage}
          </span>
        </div>
      )}

      {/* stats */}
      <Stats />

      {/* tasks tab*/}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="font-bold text-xl">My Tasks</h2>
        <div className="flex gap-2">
          {tabs.map((val, index) => (
            <div
              className={`rounded-lg px-2 sm:px-4 mt-4 py-1 border-text-muted cursor-pointer border font-semibold ${activeTab == index ? "bg-primary text-white" : ""} sm:rounded-3xl text-xs`}
              onClick={() => {
                setActiveTab(index);
              }}
              key={index}
            >
              {val}
            </div>
          ))}
        </div>

        {/* DATA */}
        <div className="my-5 min-h-50 relative">
          {loading ? (
            <div className="text-center animate-pulse font-bold text-text-muted justify-center w-full absolute top-[15%] mx-auto flex items-center gap-2">
              <AiOutlineLoading3Quarters className="animate-spin" />
              Loading...
            </div>
          ) : (
            tasks.map((data) => (
              <div
                className=" grid h-fit sm:grid-cols-[3fr_2fr] p-3 gap-2 lg:gap-5 shadow rounded-md min-h-15 mb-1 border-text-muted items-center"
                key={data._id}
              >
                <div className="grid grid-cols-[15px_1fr] gap-3 items-center">
                  {/* status is completed or not */}
                  <input
                    onClick={() => {
                      updateStatus(data);
                    }}
                    className="h-3.5 cursor-pointer w-3.5"
                    checked={data.status === "completed"}
                    type="checkbox"
                  />{" "}
                  {/* title and description */}
                  <div>
                    <div className="text-sm  font-bold">{data.title}</div>
                    <div className="text-sm  text-text-secondary">
                      {data.description}
                    </div>
                  </div>
                </div>

                <div className="flex ml-6 sm:ml-0 gap-2 sm:grid sm:items-center sm:grid-cols-[1fr_1fr]">
                  {/* priority */}
                  <div
                    className={`w-fit sm:mx-auto text-sm px-3 rounded-xl ${data.priority == "medium" ? "bg-warning-light text-warning" : data.priority == "high" ? "bg-danger-light text-danger" : "bg-success-light text-success"}`}
                  >
                    {data.priority}
                  </div>

                  {/* due Date */}
                  <div className="flex items-center lg:w-auto gap-2">
                    <IoCalendarClearOutline />
                    <span className="text-xs sm:text-sm">
                      {data.dueDate
                        ? new Date(data.dueDate).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "No Due Date"}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
