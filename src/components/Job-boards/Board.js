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
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
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


  const deleteRequestForBoard = (id) => {
    deleteBoard(id)
      .then(() => {
        getAllBoardsForUser();
      })
      .then(() => navigate("/dashboard"));
  };

  return (
    <>
      <main className="ml-10 mt-10">
        <h1 className="text-4xl">{board.title}</h1>
        <button
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
          onClick={() => {
            navigate(`/boards/${id}/edit`);
          }}
        >
          Edit Board
        </button>
        {renderDeleteButton(id)}
        <h2 className="text-2xl">Priorities</h2>
        <h2 className="text-2xl">Goal</h2>
        <div>{board.goal}</div>
        <h2 className="text-2xl">Requirements</h2>
        <div>{board.requirements}</div>
        <br></br>
        <h2 className="text-3xl">Current Jobs</h2>
        <button
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
          onClick={() => {
            navigate(`/${id}/createjob`);
          }}
        >
          {" "}
          Add New Job
        </button>
        <button
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
          onClick={() => {
            navigate(`/boards/${id}/managecategories`);
          }}
        >
          {" "}
          Manage Categories
        </button>
        <JobList userBoardCategories={board?.categories} boardId={id} />
      </main>
    </>
  );
};
