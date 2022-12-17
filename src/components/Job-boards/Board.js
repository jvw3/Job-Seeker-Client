import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBoard, getAllBoardsForUser, getAllJobsForBoard, getSingleBoardForUser } from "../managers/BoardManager";
import { JobList } from "./JobList";

export const BoardView = () => {
  const [board, setBoard] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSingleBoardForUser(id).then((userJobs) => {
      setBoard(userJobs);
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
      .then(() => navigate("/dashboard"));
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
      <h1>Current Jobs</h1>
      <button
        onClick={() => {
          navigate(`/${id}/createjob`);
        }}
      >
        {" "}
        Add New Job
      </button>
      <button
        onClick={() => {
          navigate(`/boards/${id}/managecategories`);
        }}
      >
        {" "}
        Manage Categories
      </button>
      <JobList
        userBoardCategories={board?.categories}
        boardId={id}
      />
    </>
  );
};
