import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentSeeker } from "../managers/AuthManager";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// User Profile Component renders the user profile data

export const UserProfile = () => {
  const navigate = useNavigate()
  const [currentSeeker, setCurrentSeeker] = useState({})


  useEffect(() => {
    getCurrentSeeker().then((user) => {
      setCurrentSeeker(user);
    });
  }, []);


  return (
    <>
      <main className="w-full pt-4 pl-4 bg-pinkswirl">
        <h1 className="mb-3 text-4xl text-white font-quicksand">
          {currentSeeker.full_name}
        </h1>
        <button onClick={() => navigate(`/editprofile`)} className="px-4 mb-2 mr-2 text-sm font-medium text-center text-white rounded-lg shadow-lg btn bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br">
          Edit Profile
        </button>
        <div className="space-y-1">
          <div className="text-2xl text-white">
            {currentSeeker?.user?.username}
          </div>
          <div className="text-2xl text-white">
            {currentSeeker?.user?.email}
          </div>
          <div className="text-2xl text-white">{currentSeeker?.bio}</div>
          <div>{currentSeeker.elevator_pitch}</div>
        </div>
        <ToastContainer pauseOnHover={false} autoClose={2500} />
      </main>
    </>
  );
};
