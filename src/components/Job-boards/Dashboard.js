import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBoardsForUser } from "../managers/BoardManager";

export const Dashboard = () => {
const[boards, setBoards] = useState([])
const navigate = useNavigate()

useEffect(() => {
    getAllBoardsForUser()
      .then((userBoards) => {
        setBoards(userBoards);
      });
  }, []);


    return (
      <>
        <h1>Dashboard</h1>
        <div>
          <div>
            <button
              onClick={() => {
                navigate(`/createboard`);
              }}
            >
              Create New Board
            </button>
          </div>
          {boards.map((board) => (
            <>
              <div key={`board--${board.id}`}>
                <h2>{board.title}</h2>
                <button
                  onClick={() => {
                    navigate(`/boards/${board.id}`);
                  }}
                >
                  View Board
                </button>
                <h3>Goal</h3>
                <h4>{board.goal}</h4>
                <h3>Requirements</h3>
                <h4>{board.requirements}</h4>
                <div>Total Applications</div>
                <div>Total Interviews</div>
                <div>Total Offers</div>
              </div>
            </>
          ))}
          <div>Upcoming Interviews</div>
          <div>Upcoming Recruiting Calls</div>
          <div>Upcoming Networking Calls</div>
        </div>
      </>
    );
}