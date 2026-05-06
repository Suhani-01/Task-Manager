import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { MdVerifiedUser } from "react-icons/md";
import { MdOutlineCreditCardOff } from "react-icons/md";
import { MdElectricBolt } from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { FaBell } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";

const Landing = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check user authentication status on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const API = `${import.meta.env.VITE_API_URL}/api/user/profile`;
        const res = await fetch(API, {
          method: "GET",
          credentials: "include", // Required for cross-origin cookie/session handling
        });
        const data = await res.json();
        
        if (res.ok) {
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.log("Something went wrong", err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <Navbar isLoggedIn={isLoggedIn} />

      {/* HERO SECTION: Main value proposition and CTA */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pt-10  md:pt-16 pb-15 flex flex-col md:flex-row items-center gap-16">
        {/* Left Content: Headline and Call to Action */}
        <div className="flex-1 max-w-xl">
          <div className="flex items-center gap-2 mb-6">
            <span style={{ color: "var(--color-primary)" }} className="text-base">✦</span>
            <p className="text-sm font-medium" style={{ color: "var(--color-primary)" }}>
              Organize your work. Boost your productivity.
            </p>
          </div>

          <div className="font-extrabold text-4xl mb-5">
            <div className="mb-2">Manage Tasks.</div>
            <div>Achieve <span className="text-primary">More.</span></div>
          </div>

          <p className="text-lg mb-8" style={{ color: "var(--color-text-secondary)" }}>
            Task Manager helps you organize your tasks, stay focused, and get
            things done efficiently.
          </p>

          <div className=" mb-10">
            <button
              onClick={() => navigate("/getStarted")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl cursor-pointer font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              Get Started - It's Free →
            </button>
          </div>

          {/* Trust Badges: Map through feature highlights */}
          <div className="flex items-center gap-8">
            {[
              { icon: <MdVerifiedUser />, label: "100% Free" },
              { icon: <MdOutlineCreditCardOff />, label: "No Credit Card" },
              { icon: <MdElectricBolt />, label: "Easy to Use" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex p-2 rounded shadow items-center gap-2">
                <span className="text-primary">{icon}</span>
                <span className="text-sm text-text-secondary font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content: Product Preview Image */}
        <div className="flex-1 flex justify-end">
          <div
            className="rounded-2xl overflow-hidden shadow-2xl border"
            style={{
              borderColor: "var(--color-border)",
              maxWidth: 640,
              width: "100%",
            }}
          >
            <img
              src="/dashboard-preview.png"
              alt="TaskManager dashboard preview"
              className="w-full h-auto block"
            />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION: Grid display of app capabilities */}
      <section
        className="py-10 border-t"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-card)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-14">
            Everything you need to stay productive
          </h2>

          <div className="grid md:grid-cols-4 gap-10">
            {[
              {
                icon: <FaCheckSquare />,
                bg: "var(--color-primary-light)",
                color: "var(--color-primary)",
                title: "Organize Tasks",
                desc: "Create, organize, and prioritize tasks effortlessly.",
              },
              {
                icon: <GiProgression />,
                bg: "var(--color-success-light)",
                color: "var(--color-success)",
                title: "Track Progress",
                desc: "Monitor your progress and stay on track.",
              },
              {
                icon: <FaBell />,
                bg: "var(--color-warning-light)",
                color: "var(--color-warning)",
                title: "Smart Reminders",
                desc: "Get timely reminders and never miss a deadline.",
              },
              {
                icon: <FaLock />,
                bg: "var(--color-info-light)",
                color: "var(--color-info)",
                title: "Secure & Private",
                desc: "Your data is safe with us. We value your privacy.",
              },
            ].map(({ icon, bg, color, title, desc }) => (
              <div key={title} className="flex shadow-lg p-3 rounded-xl gap-4">
                <div
                  className="h-12 aspect-square rounded-xl flex items-center justify-center text-xl"
                  style={{ backgroundColor: bg, color }}
                >
                  {icon}
                </div>
                <div>
                  <h3 className="font-bold text-base" style={{ color: "var(--color-text-primary)" }}>
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;