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


    return<>
    <h1>Dashboard</h1>
    <div>
        <div>
            <button
            onClick={() => {
                navigate(`/createboard`);
                }}>Create New Board</button>
        </div>
        {
            boards.map(board =>
                <>
                <div key={`board--${board.id}`}>
                <div>{board.title}</div>
                <button
                onClick={() => {
                navigate(`/boards/${board.id}`);
                }}>
                View Board
                </button>
                <div>{board.goal}</div>
                <div>{board.requirements}</div>
                <div>Total Applications</div>
                <div>Total Interviews</div>
                <div>Total Offers</div>
                </div>
                </>
            )
        }
    <div>Create New Board</div>
    <div>Upcoming Interviews</div>
    <div>Upcoming Recruiting Calls</div>
    <div>Upcoming Networking Calls</div>
    </div>
    </>
}