export default function useUpdateTaskStatus(setTasks,setErrorMessage){
  const updateStatus = async (task) => {
    const taskId = task._id;
    const statusToDo = task.status == "pending" ? "completed" : "pending";
    setTasks((prev) =>
        prev.map((t) => (t._id == taskId ? { ...t, status: statusToDo } : t)),
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
          status: statusToDo, //pending or completed
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        setTasks((prev) =>
          prev.map((t) => (t._id == taskId ? { ...t, status: task.status } : t)),
        );
        return;
      }
      
    } catch (err) {
      console.log(err);
      setErrorMessage("Server Issue");
      setTimeout(()=>{
        setErrorMessage();
      },5000);
      setTasks((prev) =>
          prev.map((t) => (t._id == taskId ? { ...t, status: task.status } : t)),
        );
    }
  };
  return updateStatus;
}


