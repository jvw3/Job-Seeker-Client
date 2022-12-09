import { useState, useEffect } from "react";
import { getAllBoardsForUser } from "../managers/BoardManager";

export const Dashboard = () => {
const[boards, setBoards] = useState([])


useEffect(() => {
    getAllBoardsForUser()
      .then((userBoards) => {
        setBoards(userBoards);
      });
  }, []);


    return<>
    <h1>Dashboard</h1>
    <div>
        {
            boards.map(board =>
                <>
                <div>{board.title}</div>
                <div>{board.goal}</div>
                <div>{board.requirements}</div>
                <div>Total Applications</div>
                <div>Total Interviews</div>
                <div>Total Offers</div>
                </>
            )
        }
    <div>Upcoming Interviews</div>
    <div>Upcoming Recruiting Calls</div>
    <div>Upcoming Networking Calls</div>
    </div>
    </>
}