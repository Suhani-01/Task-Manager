import { FaRegCheckCircle} from "react-icons/fa";
import { TbClipboardList } from "react-icons/tb";
import { IoMdTime } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

const Stats = () => {
  const [stats,setStats]=useState({completed:0,overdue:0,pending:0,total:0});
  ///task/stats
  useEffect(()=>{
        const fetchStats=async()=>{
            const API=`${import.meta.env.VITE_API_URL}/api/task/stats`
            const res=await fetch(API,{
                method: "GET",
                credentials: "include", // MOST IMPORTANT
            });
            const data=await res.json();
            console.log(data);
            if(!res.ok){
                console.log(data.message)
            }else{
              setStats(data);
              console.log(data)
            }
        }
        fetchStats();

        return ()=>{setStats({completed:0,overdue:0,pending:0,total:0})}
    },[]);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-between">

            <div className="bg-white items-center aspect-2/1 shadow-md rounded-xl flex flex-col text-center lg:flex-row lg:text-left p-4 gap-5">
              <div className="text-2xl  flex items-center text-primary bg-primary/15 p-4 rounded-xl ">
                <TbClipboardList />
              </div>
              <div>
                <p className="text-sm">Total Tasks</p>
                <h1>{stats.total}</h1>
                <p className="text-sm">All tasks</p>
              </div>
            </div>
    
            <div className="bg-white items-center aspect-2/1 shadow-md rounded-xl flex flex-col text-center lg:flex-row lg:text-left p-4 gap-5">
              <div className="text-2xl  flex items-center text-warning bg-warning/15 p-4 rounded-xl ">
                <IoMdTime />
              </div>
              <div>
                <p className="text-sm">Pending</p>
                <h1>{stats.pending}</h1>
                <p className="text-sm">Tasks to do</p>
              </div>
            </div>
    
            <div className="bg-white items-center aspect-2/1 shadow-md rounded-xl flex flex-col text-center lg:flex-row lg:text-left p-4 gap-5">
              <div className="text-2xl  flex items-center text-success bg-success/15 p-4 rounded-xl ">
                <FaRegCheckCircle />
              </div>
              <div>
                <p className="text-sm">Completed</p>
                <h1>{stats.completed}</h1>
                <p className="text-sm">Tasks done</p>
              </div>
            </div>
    
            <div className="bg-white items-center aspect-2/1 shadow-md rounded-xl flex flex-col text-center lg:flex-row lg:text-left p-4 gap-5">
              <div className="text-2xl  flex items-center text-danger bg-danger/15 p-4 rounded-xl ">
                <FaRegCalendarAlt />
              </div>
              <div>
                <p className="text-sm">Overdue</p>
                <h1>{stats.overdue}</h1>
                <p className="text-sm">Past due date</p>
              </div>
            </div>
          </div>
  )
}

export default Stats
