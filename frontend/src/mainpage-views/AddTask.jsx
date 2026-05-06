import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa"; 

const AddTask = ({setActivePage}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [taskAdded, setTaskAdded] = useState(false);

  const clearFields = () => {
    setTitle("");
    setDescription("");
    setStatus("pending");
    setDueDate("");
    setPriority("medium");
  };

  const createTask = async () => {
    if (!title || !priority || !status) {
      setErrorMessage("Missing input fields");
      return;
    }
    setLoading(true);

    try {
      const API = `${import.meta.env.VITE_API_URL}/api/task/`;
      const res = await fetch(API, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, status, priority, dueDate }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.message || "Something went wrong");
      } else {
        setTaskAdded(true);
        setTimeout(() => {
          setTaskAdded(false);
        }, 3000);
      }
    } catch (err) {
      setErrorMessage("Network error. Please try again.");
      console.log(err)
    } finally {
      setLoading(false);
      clearFields();
    }
  };

  return (
    <div className="px-8 flex flex-col gap-7 relative">
      {taskAdded && (
        <div className="absolute animate-bounce bg-white text-success flex gap-4 text-lg items-center p-4 rounded-2xl shadow-lg mr-10 right-0">
          {" "}
          <FaCheckCircle /> Task Added Sucessfully
        </div>
      )}

      {/* heading */}
      <div className="my-4 flex justify-between">
        <div>
          <h1>Add New Task</h1>
          <p className="text-sm">
            Create a new task to stay organized and productive
          </p>
        </div>
      </div>

      {/* form */}
      <div className="bg-white shadow-xl rounded-xl px-4 py-10">
        <div>
          {/* Task Title */}
          <label
            className="block text-sm font-medium text-text-primary mb-2"
            htmlFor="title"
          >
            Task Title <span className="text-danger">*</span>
          </label>
          <div className="relative mb-8">
            <input
              type="text"
              id="title"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
            />
          </div>

          {/* Task Description */}
          <label
            className="block text-sm font-medium text-text-primary mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <div className="relative mb-8">
            <textarea
              type="text"
              id="description"
              rows={4}
              placeholder="Enter task description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid mb-3 gap-7 grid-cols-3">
            {/* Task Priority */}
            <div>
              <label
                className="block text-sm font-medium text-text-primary mb-2"
                htmlFor="priority"
              >
                Priority <span className="text-danger">*</span>
              </label>
              <div className="relative mb-5">
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:border-primary bg-white"
                >
                  <option value="medium">🟡 Medium</option> {/* default */}
                  <option value="high">🔴 High</option>
                  <option value="low">🟢 Low</option>
                </select>
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label
                className="block text-sm font-medium text-text-primary mb-2"
                htmlFor="dueDate"
              >
                Due Date
              </label>
              <div className="relative mb-5">
                <input
                  type="date"
                  id="dueDate"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Task Status */}
            <div>
              <label
                className="block text-sm font-medium text-text-primary mb-2"
                htmlFor="status"
              >
                Status <span className="text-danger">*</span>
              </label>
              <div className="relative mb-5">
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:border-primary bg-white"
                >
                  <option value="pending">🟡 Pending</option> {/* default */}
                  <option value="completed">🟢 Completed</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-5 justify-end">
          <div
            onClick={() => {
              clearFields();
              setActivePage(0);
            }}
            className="flex text-sm w-fit h-fit cursor-pointer border border-primary text-primary px-4 py-2 rounded-sm gap-1 "
          >
            Cancel
          </div>
          <button disabled={loading}
            onClick={() => createTask()}
            className="flex w-fit h-fit cursor-pointer hover:bg-primary-hover bg-primary text-white px-4 py-2 rounded-sm gap-1 "
          >
            {loading ? (
              <div className="text-sm">Adding...</div>
            ) : (
              <>
                <span className="text-xl">
                  <IoIosAdd />
                </span>
                <span className="text-sm pr-2">Add Task</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
