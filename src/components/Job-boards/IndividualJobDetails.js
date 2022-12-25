import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteBoardJob,
  getSingleJobForUser,
  getAllInterviewsForBoardJob,
} from "../managers/BoardManager";
import { IconMapPin, IconCurrencyDollar } from '@tabler/icons'

export const IndividualJobDetails = () => {
  const [job, setJob] = useState({});
  const [interviews, setInterviews] = useState([]);

  const { boardId } = useParams();
  const { jobId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSingleJobForUser(jobId).then((userJob) => {
      setJob(userJob);
    });
  }, []);

  useEffect(() => {
    getAllInterviewsForBoardJob(jobId).then((userInterviews) => {
      setInterviews(userInterviews);
    });
  }, []);

  const renderDeleteButton = (id) => {
    return (
      <>
        <button
          className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br transition ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-r-lg text-sm px-4 py-2 text-center mr-2 mb-2"
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
    deleteBoardJob(id).then(() => navigate(`/boards/${boardId}`));
  };

  return (
      <main>
        <h1 className="text-3xl">{job?.job?.title}</h1>
        <h2 className="text-2xl">{job?.company?.name}</h2>
        <div class="inline-flex rounded-md shadow-sm" role="group">
          <button
            className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-l-lg text-sm px-4 py-2 text-center  mb-2"
            onClick={() => {
              navigate(`/boards/${boardId}/jobs/${job.id}/editjob`);
            }}
          >
            Edit Job
          </button>
          {renderDeleteButton(jobId)}
        </div>
        <br></br>
        <div className="flex justify-evenly w-1/6">
          <div className="flex">
            <div>
              <IconCurrencyDollar />
            </div>
            <div>{job.salary}</div>
          </div>
          <div className="flex">
            <div>
              <IconMapPin />
            </div>
            <div>{job.location}</div>
          </div>
        </div>
        <h3 className="text-xl">Tags</h3>
        <button
          className="transition ease-in-out text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
          onClick={() => {
            navigate(`/boards/${boardId}/jobs/${job.id}/managetags`);
          }}
        >
          Manage Tags
        </button>
        {job?.tags?.map((tag) => (
          <span className="bg-black text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-blue-800">
            {tag.name}
          </span>
        ))}
        <h2 className="text-2xl">Job Ratings</h2>
        <div>{job?.salary_rating}</div>
        <div>{job?.location_rating}</div>
        <div>{job?.culture_rating}</div>
        <div>{job?.leadership_rating}</div>
        <div>{job?.team_rating}</div>
        <br></br>
        <h2 className="text-2xl">My Interviews</h2>
        <button
          onClick={() => {
            navigate(`/createinterview`);
          }}
          className="transition ease-in-out text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
        >
          Add New Interview
        </button>
        {interviews.map((interview) => (
          <>
            <div>Date of Interview: {interview.date}</div>
            <div>Feedback: {interview.interview_feedback}</div>
            <button
              onClick={() => {
                navigate(`/interviews/${interview.id}`);
              }}
              className="transition ease-in-out text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
            >
              View Details
            </button>
          </>
        ))}
      </main>
  );
};
