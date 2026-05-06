import { useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io"; 
import { LuServerOff } from "react-icons/lu";
import EditTask from "../components/EditTask"; 
import TaskTable from "../components/TaskTable";

const Pending = ({ setActivePage }) => {
  const [loading, setLoading] = useState(false);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [activeAction,setActiveAction]=useState();
  const [activeEditAction,setActiveEditAction]=useState();
  const [errorMessage, setErrorMessage] = useState();


  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      console.log("I am running");
      let API = `${import.meta.env.VITE_API_URL}/api/task?status=pending`;

      const res = await fetch(API, {
        credentials: "include",
        method: "GET",
      });

      const data = await res.json();
      console.log(data);
      setLoading(false);
      setPendingTasks(data);
    };

    fetchTasks();
    
    return()=>setActiveAction();

  }, []);



  return (
    <div onClick={()=>setActiveAction()}
      className="px-8 h-full w-full relative flex flex-col gap-7"
    >

      {activeEditAction && <div className="absolute w-full left-0 h-full bg-white/20 backdrop-blur-xs top-0 z-10000 ">
          <EditTask setActiveEditAction={setActiveEditAction} task={activeEditAction}/>
      </div>}
      {errorMessage && (
        <div className="bg-warning-light absolute flex gap-3 top-4 left-[40%] items-center text-center rounded-2xl text-warning animate-bounce absoluute p-3 px-4">
          <LuServerOff />
          {errorMessage}
        </div>
      )}
      {/* heading */}
      <div className="my-4 flex justify-between">
        <div>
          <h1>Pending Tasks</h1>
          <p className="text-sm">Here are the tasks you have to do ...!</p>
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

      {/* pending Tasks */}
      <TaskTable tasks={pendingTasks} setTasks={setPendingTasks} setActiveEditAction={setActiveEditAction} setErrorMessage={setErrorMessage} loading={loading} activeAction={activeAction} setActiveAction={setActiveAction} />
    </div>
  );
};

export default Pending;