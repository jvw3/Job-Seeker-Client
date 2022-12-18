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
        <h1 className="text-4xl">Dashboard</h1>
        <div>
          <div>
            <button
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
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
                <h2 className="text-2xl">{board.title}</h2>
                <button
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
                  onClick={() => {
                    navigate(`/boards/${board.id}`);
                  }}
                >
                  View Board
                </button>
                <h3 className="text-xl">Goal</h3>
                <h4>{board.goal}</h4>
                <h3 className="text-xl">Requirements</h3>
                <h4>{board.requirements}</h4>
                <div className="text-xl">Total Applications</div>
                <div className="text-xl">Total Interviews</div>
                <div className="text-xl">Total Offers</div>
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