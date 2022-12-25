import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBoardsForUser } from "../managers/BoardManager";

export const HomePage = () => {
const navigate = useNavigate()

  return (
    <>
      <h1>Welcome To Job Seeker</h1>
      <button
        onClick={() => {
          navigate(`/login`);
        }}
      >
        Log in
      </button>
    </>
  );
};
