import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBoardsForUser } from "../managers/BoardManager";
import SalyImg from "./HompageImages/Saly-1.png"
export const HomePageLanding = () => {

  return (
    <main className="bg-gradient-to-r from-home-orange via-home-blue to-home-orange">
      <div className="flex h-screen">
        <div className="self-center text-4xl w-1/5 text-white">
          Are you ready to take your Job Search to the next Level?
        </div>
        <img src={SalyImg}></img>
      </div>
    </main>
  );
};
