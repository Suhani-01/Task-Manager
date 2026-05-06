import { useState } from "react";

/**
 * EditTask Component
 * Pre-fills a form with existing task data and sends a POST request to update it.
 */
const EditTask = ({ task, setActiveEditAction}) => {
  // --- Form State Initialization ---
  const [formData, setFormData] = useState({
    title: task.title || "",
    description: task.description || "",
    // Date input requires YYYY-MM-DD format, so we split the ISO string
    dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
    priority: task.priority || "medium",
    status: task.status || "pending",
  });

  const [loading, setLoading] = useState(false);

  /**
   * Updates local state as the user types
   */
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /**
   * Submits the updated task data to the backend
   */
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const API = `${import.meta.env.VITE_API_URL}/api/task/update/${task._id}`;

      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...formData
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      
      // Close the edit component on success
      setActiveEditAction();

    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-100vh justify-center">
      {/* Modal Container */}
      <div className="bg-white p-5 rounded-2xl flex h-fit mt-20 shadow-2xl w-[400px] flex-col gap-3">

        <h2 className="text-lg text-center font-semibold">Edit Task</h2>

        {/* Title Input */}
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 rounded focus:outline-text-muted"
        />

        {/* Description Input */}
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border focus:outline-text-muted p-2 rounded"
        />

        {/* Date Picker */}
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="border focus:outline-text-muted p-2 rounded"
        />

        {/* Priority Selection */}
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        {/* Status Selection */}
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        {/* Submission Button */}
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="bg-primary text-white p-2 rounded hover:opacity-90"
        >
          {loading ? "Updating..." : "Update Task"}
        </button>

        {/* Cancellation Button: Closes the modal without saving */}
        <button
          onClick={() => setActiveEditAction()}
          className="text-sm text-gray-500 hover:underline"
        >
          Cancel
        </button>
      </div>        
    </div>
  );
};

export default EditTask;