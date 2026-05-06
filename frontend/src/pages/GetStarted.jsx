import { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { MdLockOutline } from "react-icons/md";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import loginImage from "../assets/login-image.png"
import { FaRegUser } from "react-icons/fa";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const navigate = useNavigate();

  // --- Form States ---
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Handles user registration
   * Validates input, checks for password match, and redirects to login on success
   */
  const handleSignup = async () => {
    setError("");

    // Field presence validation
    if (!email || !password || !name) {
      setError("Please fill in all fields.");
      return;
    }

    // Client-side password confirmation check
    if (password !== confirmPassword) {
      setError("Password is not matching");
      return;
    }

    setLoading(true);
    try {
      const API = `${import.meta.env.VITE_API_URL}/api/user/signup`
      const res = await fetch(API, {
        method: "POST",
        credentials: "include", // Required for session handling
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials.");
      } else {
        console.log("Signup success", data);
        navigate("/login"); // Direct user to login after successful account creation
      }
    } catch (e) {
      setError("Network error. Please try again.");
      console.log(e)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full relative w-full overflow-hidden grid grid-cols-2 items-center">
      {/* App Branding */}
      <div className="absolute top-1 left-5 cursor-pointer"><Logo /></div>

      {/* Left Column: Visual/Marketing Content */}
      <div className="h-full bg-primary/20 flex flex-col gap-8 items-center justify-center">
        <div className="text-center">
          <h1 className="mb-3">Welcome!</h1>
          <p className="text-text-secondary text-sm ">Create Account to organize your tasks and stay productive .</p>
        </div>

        <div className="overflow-hidden rounded-4xl mx-auto">
          <img className="h-100 scale-[1.4]" src={loginImage} alt="Login" />
        </div>
      </div>

      {/* Right Column: Signup Form */}
      <div className="h-full flex items-center justify-center">
        <div className="w-[80%] shadow-xl rounded-2xl px-10 py-15">
          <h1 className="text-3xl font-bold text-text-primary">Create Account</h1>
          <p className="text-text-secondary text-sm mt-1 mb-7">
            Enter your credentials to create new account
          </p>

          {/* Name Field */}
          <label className="block text-sm font-medium text-text-primary mb-2" htmlFor="name">
            Name
          </label>
          <div className="relative mb-5">
            <FaRegUser className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-text-muted" />
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
            />
          </div>

          {/* Email Field */}
          <label className="block text-sm font-medium text-text-primary mb-2" htmlFor="email">
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

          {/* Password Field with visibility toggle */}
          <label className="block text-sm font-medium text-text-primary mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative mb-5">
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
              {showPassword ? <MdOutlineVisibilityOff className="text-xl" /> : <MdOutlineVisibility className="text-xl" />}
            </button>
          </div>

          {/* Confirm Password Field */}
          <label className="block text-sm font-medium text-text-primary mb-2" htmlFor="confirm-password">
            Confirm Password
          </label>
          <div className="relative mb-5">
            <MdLockOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-text-muted" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              placeholder="Retype your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-3 border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
            >
              {showConfirmPassword ? <MdOutlineVisibilityOff className="text-xl" /> : <MdOutlineVisibility className="text-xl" />}
            </button>
          </div>

          {/* Error Display */}
          {error && <p className="text-danger text-center text-xs mt-2">{error}</p>}

          {/* Action Button */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full cursor-pointer mt-7 py-3 bg-primary hover:bg-primary-hover text-text-white font-semibold rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;