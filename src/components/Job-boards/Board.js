import { useState, useEffect } from "react";
import { getAllBoardsForUser } from "../managers/BoardManager";

export const BoardView = () => {
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
            boards.map()
        }
    </div>
    </>
}

