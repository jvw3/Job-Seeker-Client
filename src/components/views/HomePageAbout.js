import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBoardsForUser } from "../managers/BoardManager";
import SalyDeskImage from "./HompageImages/Saly-10.png";
export const HomePageAbout = () => {
  return (
    <main className="bg-gradient-to-r from-home-orange via-home-blue to-home-orange">
      <div className="flex h-screen justify-end">
        <div className="flex-row">
        <h1 className="text-white text-4xl">
            What is Job Seeker?
        </h1>
        <img className="h-3/4" src={SalyDeskImage}></img>
        </div>
      </div>
    </main>
  );
};
