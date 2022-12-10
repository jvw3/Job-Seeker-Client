import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteBoard,
  getAllBoardsForUser,
  getSingleBoardForUser,
} from "../managers/BoardManager";

export const IndividualJobDetails = () => {
  const [board, setBoard] = useState({});

  const { boardId } = useParams();
  const { jobId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSingleBoardForUser(id).then((userBoard) => {
      setBoard(userBoard);
    });
  }, []);

  const renderDeleteButton = (id) => {
    return (
      <>
        <button
          className="button is-small is-danger is-focused"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this Board?")) {
              deleteRequestForBoard(id);
            }
          }}
        >
          {" "}
          Delete Board
        </button>
      </>
    );
  };

//   const deleteRequestForBoard = (id) => {
//     deleteBoard(id)
//       .then(() => {
//         getAllBoardsForUser();
//       })
//       .then(() => navigate("/"));
//   };

  return (
    <>
      <h1>{board.title}</h1>
      <button
        onClick={() => {
        }}
      >
        Edit Board
      </button>
      {renderDeleteButton(id)}
      <h2>Priorities</h2>
      <h2>Goal</h2>
      <div>{board.goal}</div>
      <h2>Requirements</h2>
      <div>{board.requirements}</div>
      <h3>Ready To Apply</h3>
      <h3>Applied</h3>
      <h3>Interviewed</h3>
      <h3>Offered</h3>
      <h3>Denied</h3>
      <h3></h3>
    </>
  );
};
