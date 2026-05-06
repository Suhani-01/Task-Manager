import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoCalendarClearOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { CalculateDue } from "./CalculateDue";
import { MdDelete } from "react-icons/md";
import useUpdateTaskStatus from "../hooks/useUpdateTaskStatus";

/**
 * TaskTable Component
 * Responsible for rendering the list of tasks in a tabular format
 * Handles individual task deletion and toggles the edit/delete dropdown
 */
const TaskTable = ({
  tasks,
  setTasks,
  setActiveEditAction,
  setErrorMessage,
  loading,
  activeAction, // Stores the ID of the task whose action menu is currently open
  setActiveAction,
}) => {
  const updateStatus = useUpdateTaskStatus(setTasks, setErrorMessage);

  /**
   * Deletes a task from the database and updates the local state
   */
  const handleDelete = async (id) => {
    const sure = confirm("Are you sure you want to delete?");
    if (!sure) return;
    try {
      const API = `${import.meta.env.VITE_API_URL}/api/task/delete/${id}`;
      const res = await fetch(API, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.message);
        setTimeout(() => setErrorMessage(), 5000);
        return;
      }

      // Remove the deleted task from the UI state immediately
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      setErrorMessage("Something went wrong");
      setTimeout(() => setErrorMessage(), 5000);
      console.log(err);
    }
  };

  return (
    <div className="px-2 sm:px-8 relative min-h-[150px] max-h-fit text-xs sm:text-sm flex shadow-xl rounded-xl py-4 bg-white">
      <table className="w-full ">
        <thead className="text-text-muted text-sm">
          <tr className="border-b-2 ">
            <th className="pb-2"> </th>
            <th className="pb-2 text-left">Task</th>
            <th className="pb-2">Priority</th>
            <th className="pb-2">Due Date</th>
            <th className="hidden sm:block pb-2">Status</th>
            <th className="pb-2">Actions</th>
          </tr>
        </thead>
        <br />
        <tbody>
          {loading ? (
            /* Loading Message */
            <div className="text-center animate-pulse font-bold text-text-muted justify-center w-full absolute top-[55%] mx-auto flex items-center gap-2">
              <AiOutlineLoading3Quarters className="animate-spin" />
              Loading...
            </div>
          ) : (
            <>
              {tasks?.length == 0 ? (
                /* No Task Message */
                <div className="absolute text-text-muted text-center w-full h-full top-0 flex justify-center items-center left-0">
                  No tasks here
                </div>
              ) : (
                tasks?.map((task) => (
                  <tr
                    className="border-b h-fit relative cursor-pointer hover:bg-primary-light border-text-muted"
                    key={task._id}
                  >
                    {/* Column 1: Completion Checkbox */}
                    <td className="py-2 lg:px-2 px-1 ">
                      <input
                        onClick={() => updateStatus(task)}
                        checked={task.status == "completed"}
                        readOnly
                        type="checkbox"
                        className=" cursor-pointer"
                      />
                    </td>

                    {/* Column 2: Task Details */}
                    <td className="px-2">
                      <div className=" text-sm lg:font-semibold">{task.title}</div>
                      <div className="text-text-muted hidden lg:block">{task.description}</div>
                    </td>

                    {/* Column 3: Priority Badge */}
                    <td className="text-center lg:px-2 py-2 px-1">
                      <span
                        className={`px-3 rounded-2xl ${
                          task.priority == "high" ? "bg-danger-light text-danger" : 
                          task.priority == "medium" ? "bg-warning-light text-warning" : 
                          "bg-success-light text-success"
                        }`}
                      >
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                    </td>

                    {/* Column 4: Due Date + Remaining Time Calculation */}
                    <td className="py-2 text-center sm:w-30 lg:w-35 lg:px-2">
                      <div className="flex items-center lg:items-start text-sm gap-1 lg:gap-2">
                        <IoCalendarClearOutline className="hidden sm:block lg:text-lg" />
                        <span>
                          <div className="text-xs sm:text-sm">
                            {task.dueDate ? (
                              <>
                                {new Date(task.dueDate).toLocaleDateString("en-US", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                                <span className="hidden lg:block">
                                   <CalculateDue task={task} /> 
                                </span>
                              </>
                            ) : (
                              <span className="text-text-muted">No Due Date</span>
                            )}
                          </div>
                        </span>
                      </div>
                    </td>

                    {/* Column 5: Status [pending , completed] Badge (Hidden on mobile) */}
                    <td className="text-center hidden sm:block lg:px-2 py-3 px-1">
                      <span
                        className={`rounded-2xl w-fit px-3 ${task.status == "pending" ? "bg-warning-light text-warning" : "bg-success-light text-success"}`}
                      >
                        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </span>
                    </td>

                    {/* Column 6: Action Toggle Trigger */}
                    <td className="text-center lg:px-2 pr-3 py-3">
                      <BsThreeDotsVertical
                        onClick={(e) => {
                          setActiveAction(task._id);
                          e.stopPropagation(); // Prevents parent onClick from closing the menu immediately
                        }}
                        className="mx-auto cursor-pointer hover:text-primary"
                      />
                    </td>

                    {/* Absolute-positioned Action Menu (Delete/Edit) */}
                    {task._id === activeAction && (
                      <div className="absolute -right-[4%] top-[25%] z-1000 flex flex-col bg-white text-sm p-2 text-center border border-text-muted rounded-lg shadow-lg">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveAction(); // Close menu
                            handleDelete(task._id);
                          }}
                          className="border-b border-text-muted flex gap-1 items-center text-danger cursor-pointer px-3 py-1"
                        >
                          <MdDelete /> Delete
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveEditAction(task); // Open Edit component
                          }}
                          className="cursor-pointer flex gap-1 justify-center items-center text-primary px-3 py-1"
                        >
                          <FaEdit /> Edit
                        </button>
                      </div>
                    )}
                  </tr>
                ))
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;