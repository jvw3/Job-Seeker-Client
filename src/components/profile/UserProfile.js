import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentSeeker } from "../managers/AuthManager";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UserProfile = () => {
  const [currentSeeker, setCurrentSeeker] = useState({})


  useEffect(() => {
    getCurrentSeeker().then((user) => {
      setCurrentSeeker(user);
    });
  }, []);


  return (
    <>
      <main className="bg-pinkswirl w-full">
        <h1 className="text-4xl">{currentSeeker.full_name}</h1>
        <div>{currentSeeker?.user?.username}</div>
        <div>{currentSeeker?.user?.email}</div>
        <div>{currentSeeker?.bio}</div>
        <div>{currentSeeker.elevator_pitch}</div>
        <ToastContainer pauseOnHover={false} autoClose={2500} />
      </main>
    </>
  );
};
