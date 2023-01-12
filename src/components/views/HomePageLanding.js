import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBoardsForUser } from "../managers/BoardManager";
import SalyImg from "./HompageImages/Saly-1.png"
import SeekerLogo from "./HompageImages/SeekerLogo.svg"

export const HomePageLanding = () => {

  return (
    <main className="bg-pinkswirl ">
      <div className="flex h-screen">
        <div className="self-center text-7xl text-left p-10 w-1/5 text-white font-quicksand">
          Are you ready to take your Job Search to the next Level?
        </div>
        <img className="w-3/5" src={SalyImg}></img>
        <div className="mt-32 text-4xl text-white w-1/5 font-quicksand">Job Seeker is a job application tracker built for developers.</div>
      </div>
    </main>
  );
};
