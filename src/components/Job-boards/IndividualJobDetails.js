import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteBoard,
  deleteBoardJob,
  getAllJobsForBoard,
  getAllBoardsForUser,
  getAllJobsForBoardJob,
  getSingleJobForUser,
} from "../managers/BoardManager";

export const IndividualJobDetails = () => {
  const [job, setJob] = useState({});

  const { boardId } = useParams();
  const { jobId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSingleJobForUser(jobId).then((userJob) => {
      setJob(userJob);
    });
  }, []);

  const renderDeleteButton = (id) => {
    return (
      <>
        <button
          className="button is-small is-danger is-focused"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this Job?")) {
              deleteRequestForBoardJob(id);
            }
          }}
        >
          {" "}
          Delete Job
        </button>
      </>
    );
  };

  const deleteRequestForBoardJob = (id) => {
    deleteBoardJob(id)
      .then(() => navigate(`/boards/${boardId}`));
  };

  return (
    <>
      <h1>{job?.job?.title}</h1>
      <h2>{job?.company?.name}</h2>
      <button
        onClick={() => {
          navigate(`/boards/${boardId}/jobs/${job.id}/editjob`);
        }}
      >
        Edit Job
      </button>
      {renderDeleteButton(jobId)}
      <h2>Job Ratings</h2>
      <div>
        <h3>Tags</h3>
        <button
          onClick={() => {
            navigate(`/boards/${boardId}/jobs/${job.id}/managetags`);
          }}
        >
          Manage Tags
        </button>
        {job?.tags?.map((tag) => (
          <div>{tag.name}</div>
        ))}
      </div>
      <div>{job?.salary_rating}</div>
      <div>{job?.location_rating}</div>
      <div>{job?.culture_rating}</div>
      <div>{job?.leadership_rating}</div>
      <div>{job?.team_rating}</div>
    </>
  );
};
