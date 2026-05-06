import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    /*
     * Handles the logout process
     * Requests the backend to clear session cookies and redirects to home
     */
    const handleLogout = async () => {
        // Confirmation from user before proceeding
        const sure = confirm("Are you sure you want to logout ?")
        if (!sure) return;

        try {
            setLoading(true);
            const API = `${import.meta.env.VITE_API_URL}/api/user/logout`;
            
            const res = await fetch(API, {
                credentials: "include", // Required to send the cookie to the server for clearing
                method: "POST",
            })

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Something went wrong");
                return;
            }

            // Successful logout: Redirect to Landing page
            navigate("/");

        } catch (err) {
            console.log(err);
            alert("Something went wrong");
            setLoading(false);
        }
    }

  return (
    <button 
      disabled={loading} 
      onClick={() => handleLogout()} 
      className="bg-primary hover:bg-primary-hover cursor-pointer flex gap-2 mx-3 my-4 items-center justify-center text-white px-3 py-2 rounded-md"
    >
      <BiLogOut className="text-lg"/> 
      {loading ? "Logging out.." : "LogOut"}
    </button>
  )
}

export default Logout