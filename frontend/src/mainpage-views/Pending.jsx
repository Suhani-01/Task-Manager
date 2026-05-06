import { useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io"; 
import { LuServerOff } from "react-icons/lu";
import EditTask from "../components/EditTask"; 
import TaskTable from "../components/TaskTable";

/**
 * Pending Component
 * Fetches and displays only tasks with status='pending'. 
 */
const Pending = ({ setActivePage }) => {
  const [loading, setLoading] = useState(false);
  const [pendingTasks, setPendingTasks] = useState([]);
  
  // activeAction: stores the ID of the task that has its "three dots" menu open
  const [activeAction, setActiveAction] = useState();
  
  // activeEditAction: stores the entire task object being edited
  const [activeEditAction, setActiveEditAction] = useState();
  const [errorMessage, setErrorMessage] = useState();

  /**
   * Fetch pending tasks on component mount
   */
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      // Query parameter status=pending filters the results on the backend
      let API = `${import.meta.env.VITE_API_URL}/api/task?status=pending`;

      try {
        const res = await fetch(API, {
          credentials: "include",
          method: "GET",
        });

        const data = await res.json();
        setPendingTasks(data);
      } catch (err) {
        setErrorMessage("Could not connect to server");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
    
    // Cleanup: close any open action menus when leaving the page
    return () => setActiveAction();
  }, []);

  return (
    /* 
      The onClick here ensures that clicking anywhere outside a menu 
      clears the activeAction, effectively closing open dropdowns.
    */
    <div onClick={() => setActiveAction()}
      className="px-3 sm:px-8 h-full w-full relative flex flex-col gap-7"
    >

      {/* Edit Modal Overlay */}
      {activeEditAction && (
        <div className="absolute w-full left-0 h-full bg-white/20 backdrop-blur-xs top-0 z-10000">
          <EditTask 
            setActiveEditAction={setActiveEditAction} 
            task={activeEditAction}
          />
        </div>
      )}

      {/*   Error Message  */}
      {errorMessage && (
        <div className="bg-warning-light absolute flex gap-3 top-4 left-[40%] items-center text-center rounded-2xl text-warning animate-bounce p-3 px-4 z-50">
          <LuServerOff />
          {errorMessage}
        </div>
      )}

      {/* Heading */}
      <div className="my-4 flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pending Tasks</h1>
          <p className="text-sm text-text-muted">Here are the tasks you have to do ...!</p>
        </div>

        {/* Navigation to Add Task Page */}
        <div
          onClick={() => setActivePage(2)}
          className="flex h-fit cursor-pointer hover:bg-primary-hover bg-primary text-white px-4 py-2 rounded-sm gap-1 items-center transition-colors"
        >
          <span className="text-xl">
            <IoIosAdd />
          </span>
          <span className="text-sm pr-2">Add Task</span>
        </div>
      </div>

      {/* 
          Task Table: Main Data Display  
      */}
      <TaskTable 
        tasks={pendingTasks} 
        setTasks={setPendingTasks} 
        setActiveEditAction={setActiveEditAction} 
        setErrorMessage={setErrorMessage} 
        loading={loading} 
        activeAction={activeAction} 
        setActiveAction={setActiveAction} 
      />
    </div>
  );
};

export default Pending;