import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteBoardJob,
  getSingleJobForUser,
  getAllInterviewsForBoardJob, updateBoardJob
} from "../managers/BoardManager";
import { IconMapPin, IconCurrencyDollar, IconBrandCashapp, IconCrown, IconFriends, IconMap2, IconUsers, IconX } from '@tabler/icons'

export const IndividualJobDetails = () => {
  const { boardId } = useParams();
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [boardJob, setBoardJob] = useState({
    job: 0,
    custom_job: "",
    company: 0,
    custom_company: "",
    has_applied: false,
    has_interviewed: false,
    interview_rounds: 0,
    received_offer: false,
    salary: 0,
    location: "",
    salary_rating: 0,
    location_rating: 0,
    culture_rating: 0,
    leadership_rating: 0,
    team_rating: 0,
    board: boardId,
    category: 0
  });
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    getSingleJobForUser(jobId).then((userJob) => {
      setBoardJob(userJob)
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



  const putRequestForJob = (event) => {
    event.preventDefault();

    const boardJobToApi = {
      job: parseInt(boardJob.job.id),
      custom_job: boardJob.custom_job,
      company: parseInt(boardJob.company.id),
      custom_company: boardJob.custom_company,
      has_applied: boardJob.has_applied,
      has_interviewed: boardJob.has_interviewed,
      interview_rounds: boardJob.interview_rounds,
      received_offer: boardJob.received_offer,
      salary: boardJob.salary,
      location: boardJob.location,
      salary_rating: boardJob.salary_rating,
      location_rating: boardJob.location_rating,
      culture_rating: boardJob.culture_rating,
      leadership_rating: boardJob.leadership_rating,
      team_rating: boardJob.team_rating,
      board: parseInt(boardJob.board.id),
      category: parseInt(boardJob.category),
    };

    updateBoardJob(boardJobToApi, jobId);
  };
  const renderJobRatingsBox = () => {
    return (
      <>
        <div className="text-2xl">Job Ratings</div>
        <label htmlFor="jobratings-modal" className="btn">
          Edit Ratings
        </label>
        <input type="checkbox" id="jobratings-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="jobratings-modal"
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => {
                getSingleJobForUser(jobId).then((userJob) => {
                  setBoardJob(userJob);
                });
              }}
            >
              <IconX />
            </label>
            <h3 className="font-bold text-xl">Update Job Ratings</h3>
            <p>Salary Rating</p>
            <input
              type="range"
              min="0"
              max="10"
              value={boardJob.salary_rating}
              onChange={(evt) => {
                const copy = { ...boardJob };
                copy.salary_rating = evt.target.value;
                setBoardJob(copy);
              }}
              className="w-full"
              step="1"
            />
            <div className="w-full flex justify-between text-xs px-2">
              <span>0</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>10</span>
            </div>
            <p>Location Rating</p>
            <input
              type="range"
              min="0"
              max="10"
              value={boardJob.location_rating}
              onChange={(evt) => {
                const copy = { ...boardJob };
                copy.location_rating = evt.target.value;
                setBoardJob(copy);
              }}
              className="w-full"
              step="1"
            />
            <div className="w-full flex justify-between text-xs px-2">
              <span>0</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>10</span>
            </div>
            <p>Culture Rating</p>
            <input
              type="range"
              min="0"
              max="10"
              value={boardJob.culture_rating}
              onChange={(evt) => {
                const copy = { ...boardJob };
                copy.culture_rating = evt.target.value;
                setBoardJob(copy);
              }}
              className="w-full"
              step="1"
            />
            <div className="w-full flex justify-between text-xs px-2">
              <span>0</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>10</span>
            </div>
            <p>Leadership Rating</p>
            <input
              type="range"
              min="0"
              max="10"
              value={boardJob.leadership_rating}
              onChange={(evt) => {
                const copy = { ...boardJob };
                copy.leadership_rating = evt.target.value;
                setBoardJob(copy);
              }}
              className="w-full"
              step="1"
            />
            <div className="w-full flex justify-between text-xs px-2">
              <span>0</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>10</span>
            </div>
            <p>Team Rating</p>
            <input
              type="range"
              min="0"
              max="10"
              value={boardJob.team_rating}
              onChange={(evt) => {
                const copy = { ...boardJob };
                copy.team_rating = evt.target.value;
                setBoardJob(copy);
              }}
              className="w-full"
              step="1"
            />
            <div className="w-full flex justify-between text-xs px-2">
              <span>0</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>10</span>
            </div>
            <div className="modal-action">
              <label
                onClick={(clickEvent) => {
                  putRequestForJob(clickEvent).then((userJob) => {
                    setBoardJob(userJob);
                  });
                }}
                htmlFor="jobratings-modal"
                className="btn"
              >
                Save Ratings
              </label>
              <label
                onClick={() => {
                  getSingleJobForUser(jobId).then((userJob) => {
                    setBoardJob(userJob);
                  });
                }}
                htmlFor="jobratings-modal"
                className="btn"
              >
                Close
              </label>
            </div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-blue-500">
              <IconBrandCashapp size={30} />
            </div>
            <div className="stat-title">Salary Rating</div>
            <div className="stat-value">{boardJob?.salary_rating}</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-blue-500">
              <IconMap2 size={30} />
            </div>
            <div className="stat-title">Location Rating</div>
            <div className="stat-value">{boardJob?.location_rating}</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-blue-500">
              <IconFriends size={30} />
            </div>
            <div className="stat-title">Culture Rating</div>
            <div className="stat-value">{boardJob?.culture_rating}</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-blue-500">
              <IconCrown size={30} />
            </div>
            <div className="stat-title">Leadership Rating</div>
            <div className="stat-value">{boardJob?.leadership_rating}</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>
          <div className="stat">
            <div className="stat-figure text-blue-500">
              <IconUsers size={30} />
            </div>
            <div className="stat-title">Team Rating</div>
            <div className="stat-value">{boardJob?.team_rating}</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>
        </div>
      </>
    );
  }

  const deleteRequestForBoardJob = (id) => {
    deleteBoardJob(id).then(() => navigate(`/boards/${boardId}`));
  };

  return (
    <main className="bg-pinkswirl w-full">
      <div className="text-white">
        <h1 className="text-3xl">{boardJob?.job?.title}</h1>
        <h2 className="text-2xl">{boardJob?.company?.name}</h2>
        <div className="flex justify-evenly w-1/6 mt-2 mb-2">
          <div className="flex justify-between">
            <div>
              <IconCurrencyDollar size={30} />
            </div>
            <div className="text-xl">{boardJob.salary}</div>
          </div>
          <div className="flex">
            <div>
              <IconMapPin size={30} />
            </div>
            <div className="text-xl">{boardJob.location}</div>
          </div>
        </div>
      </div>
      <div class="inline-flex rounded-md shadow-sm" role="group">
        <button
          className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-l-lg text-sm px-4 py-2 text-center  mb-2"
          onClick={() => {
            navigate(`/boards/${boardId}/jobs/${boardJob.id}/editjob`);
          }}
        >
          Edit Job
        </button>
        {renderDeleteButton(jobId)}
      </div>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to={`/boards/${boardId}`}>Board</Link>
          </li>
          <li>Job Details</li>
        </ul>
      </div>
      <br></br>
      {renderJobRatingsBox()}
      <div className="border bg-white ml-10 mr-10 p-5 rounded-md">
        <h3 className="text-xl">Tags</h3>
        <button
          className="transition ease-in-out text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
          onClick={() => {
            navigate(`/boards/${boardId}/jobs/${boardJob.id}/managetags`);
          }}
        >
          Manage Tags
        </button>
        {boardJob?.tags?.map((tag) => (
          <span className="bg-black text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-blue-800">
            {tag.name}
          </span>
        ))}
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
      </div>
    </main>
  );
};
