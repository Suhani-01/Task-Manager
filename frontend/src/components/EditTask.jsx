import { useState } from "react";

const EditTask = ({ task, setActiveEditAction}) => {
  const [formData, setFormData] = useState({
    title: task.title || "",
    description: task.description || "",
    dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
    priority: task.priority || "medium",
    status: task.status || "pending",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const API=`${import.meta.env.VITE_API_URL}/api/task/update/${task._id}`;

      const res = await fetch(API,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            ...formData
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      setActiveEditAction();

    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-100vh justify-center">
    <div className="bg-white p-5 rounded-2xl flex h-fit mt-20  shadow-2xl w-[400px] flex-col gap-3">

      <h2 className="text-lg text-center font-semibold">Edit Task</h2>

      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="border p-2 rounded focus:outline-text-muted"
      />

      <input
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="border  focus:outline-text-muted p-2 rounded"
      />

      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        className="border  focus:outline-text-muted p-2 rounded"
      />

      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        className="border  p-2 rounded"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="bg-primary text-white p-2 rounded hover:opacity-90"
      >
        {loading ? "Updating..." : "Update Task"}
      </button>

      <button
        onClick={()=>setActiveEditAction()}
        className="text-sm text-gray-500 hover:underline"
      >
        Cancel
      </button>
    </div>        
    </div>

  );
};

export default EditTask;