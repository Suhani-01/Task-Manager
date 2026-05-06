import { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import loginImage from "../assets/login-image.png";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // --- UI & Form State ---
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Submits credentials to the backend
   * Validates presence of data and handles session cookies via 'include'
   */
  const handleLogin = async () => {
    setError("");

    // Basic client-side validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const API = `${import.meta.env.VITE_API_URL}/api/user/login`;
      const res = await fetch(API, {
        method: "POST",
        credentials: "include", // Essential for cross-origin session/cookie support
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials.");
      } else {
        console.log("Login success", data);
        navigate("/tasks"); // Redirect to dashboard on success
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full relative w-full overflow-hidden grid grid-cols-2 items-center">
      {/* Absolute Logo branding */}
      <div className="absolute top-1 left-5 cursor-pointer">
        <Logo />
      </div>

      {/* Left side: Marketing/Visual Branding */}
      <div className="h-full bg-primary/20 flex flex-col gap-8 items-center justify-center">
        <div className="text-center">
          <h1 className="mb-3">Welcome Back!</h1>
          <p className="text-text-secondary text-sm ">
            Login to continue your tasks and stay productive
          </p>
        </div>

        <div className="overflow-hidden rounded-4xl mx-auto">
          <img className="h-100 scale-[1.4]" src={loginImage} alt="Login" />
        </div>
      </div>

      {/* Right side: Login Form portion */}
      <div className="h-full flex items-center justify-center">
        <div className="w-[80%] shadow-xl rounded-2xl px-10 py-15">
          <h1 className="text-3xl font-bold text-text-primary">Login</h1>
          <p className="text-text-secondary text-sm mt-1 mb-7">
            Enter your credentials to access your account
          </p>

          {/* Email Input Field */}
          <label
            className="block text-sm font-medium text-text-primary mb-2"
            htmlFor="email"
          >
            Email Address
          </label>
          <div className="relative mb-5">
            <MdOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-text-muted" />
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
            />
          </div>

          {/* Password Input Field with Toggle Visibility */}
          <label
            className="block text-sm font-medium text-text-primary mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative mb-2">
            <MdLockOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-text-muted" />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
            >
              {showPassword ? (
                <MdOutlineVisibilityOff className="text-xl" />
              ) : (
                <MdOutlineVisibility className="text-xl" />
              )}
            </button>
          </div>

          {/* Error Message Display */}
          {error && <p className="text-danger text-xs mt-2">{error}</p>}

          {/* Form Submission Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full cursor-pointer mt-7 py-3 bg-primary hover:bg-primary-hover text-text-white font-semibold rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;