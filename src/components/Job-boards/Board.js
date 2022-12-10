import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBoard, getAllBoardsForUser, getAllJobsForBoard, getSingleBoardForUser } from "../managers/BoardManager";
import { JobList } from "./JobList";

export const BoardView = () => {
  const [board, setBoard] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id)

  useEffect(() => {
    getAllJobsForBoard(id).then((jobsForBoard) => {
      setBoard(jobsForBoard);
    });
  }, []);

const renderDeleteButton = (id) => {
    return (
      <>
        <button
          className="button is-small is-danger is-focused"
          onClick={() => {
            if (
              window.confirm("Are you sure you want to delete this Board?")
            ) {
              deleteRequestForBoard(id);
            }
          }}
        > Delete Board
        </button>
      </>
    );
  };


  const deleteRequestForBoard = (id) => {
    deleteBoard(id)
      .then(() => {
        getAllBoardsForUser();
      })
      .then(() => navigate("/"));
  };

  return (
    <>
      <h1>{board.title}</h1>
      <button
        onClick={() => {
          navigate(`/boards/${id}/edit`);
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
<br></br>
      <JobList
      boardId={id}
      />
    </>
  );
};
