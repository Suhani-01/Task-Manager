/**
 * useUpdateTaskStatus - Custom Hook
 * Provides a function to toggle a task's status between 'pending' and 'completed'. 
 */
export default function useUpdateTaskStatus(setTasks, setErrorMessage) {
  
  const updateStatus = async (task) => {
    const taskId = task._id;
    const originalStatus = task.status;
    const statusToDo = originalStatus === "pending" ? "completed" : "pending";

    // --- Optimistic Update ---
    // Immediately update the local state so the user sees the checkbox change
    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, status: statusToDo } : t)),
    );

    try {
      let API = `${import.meta.env.VITE_API_URL}/api/task/update-status/${taskId}`;
      
      const res = await fetch(API, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: statusToDo,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.message);
        
        // --- Rollback ---
        // If the server rejects the change, revert the task to its original status
        setTasks((prev) =>
          prev.map((t) => (t._id === taskId ? { ...t, status: originalStatus } : t)),
        );
      }
      
    } catch (err) {
      console.error("Status update failed:", err);
      setErrorMessage("Server Issue");
      
      // Auto-clear error message after 5 seconds
      setTimeout(() => {
        setErrorMessage();
      }, 5000);

      // --- Rollback ---
      // Revert local state on frontend
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, status: originalStatus } : t)),
      );
    }
  };

  return updateStatus;
}