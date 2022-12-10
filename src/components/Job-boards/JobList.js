import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteBoard,
  getAllBoardsForUser,
  getAllJobsForBoard,
} from "../managers/BoardManager";

export const JobList = ({boardId}) => {
  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllJobsForBoard(boardId).then((userJobs) => {
      setJobs(userJobs);
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

  const deleteRequestForBoard = (id) => {
    deleteBoard(id)
      .then(() => {
        getAllBoardsForUser();
      })
      .then(() => navigate("/"));
  };

  return (
    <>
      <h1>Current Jobs</h1>
      <button
        onClick={() => {
          navigate(`/addjob`);
        }}
      >     Add New Job
      </button>
      <h3>Ready To Apply</h3>
      <h3>Applied</h3>
      <h3>Interviewed</h3>
      <h3>Offered</h3>
      <h3>Denied</h3>
      {jobs.map((job) => (
        <>
          <div>{job?.job?.title}</div>
          <div>{job?.company?.name}</div>
          <button
            onClick={() => {
              navigate(`/boards/${boardId}/jobs/${job.id}`);
            }}
          >
            {" "}
            View Details
          </button>
        </>
      ))}
      <h3></h3>
    </>
  );
};
