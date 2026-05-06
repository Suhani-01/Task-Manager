import { CgMail } from "react-icons/cg";
import { FaRegCalendar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Stats from "../components/Stats";


const Profile = ({ userData }) => {
  return (
    <div className="px-8 flex flex-col gap-7">
      {/* heading */}
      <div className="my-4">
        <div>
          <h1>Profile</h1>
          <p className="text-sm">
            How's your productivity going {userData?.name} ?
          </p>
        </div>
      </div>


      {/* user profile */}
      <div className="flex gap-6 bg-white shadow-md rounded-2xl p-5 justify-between">
        <div className="bg-primary/80 text-text-white aspect-square h-25 flex items-center justify-center text-5xl rounded-full relative">
          <div>{userData.name.charAt(0).toUpperCase()}</div>{" "}
          <div className="absolute bg-success h-6 aspect-square rounded-full border-6 right-0 bottom-0"></div>
        </div>

        <div className="flex-1">
          <div className="text-xl font-bold">{userData.name}</div>

          <div className="text-sm mt-2 text-gray-600">

            {/* user Email */}
            <div className="flex mb-1 items-center gap-1">
              <CgMail className="text-xl w-5" />
              {userData.email}
            </div>

            {/* user Joining Date */}
            <div className="flex mb-1 items-center gap-1">
              <FaRegCalendar className="w-5" />
              Joined{" "}
              {new Date(userData.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>

            {/* user Location : currently default is India */}
            <div className="flex mb-1 items-center gap-1">
              <FaLocationDot className="w-5 text-lg" />
              India
            </div>


          </div>
        </div>
      </div>

      {/* stats */}
      <Stats />

    </div>
  );
};

export default Profile;
