import { IoIosAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import { IoCalendarClearOutline } from "react-icons/io5";
import Stats from "../components/Stats";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useUpdateTaskStatus from "../hooks/useUpdateTaskStatus";

const tabs = ["All Tasks", "Pending", "Completed", "Overdue"];

const Dashboard = ({ userData, setActivePage }) => {
  // --- State Management ---
  const [activeTab, setActiveTab] = useState(0); // Index of the currently selected filter tab : [ All Tasks , Pending , Completed , Overdue ]
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  
  // Custom hook to handle task status toggling (checkbox logic)
  const updateStatus = useUpdateTaskStatus(setTasks, setErrorMessage);

  /**
   * Effect: Fetch tasks whenever the activeTab changes
   * Dynamically appends query parameters based on the tab index
   */
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      let API = `${import.meta.env.VITE_API_URL}/api/task`;

      // Construct API URL based on selected filter
      if (activeTab === 1) {
        API += "?status=pending";
      } else if (activeTab === 2) {
        API += "?status=completed";
      } else if (activeTab === 3) {
        API += "?status=overdue";
      }

      try {
        const res = await fetch(API, {
          credentials: "include",
          method: "GET",
        });

        const data = await res.json();
        setTasks(data);
      } catch (err) {
        setErrorMessage("Failed to load tasks");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [activeTab]);

  return (
    <div className="px-5 sm:px-8 flex realtive flex-col gap-7">
      {/* Header Section: Greeting and Add Create Task */}
      <div className="my-4 flex justify-between">
        <div>
          <h1>Dashboard</h1>
          <p className="text-sm">Welcome back, {userData?.name}! 👋</p>
        </div>

        <div
          onClick={() => setActivePage(2)} // Shifts view to 'Add Task' component
          className="flex h-fit cursor-pointer hover:bg-primary-hover bg-primary text-white px-4 py-2 rounded-sm gap-1 items-center"
        >
          <span className="text-xl"><IoIosAdd /></span>
          <span className="hidden sm:block text-sm pr-2">Add Task</span>
        </div>
      </div>

      {/* Error Notification */}
      {errorMessage && (
        <div className="absolute h-17 flex text-center items-center justify-center w-full">
          <span className="bg-warning-light animate-pulse text-warning rounded px-5 py-2">
            {errorMessage}
          </span>
        </div>
      )}

      {/* Task Statistics (Total, Completed, etc.) */}
      <Stats />

      {/* Task List Container */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="font-bold text-xl">My Tasks</h2>
        
        {/* Filter Navigation Tabs */}
        <div className="flex gap-2">
          {tabs.map((val, index) => (
            <div
              className={`rounded-lg px-2 sm:px-4 mt-4 py-1 border-text-muted cursor-pointer border font-semibold ${activeTab == index ? "bg-primary text-white" : ""} sm:rounded-3xl text-xs`}
              onClick={() => setActiveTab(index)}
              key={index}
            >
              {val}
            </div>
          ))}
        </div>

        {/* Dynamic Task Rendering Area */}
        <div className="my-5 min-h-50 relative">
          {loading ? (
            /* Loading State  */
            <div className="text-center animate-pulse font-bold text-text-muted justify-center w-full absolute top-[15%] mx-auto flex items-center gap-2">
              <AiOutlineLoading3Quarters className="animate-spin" />
              Loading...
            </div>
          ) : (
            /* Map through fetched task array */
            tasks.map((data) => (
              <div
                className="grid h-fit sm:grid-cols-[3fr_2fr] p-3 gap-2 lg:gap-5 shadow rounded-md min-h-15 mb-1 border-text-muted items-center"
                key={data._id}
              >
                {/* Left: Checkbox and Info */}
                <div className="grid grid-cols-[15px_1fr] gap-3 items-center">
                  <input
                    onClick={() => updateStatus(data)}
                    className="h-3.5 cursor-pointer w-3.5"
                    checked={data.status === "completed"}
                    readOnly // Managed by onClick handler
                    type="checkbox"
                  />
                  <div>
                    <div className="text-sm font-bold">{data.title}</div>
                    <div className="text-sm text-text-secondary">{data.description}</div>
                  </div>
                </div>

                {/* Right: (Priority & Due Date) */}
                <div className="flex ml-6 sm:ml-0 gap-2 sm:grid sm:items-center sm:grid-cols-[1fr_1fr]">
                  {/* Dynamic coloring based on priority level */}
                  <div
                    className={`w-fit sm:mx-auto text-sm px-3 rounded-xl ${
                      data.priority === "medium" ? "bg-warning-light text-warning" : 
                      data.priority === "high" ? "bg-danger-light text-danger" : 
                      "bg-success-light text-success"
                    }`}
                  >
                    {data.priority}
                  </div>

                  {/* Due Date Display */}
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