import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa"; 

/**
 * AddTask Component
 * Provides a form to create new tasks.
 */
const AddTask = ({setActivePage}) => {
  // Individual state pieces for each form field
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");
  
  // UI feedback states
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [taskAdded, setTaskAdded] = useState(false);

  /**
   * Resets all form fields to their initial values
   */
  const clearFields = () => {
    setTitle("");
    setDescription("");
    setStatus("pending");
    setDueDate("");
    setPriority("medium");
  };

  /**
   * Validates input and sends a POST request to the API
   */
  const createTask = async () => {
    // Basic frontend validation
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
        // Show success notification and hide it after 3 seconds
        setTaskAdded(true);
        setTimeout(() => {
          setTaskAdded(false);
        }, 3000);
      }
    } catch (err) {
      setErrorMessage("Network error. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
      clearFields();
    }
  };

  return (
    <div className="px-3 sm:px-8 flex flex-col gap-7 relative">
      {/* Success Notification Popup */}
      {taskAdded && (
        <div className="absolute animate-bounce bg-white text-success flex gap-4 text-lg items-center p-4 rounded-2xl shadow-lg mr-10 right-0 z-50">
          <FaCheckCircle /> Task Added Successfully
        </div>
      )}

      {/* Header Section */}
      <div className="my-4 flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Add New Task</h1>
          <p className="text-sm text-text-muted">
            Create a new task to stay organized and productive
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white shadow-xl rounded-xl px-4 py-10">
        <div>
          {/* Task Title Input */}
          <label className="block text-sm font-medium text-text-primary mb-2" htmlFor="title">
            Task Title <span className="text-danger">*</span>
          </label>
          <div className="relative mb-8">
            <input
              type="text"
              id="title"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
            />
          </div>

          {/* Description Textarea */}
          <label className="block text-sm font-medium text-text-primary mb-2" htmlFor="description">
            Description
          </label>
          <div className="relative mb-8">
            <textarea
              id="description"
              rows={4}
              placeholder="Enter task description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:border-primary"
            />
          </div>

          {/* Selection Grid: Priority, Due Date, and Status */}
          <div className="grid mb-3 gap-7 grid-cols-1 md:grid-cols-3">
            {/* Priority Select */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2" htmlFor="priority">
                Priority <span className="text-danger">*</span>
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-white focus:outline-none"
              >
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
                <option value="low">🟢 Low</option>
              </select>
            </div>

            {/* Due Date Input */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2" htmlFor="dueDate">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none"
              />
            </div>

            {/* Status Select */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2" htmlFor="status">
                Status <span className="text-danger">*</span>
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-white focus:outline-none"
              >
                <option value="pending">🟡 Pending</option>
                <option value="completed">🟢 Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-5 justify-end mt-8">
          <button
            onClick={() => {
              clearFields();
              setActivePage(0); // Navigate back to list/dashboard
            }}
            className="text-sm px-4 py-2 border border-primary text-primary rounded hover:bg-primary/5 transition-colors"
          >
            Cancel
          </button>
          
          <button 
            disabled={loading}
            onClick={createTask}
            className="flex items-center bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover disabled:opacity-50 transition-all"
          >
            {loading ? (
              <span className="text-sm">Adding...</span>
            ) : (
              <>
                <IoIosAdd className="text-xl" />
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