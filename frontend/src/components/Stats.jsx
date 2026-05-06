import { FaRegCheckCircle} from "react-icons/fa";
import { TbClipboardList } from "react-icons/tb";
import { IoMdTime } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

/**
 * Stats Component
 * Fetches and displays a summary of task counts (Total, Pending, Completed, Overdue)
 */
const Stats = () => {
  // Initialize state with zeros to prevent "undefined" errors during the first render
  const [stats, setStats] = useState({ completed: 0, overdue: 0, pending: 0, total: 0 });

  useEffect(() => {
    /**
     * function to extract stats from the server
     */
    const fetchStats = async () => {
      const API = `${import.meta.env.VITE_API_URL}/api/task/stats`;
      
      try {
        const res = await fetch(API, {
          method: "GET",
          credentials: "include", // Essential to include cookies
        });

        const data = await res.json();
        
        if (!res.ok) {
          console.error(data.message);
        } else {
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();

    // Cleanup function: Resets stats when the component unmounts
    return () => {
      setStats({ completed: 0, overdue: 0, pending: 0, total: 0 });
    };
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-between">

      {/* Card: Total Tasks */}
      <div className="bg-white items-center aspect-2/1 shadow-md rounded-xl flex flex-col text-center lg:flex-row lg:text-left p-4 gap-5">
        <div className="text-2xl flex items-center text-primary bg-primary/15 p-4 rounded-xl ">
          <TbClipboardList />
        </div>
        <div>
          <p className="text-sm">Total Tasks</p>
          <h1>{stats.total}</h1>
          <p className="text-sm text-text-muted">All tasks</p>
        </div>
      </div>

      {/* Card: Pending Tasks */}
      <div className="bg-white items-center aspect-2/1 shadow-md rounded-xl flex flex-col text-center lg:flex-row lg:text-left p-4 gap-5">
        <div className="text-2xl flex items-center text-warning bg-warning/15 p-4 rounded-xl ">
          <IoMdTime />
        </div>
        <div>
          <p className="text-sm">Pending</p>
          <h1>{stats.pending}</h1>
          <p className="text-sm text-text-muted">Tasks to do</p>
        </div>
      </div>

      {/* Card: Completed Tasks */}
      <div className="bg-white items-center aspect-2/1 shadow-md rounded-xl flex flex-col text-center lg:flex-row lg:text-left p-4 gap-5">
        <div className="text-2xl flex items-center text-success bg-success/15 p-4 rounded-xl ">
          <FaRegCheckCircle />
        </div>
        <div>
          <p className="text-sm">Completed</p>
          <h1>{stats.completed}</h1>
          <p className="text-sm text-text-muted">Tasks done</p>
        </div>
      </div>

      {/* Card: Overdue Tasks */}
      <div className="bg-white items-center aspect-2/1 shadow-md rounded-xl flex flex-col text-center lg:flex-row lg:text-left p-4 gap-5">
        <div className="text-2xl flex items-center text-danger bg-danger/15 p-4 rounded-xl ">
          <FaRegCalendarAlt />
        </div>
        <div>
          <p className="text-sm">Overdue</p>
          <h1>{stats.overdue}</h1>
          <p className="text-sm text-text-muted">Past due date</p>
        </div>
      </div>
      
    </div>
  );
};

export default Stats;